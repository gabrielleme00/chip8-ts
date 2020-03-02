import Chip8 from './chip8';
import Decoder from './decoder';

export default class Interpreter implements Decoder {
    vm: Chip8;

    constructor(vm: Chip8) {
        this.vm = vm;
    }

    cls(): void { }

    ret(): void {
        this.vm.pc = this.vm.stack[this.vm.sp--] & 0xFFFF;
    }

    jmp(addr: number): void {
        this.vm.pc = addr & 0xFFFF;
    }

    call(addr: number): void {
        this.vm.sp++;
        this.vm.stack[this.vm.pc];
        this.vm.pc = addr & 0xFFFF;
    }

    seq(reg: number, val: number): void {
        if (this.vm.v[reg & 0xF] === val) {
            this.vm.pc += 2;
        }
        this.vm.pc += 2;
    }

    sne(reg: number, val: number): void {
        if (this.vm.v[reg] !== val) {
            this.vm.pc += 2;
        }
        this.vm.pc += 2;
    }

    seqr(x: number, y: number): void {
        if (this.vm.v[x] === this.vm.v[y]) {
            this.vm.pc += 2;
        }
        this.vm.pc += 2;
    }

    sner(x: number, y: number): void {
        if (this.vm.v[x] !== this.vm.v[y]) {
            this.vm.pc += 2;
        }
        this.vm.pc += 2;
    }

    set(reg: number, val: number): void {
        this.vm.v[reg] = val & 0xFF;
        this.vm.pc += 2;
    }

    add(reg: number, val: number): void {
        this.vm.v[reg] = (this.vm.v[reg] + (val & 0xFF)) & 0xFF;
        this.vm.pc += 2;
    }

    setr(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[y];
        this.vm.pc += 2;
    }

    or(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[x] | this.vm.v[y];
        this.vm.pc += 2;
    }

    and(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[x] & this.vm.v[y];
        this.vm.pc += 2;
    }

    xor(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[x] ^ this.vm.v[y];
        this.vm.pc += 2;
    }

    addr(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[x] + this.vm.v[y];
        this.vm.v[0xF] = this.vm.v[x] > 0xFF ? 1 : 0;
        this.vm.v[x] = this.vm.v[x] & 0xFF;
        this.vm.pc += 2;
    }

    subr(x: number, y: number): void {
        this.vm.v[0xF] = this.vm.v[x] > this.vm.v[y] ? 1 : 0;
        this.vm.v[x] = (this.vm.v[x] - this.vm.v[y]) & 0xFF;
        this.vm.pc += 2;
    }

    subn(x: number, y: number): void {
        this.vm.v[0xF] = this.vm.v[y] > this.vm.v[x] ? 1 : 0;
        this.vm.v[x] = (this.vm.v[y] - this.vm.v[x]) & 0xFF;
        this.vm.pc += 2;
    }

    shr(x: number): void {
        this.vm.v[0xF] = (this.vm.v[0xF] & 0x1) === 1 ? 1 : 0;
        this.vm.v[x] = this.vm.v[x] >> 1;
        this.vm.pc += 2;
    }

    shl(x: number): void {
        this.vm.v[0xF] = (this.vm.v[0xF] & 0x80) === 1 ? 1 : 0;
        this.vm.v[x] = this.vm.v[x] << 1;
        this.vm.pc += 2;
    }

    seti(addr: number): void {
        this.vm.i = addr & 0xFFFF;
        this.vm.pc += 2;
    }

    jmpv0(addr: number): void {
        this.vm.pc = addr + this.vm.v[0];
    }

    rand(x: number, val: number): void {
        const result = Math.floor(Math.random() * 0x100) & val;
        this.vm.v[x] = result;
        this.vm.pc += 2;
    }

    draw(x: number, y: number, height: number): void {
        this.vm.v[0xF] = 0;

        // For each row of the sprite
        for (let row = 0; row < height; row++) {
            const pixel = this.vm.ram[this.vm.i + row];

            // Check every pixel
            for (let col = 0; col < 8; col++) {
                if ((pixel & (0x80) >> col) !== 0) {
                    const offset = (x + col + ((y + row) * 64));

                    // Check collision
                    if (this.vm.display.gfx[offset] === 1) {
                        this.vm.v[0xF] = 1;
                    }

                    // Update pixel
                    this.vm.display.gfx[offset] ^= 1;
                }
            }
        }

        this.vm.drawFlag = true;
        this.vm.pc += 2;
    }

    skp(reg: number): void {
        this.vm.pc += 2;
    }

    sknp(reg: number): void {
        this.vm.pc += 2;
    }

    waitkey(reg: number): void {
        this.vm.pc += 2;
    }

    getdelay(x: number): void {
        this.vm.v[x] = this.vm.dt;
        this.vm.pc += 2;
    }

    setdelay(x: number): void {
        this.vm.dt = this.vm.v[x];
        this.vm.pc += 2;
    }

    setsound(x: number): void {
        this.vm.st = this.vm.v[x];
        this.vm.pc += 2;
    }

    addi(x: number): void {
        this.vm.i = (this.vm.i + this.vm.v[x]) & 0xFFFF;
        this.vm.pc += 2;
    }

    spritei(x: number): void {
        this.vm.pc += 2;
    }

    bcd(x: number): void {
        this.vm.pc += 2;
    }

    push(x: number): void {
        for (let offset = 0; offset <= x; offset++) {
            const addr = this.vm.i + offset;
            const val = this.vm.v[offset] & 0xFF;
            this.vm.ram[addr] = val;
        }
        this.vm.pc += 2;
    }

    pop(x: number): void {
        for (let offset = 0; offset <= x; offset++) {
            const addr = this.vm.i + offset;
            const val = this.vm.ram[addr] & 0xFF;
            this.vm.v[offset] = val;
        }
        this.vm.pc += 2;
    }

}