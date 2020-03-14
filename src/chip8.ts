import Decoder from './decoder';
import Interpreter from './interpreter';
import Display from './display';

export default class Chip8 {
    // RAM
    ram: Uint8Array = new Uint8Array(4096);
    // Display
    display: Display;
    // Keypad (0x0 - 0xF)
    key: Array<boolean> = new Array<boolean>(16);

    // Stack array
    stack: Uint16Array = new Uint16Array(16);
    // GP Registers (V0 - VF)
    v: Uint8Array = new Uint8Array(16);
    // Address register (16-bit)
    i: number = 0;
    // Delay Timer (8-bit)
    dt: number = 0;
    // Sound Timer (8-bit)
    st: number = 0;
    // Program Counter (16-bit)
    pc: number = 0x200;
    // Stack pointer (8-bit)
    sp: number = 0;
    // Opcode decoder
    decoder: Decoder = new Interpreter(this);
    // Should update screen?
    drawFlag: boolean = false;

    /**
     * Chip-8 emulator/Interpreter
     * @param canvasId Canvas used as screen
     */
    constructor(canvasId: string) {
        this.display = new Display(this, canvasId);

        this.loadFontset();
    }

    /**
     * Emulates a CPU cycle
     */
    public cycle(): void {
        // Read 2-byte opcode from memory
        const opcode = this.getOpcode();

        this.resetFlags();
        this.decode(opcode);
        this.updateTimers();
    }

    /**
     * Draws sprites to the screen (canvas)
     */
    public draw(): void {
        this.display.draw();
    }

    /**
     * Stores key states (press/release)
     */
    public setKeys(): void {

    }

    /**
     * Loads a program into memory
     */
    public async load(romName: string): Promise<void> {
        const romFolder: string = './roms/';
        const romPath: string = romFolder + romName;

        const res = await fetch(romPath);
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        console.log(bytes);

        // Load into memory
        bytes.forEach((byte: number, i: number) => {
            this.ram[this.pc + i] = byte;
        });
    }

    /**
     * Logs the VM's current state
     */
    public logState(): void {
        const intToHex = (int: number) => parseInt(int.toString(), 16);

        const pc = intToHex(this.pc);
        const byte = intToHex(this.ram[this.pc]);
        console.log('0x' + pc + ' => 0x' + byte);
    }

    /**
     * Returns the drawFlag state
     */
    public getDrawFlag(): boolean {
        return this.drawFlag;
    }

    /**
     * Loads fontset into RAM
     */
    private loadFontset(): void {
        const fontset = this.display.getFontset();

        for (let i = 0; i < 80; i++) {
            this.ram[i] = fontset[i];
        }
    }

    /**
     * Resets register flags
     */
    private resetFlags(): void {
        this.drawFlag = false;
    }

    /**
     * Decrements timer registers
     */
    private updateTimers(): void {
        // Delay timer
        if (this.dt > 0) this.dt--;

        // Sound timer
        if (this.st > 0) {
            if (this.st === 1) {
                // BEEP
            }
            this.dt--;
        }
    }

    /**
     * Decodes and executes the given opcode.
     * @param opcode 2-byte operation
     */
    private decode(opcode: number): void {
        // Opcode bitfields
        const u = (opcode >> 12) & 0xF;
        const x = (opcode >> 8) & 0xF;
        const y = (opcode >> 4) & 0xF;
        const p = (opcode >> 0) & 0xF;
        const kk = (opcode >> 0) & 0xFF;
        const nnn = (opcode >> 0) & 0xFFF;

        const decoder = this.decoder;

        switch (u) {
            case 0x0:
                switch (nnn) {
                    case 0x0E0:
                        decoder.cls();
                        break;
                    case 0x0EE:
                        decoder.ret();
                        break;
                    default:
                        throw "Unknown opcode: 0x" + opcode.toString(16).padStart(4, '0');
                }
                break;
            case 0x1:
                decoder.jmp(nnn);
                break;
            case 0x2:
                decoder.call(nnn);
                break;
            case 0x3:
                decoder.seq(x, kk);
                break;
            case 0x4:
                decoder.sne(x, kk);
                break;
            case 0x5:
                decoder.seqr(x, y);
                break;
            case 0x6:
                decoder.set(x, kk);
                break;
            case 0x7:
                decoder.add(x, kk);
                break;
            case 0x8:
                switch (p) {
                    case 0x1:
                        decoder.or(x, y);
                        break;
                    case 0x2:
                        decoder.and(x, y);
                        break;
                    case 0x3:
                        decoder.xor(x, y);
                        break;
                    case 0x4:
                        decoder.addr(x, y);
                        break;
                    case 0x5:
                        decoder.subr(x, y);
                        break;
                    case 0x6:
                        decoder.shr(x);
                        break;
                    case 0x7:
                        decoder.subn(x, y);
                        break;
                    case 0xE:
                        decoder.shl(x);
                        break;
                }
                break;
            case 0x9:
                decoder.sner(x, y);
                break;
            case 0xA:
                decoder.seti(nnn);
                break;
            case 0xB:
                decoder.jmpv0(nnn);
                break;
            case 0xC:
                decoder.rand(x, kk);
                break;
            case 0xD:
                decoder.draw(x, y, p);
                break;
            case 0xE:
                switch (kk) {
                    case 0x9E:
                        decoder.skp(x);
                        break;
                    case 0xA1:
                        decoder.sknp(x);
                        break;
                }
                break;
            case 0xF:
                switch (kk) {
                    case 0x07:
                        decoder.getdelay(x);
                        break;
                    case 0x0A:
                        decoder.waitkey(x);
                        break;
                    case 0x15:
                        decoder.setdelay(x);
                        break;
                    case 0x18:
                        decoder.setsound(x);
                        break;
                    case 0x1E:
                        decoder.addi(x);
                        break;
                    case 0x29:
                        decoder.spritei(x);
                        break;
                    case 0x33:
                        decoder.bcd(x);
                        break;
                    case 0x55:
                        decoder.push(x);
                        break;
                    case 0x65:
                        decoder.pop(x);
                        break;
                }
                break;
        }
    }

    /**
     * Returns the current 2-byte opcode
     */
    private getOpcode() {
        return this.ram[this.pc & 0xFFF] << 8 | this.ram[(this.pc + 1) & 0xFFF];
    }

}