import CPU from './cpu';
import RAM from './ram';

/**
 * CHIP-8 Virtual Machine
 */
export default class VirtualMachine {
    private cpu: CPU;
    private ram: RAM;

    constructor() {
        this.cpu = new CPU();
        this.ram = new RAM();
    }
}