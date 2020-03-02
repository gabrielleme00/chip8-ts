import Chip8 from './chip8';

export default class Display {
    chip8: Chip8;

    // Screen size
    width: number;
    height: number;

    // Canvas
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // Display buffer
    gfx: Uint8Array;

    constructor(
        chip8: Chip8,
        canvasId: string,
        pixelSize: number = 16,
        width: number = 64,
        height: number = 32
    ) {
        this.chip8 = chip8;

        this.width = width;
        this.height = height;
        this.gfx = new Uint8Array(width * height)

        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        canvas.width = width * pixelSize;
        canvas.height = height * pixelSize;
        canvas.style.border = '1px solid black';

        this.canvas = canvas;
        this.ctx = context;
    }

    public draw(): void {

    }

    public getFontset(): Array<number> {
        return [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];
    }
}