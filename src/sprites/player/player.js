import Phaser from 'phaser';

const MAX_SPEED = 500;
const ACCELERATION = 1000;
const DRAG = 0.95;
const MASS = 1;
const BOUNCE = 0.75;
const FRICTION = 0.1;
const GRAVITY = 0;
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
  }

  create(cursors) {
    const { scene } = this;
    scene.physics.world.enable(this);
    // this.setScale(window.devicePixelRatio / 3, window.devicePixelRatio / 3);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setMaxVelocity(MAX_SPEED);
    this.setDamping(true);
    this.setDrag(DRAG);
    this.setBounceY(BOUNCE);
    this.setMass(MASS);
    this.setFrictionY(FRICTION);
    this.setGravityY(GRAVITY);

    scene.add.existing(this);
    this.cursors = cursors;
  }

  update() {
    if (this.cursors.up.isDown) {
      // this.setVelocityY(-320 * window.devicePixelRatio);
      this.setAccelerationY(-ACCELERATION);
    } else if (this.cursors.down.isDown) {
      // this.setVelocityY(320 * window.devicePixelRatio);
      this.setAccelerationY(ACCELERATION);
    } else {
      this.setAccelerationY(0);
    }

    // if (this.cursors.up.isDown && this.body.touching.down) {
    //   this.setVelocityY(-450);
    // }

    console.log('speed', this.body.speed);
    console.log('maxVelocity', this.body.maxVelocity.y);
    console.log('drag', this.body.drag.y);
    console.log('acceleration', this.body.acceleration.y);
  }
}
