import Chip8 from './chip8';

const vm = new Chip8('screen');

while (true) {
    vm.cycle();
    vm.draw();
    vm.setKeys();
}