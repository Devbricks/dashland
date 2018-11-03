import Phaser from 'phaser';

import sky from '../assets/sky.png';
import ship from '../assets/ship.png';
import ball from '../assets/ball.png';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('ship', ship);
    this.load.image('ball', ball);
  }

  create() {
    // add Sky background sprit
    this.add.image(400, 300, 'sky');

    // Create ground platforms
    // this.platforms = this.physics.add.staticGroup();

    // Create Player
    this.player = this.physics.add.sprite(100, 250, 'ship');
    // this.player.body.setGravityY(200);
    // this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.ball = this.physics.add.sprite(100, 240, 'ball');


    // Create player animation
    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{ key: 'ship', frame: 4 }],
    //   frameRate: 20,
    // });

    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('ship', { start: 5, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    // set collides between Player and grounds
    // this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    // Create movement controller
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-320);
      // this.player.anims.play('left', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(320);
      // this.player.anims.play('right', true);
    } else {
      this.player.setVelocityY(0);
      // this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }
  }
}

export default Game;
