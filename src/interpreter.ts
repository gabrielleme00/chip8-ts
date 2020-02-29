import Chip8 from './chip8';
import Decoder from './decoder';

export default class Interpreter implements Decoder {
    vm: Chip8;

    constructor(vm: Chip8) {
        this.vm = vm;
    }

    cls(): void {}
    
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

    set (reg: number, val: number): void {
        this.vm.v[reg] = val & 0xFF;
        this.vm.pc += 2;
    }

    add (reg: number, val: number): void {
        this.vm.v[reg] = (this.vm.v[reg] + (val & 0xFF)) & 0xFF;
        this.vm.pc += 2;
    }

    setr(x: number, y: number): void {
        this.vm.v[x] = this.vm.v[y];
        this.vm.pc += 2;
    }

    or (x: number, y: number): void {
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

    shr(reg1: number): void {

        this.vm.pc += 2;
    }

    shl(reg1: number): void {

        this.vm.pc += 2;
    }

    seti (addr: number): void {
        this.vm.i = addr & 0xFFFF;
        this.vm.pc += 2;
    }

    jmpv0(addr: number): void {
        this.vm.pc += 2;
    }

    rand(reg: number, val: number): void {
        this.vm.pc += 2;
    }

    draw(reg1: number, reg2: number, val: number): void {
        this.vm.pc += 2;
    }

    skp (reg: number): void {
        this.vm.pc += 2;
    }

    sknp(reg: number): void {
        this.vm.pc += 2;
    }

    waitkey(reg: number): void {
        this.vm.pc += 2;
    }

    getdelay(reg: number): void {
        this.vm.pc += 2;
    }

    setdelay(reg: number): void {
        this.vm.pc += 2;
    }

    setsound(reg: number): void {
        this.vm.pc += 2;
    }

    addi(reg: number): void {
        this.vm.pc += 2;
    }

    spritei(reg: number): void {
        this.vm.pc += 2;
    }

    bcd(reg: number): void {
        this.vm.pc += 2;
    }

    push(reg: number): void {
        this.vm.pc += 2;
    }

    pop(reg: number): void {
        this.vm.pc += 2;
    }
    
}