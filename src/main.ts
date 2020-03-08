import Chip8 from './chip8';

const vm: Chip8 = new Chip8('screen');
const cycleTime: number = 1000 / 60;

vm.load("PONG").then(() => {
    setInterval(() => {
        vm.cycle();
        vm.logSate();
        vm.draw();
        vm.setKeys();
    }, cycleTime);
});