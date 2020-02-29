export default interface Decoder {
    cls(): void;
    ret(): void;

    jmp (addr: number): void;
    call(addr: number): void;

    seq(reg: number, val: number): void;
    sne(reg: number, val: number): void;

    seqr(reg1: number, reg2: number): void;
    sner(reg1: number, reg2: number): void;

    set (reg: number, val: number): void;
    add (reg: number, val: number): void;
    setr(reg1: number, reg2: number): void;

    or (reg1: number, reg2: number): void;
    and(reg1: number, reg2: number): void;
    xor(reg1: number, reg2: number): void;

    addr(reg1: number, reg2: number): void;
    subr(reg1: number, reg2: number): void;
    subn(reg1: number, reg2: number): void;

    shr(reg1: number): void;
    shl(reg1: number): void;

    seti (addr: number): void;
    jmpv0(addr: number): void;

    rand(reg: number, val: number): void;
    draw(reg1: number, reg2: number, val: number): void;

    skp (reg: number): void;
    sknp(reg: number): void;
    waitkey(reg: number): void;

    getdelay(reg: number): void;
    setdelay(reg: number): void;
    setsound(reg: number): void;

    addi(reg: number): void;
    spritei(reg: number): void;

    bcd(reg: number): void;
    push(reg: number): void;
    pop(reg: number): void;
}