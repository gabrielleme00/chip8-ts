export default class Chip8 {
    // RAM
    private ram: Int8Array = new Int8Array(4096);
    // Stack array
    private stack: Int16Array = new Int16Array(16);
    // GP Registers (V0 - VF)
    private v: Int8Array = new Int8Array(16);
    // Address register (16-bit)
    private i: number = 0;
    // Delay Timer (8-bit)
    private dt: number = 0;
    // Sound Timer (8-bit)
    private st: number = 0;
    // Program Counter (16-bit)
    private pc: number = 0x200;
    // Stack pointer (8-bit)
    private sp: number = 0;

    /**
     * Emulates a CPU cycle
     */
    public cycle() {
        // Read 2-byte opcode from memory
        const opcode = this.getOpcode();

        // Decode and advance Program Counter
        this.decode(opcode);
        this.pc += 2;

        // TODO: Update timers
    }

    /**
     * Decodes and executes the given opcode.
     * @param opcode 2-byte operation
     */
    private decode(opcode: number): void {
        // TODO: Make a separate Decoder class

        // Opcode bitfields
        const u   = (opcode >> 12) & 0xF;
        const x   = (opcode >>  8) & 0xF;
        const y   = (opcode >>  4) & 0xF;
        const p   = (opcode >>  0) & 0xF;
        const kk  = (opcode >>  0) & 0xFF;
        const nnn = (opcode >>  0) & 0xFFF;
    }

    /**
     * Returns the current 2-byte opcode
     */
    private getOpcode() {
        return this.ram[this.pc & 0xFFF] << 8 | this.ram[(this.pc + 1) & 0xFFF];
    }

}