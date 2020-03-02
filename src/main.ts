import Chip8 from './chip8';

const vm: Chip8 = new Chip8('screen');
const cycleTime: number = 1000 / 60;

setInterval(() => {
    vm.cycle();
    vm.draw();
    vm.setKeys();
}, cycleTime);