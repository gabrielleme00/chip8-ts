import Decoder from './decoder';
import Interpreter from './interpreter';
import Display from './display';

export default class Chip8 {
    // RAM
    ram: Int8Array = new Int8Array(4096);
    // Display
    display: Display = new Display(64, 32);

    // Stack array
    stack: Int16Array = new Int16Array(16);
    // GP Registers (V0 - VF)
    v: Int8Array = new Int8Array(16);
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

    /**
     * Emulates a CPU cycle
     */
    public cycle() {
        // Read 2-byte opcode from memory
        const opcode = this.getOpcode();

        // Decode current opcode
        this.decode(opcode);

        // TODO: Update timers
    }

    /**
     * Decodes and executes the given opcode.
     * @param opcode 2-byte operation
     */
    private decode(opcode: number): void {
        // Opcode bitfields
        const u   = (opcode >> 12) & 0xF;
        const x   = (opcode >>  8) & 0xF;
        const y   = (opcode >>  4) & 0xF;
        const p   = (opcode >>  0) & 0xF;
        const kk  = (opcode >>  0) & 0xFF;
        const nnn = (opcode >>  0) & 0xFFF;

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