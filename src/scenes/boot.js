import Phaser from 'phaser';

// Assets
import ship from '../assets/ship.png';
import sky from '../assets/sky.png';
import ball from '../assets/ball.png';
import bounceSound from '../assets/crossbow_dryshot.ogg';

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    // we will preload splashscreen here
    this.load.image('ship', ship);
  }

  create() {
    this.scene.start('Splashscreen');
  }
}

export default Boot;
