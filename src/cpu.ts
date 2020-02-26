export default class CPU {
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
    pc: number = 0;
    // Stack pointer (8-bit)
    sp: number = 0;

    /**
     * Decodes and executes the given opcode.
     * @param opcode 2-byte operation
     */
    decode(opcode: number): void {
        // Opcode's main parts
        const key: number = (opcode & 0xF000) >> 12;
        const val: number = (opcode & 0x0FFF);

        // TODO: MUST READ THE NEXT BYTE TOO!
        // Aux variables
        let n1: number;
        let n2: number;

        switch(key) {
            case 0x0:
                switch(val) {
                    // Clear screen
                    case 0x0E0:
                        break;
                    // Return from subroutine
                    case 0x0EE:
                        this.pc = this.stack[this.sp--];
                        break;
                    // Call RCA 1802 program at [val]
                    default:    
                        break;
                }
                break;

            // Jump to [val]
            case 0x1:
                this.pc = val;
                break;

            // Call subroutine at [val]
            case 0x2:
                this.stack[++this.sp] = this.pc;
                this.pc = val;
                break;

            case 0x3:
                break;

            case 0x4:
                break;

            case 0x5:
                break;

            // 6XNN -> Vx = NN
            case 0x6:
                n1 = val & 0xF00 >> 8;
                n2 = val & 0x0FF;
                this.v[n1] = n2;
                break;

            // 7XNN -> Vx += NN
            case 0x7:
                n1 = val & 0xF00 >> 8;
                n2 = val & 0x0FF;
                this.v[n1] += n2;
                break;

            case 0x8:
                
                break;

            case 0x9:
                break;

            case 0xA:
                break;

            case 0xB:
                break;

            case 0xC:
                break;

            case 0xD:
                break;

            case 0xE:
                break;

            case 0xF:
                break;
        }
    }

}