import Phaser from 'phaser';

// Assets
import ship from '../assets/images/ship.png';
import ship2 from '../assets/images/ship2.png';

const imageArray = {
  1: ship,
  2: ship2,
};

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    const ratio = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;
    this.load.image('ship', imageArray[ratio]);
  }

  create() {
    this.scene.start('Splashscreen');
  }
}

export default Boot;
