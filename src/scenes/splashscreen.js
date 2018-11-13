import Phaser from 'phaser';

// Assets
import track from '../assets/standard-track.png';
import ball from '../assets/ball.png';
import bounceSound from '../assets/crossbow_dryshot.ogg';

class Splashscreen extends Phaser.Scene {
  constructor() {
    super({ key: 'Splashscreen' });
  }

  preload() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.ship = this.add.image(width / 2, 200, 'ship');
    this.ship.setAngle(-90);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, height - 75, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height - 50,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, height - 65, 300 * value, 30);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();

      setTimeout(() => {
        this.startGame();
      }, 1000);
    });

    this.timedEvent = this.time.delayedCall(3000, this.startGame, [], this);

    this.load.image('track', track);
    this.load.image('ball', ball);

    this.load.audio('bounceSound', bounceSound);
  }

  startGame() {
    this.scene.start('Game');
  }
}

export default Splashscreen;
