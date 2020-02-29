import Interpreter from './interpreter';

export default class Chip8 {
    // RAM
    ram: Int8Array = new Int8Array(4096);
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
    interpreter: Interpreter;

    constructor() {
        this.interpreter = new Interpreter(this);
    }

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

        const decoder = this.interpreter;

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
        }
    }

    /**
     * Returns the current 2-byte opcode
     */
    private getOpcode() {
        return this.ram[this.pc & 0xFFF] << 8 | this.ram[(this.pc + 1) & 0xFFF];
    }

}