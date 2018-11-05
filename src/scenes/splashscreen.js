import Phaser from 'phaser';

class Splashscreen extends Phaser.Scene {
  constructor() {
    super({ key: 'Splashscreen' });
  }

  preload() {
    this.add.image(400, 200, 'logo');

    setTimeout(() => {
      this.scene.start('Game');
    }, 2000);
  }
}

export default Splashscreen;
