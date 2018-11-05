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
    this.player = this.physics.add.sprite(50, this.centerY(), 'ship');
    this.player.setScale(0.3, 0.3);
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);
  }

  createBall() {
    this.ball = this.physics.add.sprite(250, 240, 'ball');
    this.ball.setCircle(25);
    this.ball.setScale(0.4, 0.4);

    this.ball.setCollideWorldBounds(true);
    this.ball.body.setAllowGravity(false);
    this.ball.setBounce(1);
  }

  shootBall() {
    this.ball.setVelocityX(300);
    this.ball.setVelocityY(300);
  }

  ballHitPaddle() {
    const diff = 0;
    const paddleZones = {
      farLeft: '',
      middleLeft: '',
      center: '',
      middleRight: '',
      farRight: '',
    };

    const distance = this.ball.y - this.player.y;
    console.log(distance);

    // TODO: calculate the distance based on sprite demensions instead of using fixed values
    if (distance >= -10 && distance <= 10) {
      console.log('center');
    } else if (distance >= -30 && distance < -10) {
      console.log('middleLeft');
    } else if (distance >= -50 && distance < -30) {
      console.log('farLeft');
    } else if (distance > 10 && distance <= 30) {
      console.log('middleRight');
    } else if (distance > 30 && distance <= 50) {
      console.log('farRight');
    }

    // if (this.ball.x < this.ship.x) {
    //   //  Ball is on the left-hand side of the paddle
    //   diff = _paddle.x - _ball.x;
    //   _ball.body.velocity.x = (-10 * diff);
    // } else if (_ball.x > _paddle.x) {
    //   //  Ball is on the right-hand side of the paddle
    //   diff = _ball.x - _paddle.x;
    //   _ball.body.velocity.x = (10 * diff);
    // } else {
    //   //  Ball is perfectly in the middle
    //   //  Add a little random X to stop it bouncing straight up!
    //   _ball.body.velocity.x = 2 + Math.random() * 8;
    // }
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('ship', ship);
    this.load.image('ball', ball);
    this.load.audio('bounceSound', bounceSound);
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.bounceSound = this.sound.add('bounceSound');

    this.physics.world.checkCollision.left = false;

    this.createShip();
    this.createBall();

    this.physics.add.collider(this.ball, this.player, () => {
      this.bounceSound.play();
      this.ballHitPaddle();
    });

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
