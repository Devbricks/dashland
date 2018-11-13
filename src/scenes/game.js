import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  centerX() {
    return this.sys.game.config.width / 2;
  }

  centerY() {
    return this.sys.game.config.height / 2;
  }

  createShip() {
    this.player = this.physics.add.sprite(50 * window.devicePixelRatio, this.centerY(), 'ship');
    this.player.setScale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);
    this.player.body.maxVelocity.y = 500;
  }

  createBall() {
    this.onPaddle = true;
    this.ball = this.physics.add.sprite(100, this.centerY(), 'ball');
    this.ball.setCircle(25);
    this.ball.setScale(0.4, 0.4);

    this.ball.setCollideWorldBounds(true);
    this.ball.body.setAllowGravity(false);
    this.ball.setBounce(1);
  }

  shootBall() {
    if (this.onPaddle) {
      this.onPaddle = false;
      this.ball.setVelocityX(300 * window.devicePixelRatio);
      this.ball.setVelocityY(300 * window.devicePixelRatio);
    }
  }

  ballHitPaddle() {
    const distance = this.ball.y - this.player.y;

    // TODO: calculate the distance based on sprite demensions instead of using fixed values
    if (distance >= -10 && distance <= 10) {
      this.ball.setVelocityX(this.ball.body.velocity.x + (20 * window.devicePixelRatio));
      this.ball.setVelocityY(this.ball.body.velocity.y + (20 * window.devicePixelRatio));
    } else if (distance >= -30 && distance < -10) {
      this.ball.setVelocityX(this.ball.body.velocity.x + (10 * window.devicePixelRatio));
    } else if (distance >= -50 && distance < -30) {
      this.ball.setVelocityX(this.ball.body.velocity.x + (5 * window.devicePixelRatio));
    } else if (distance > 10 && distance <= 30) {
      this.ball.setVelocityX(this.ball.body.velocity.x - (5 * window.devicePixelRatio));
    } else if (distance > 30 && distance <= 50) {
      this.ball.setVelocityX(this.ball.body.velocity.x - (10 * window.devicePixelRatio));
    }
  }

  preload() {
    // empty for now
  }

  create() {
    const { width, height } = this.sys.canvas;
    // add Sky background sprit
    this.add.image(0, 0, 'track').setOrigin(0, 0).setDisplaySize(width / window.devicePixelRatio, height / window.devicePixelRatio);
    this.bounceSound = this.sound.add('bounceSound');

    this.physics.world.checkCollision.left = false;

    this.createShip();
    this.createBall();

    this.physics.add.collider(this.ball, this.player, () => {
      this.bounceSound.play();
      this.ballHitPaddle();
    });

    this.input.keyboard.on('keyup_SPACE', this.shootBall, this);
    this.input.on('pointerdown', this.shootBall, this);

    // this.input.on('pointerdown', () => {
    //   this.moveDown = true;
    // }, this);

    // this.input.on('pointerup', () => {
    //   this.moveUp = true;
    // }, this);

    // this.input.on('touchend', () => {
    //   this.moveDown = false;
    //   this.moveUp = false;
    // });

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.input.keyboard.on('keyup_DOWN', () => {
    //   console.log('down');
    //   this.player.body.velocity.y += 100;
    // }, this);

    // this.input.keyboard.on('keyup_UP', () => {
    //   console.log('up');
    //   this.player.body.acceleration.y -= 100;
    // }, this);

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
    if (this.onPaddle) {
      this.ball.y = this.player.y;
    }
    // Create movement controller
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.up.isDown || this.moveDown) {
      this.player.setVelocityY(-320 * window.devicePixelRatio);
      // this.player.body.acceleration.y -= 10;
      // this.player.anims.play('left', true);
    } else if (this.cursors.down.isDown || this.moveUp) {
      this.player.setVelocityY(320 * window.devicePixelRatio);
      // this.player.body.acceleration.y += 10;
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
