import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
  }

  create() {
    const { scene } = this;
    scene.physics.world.enable(this);
    this.setScale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.body.maxVelocity.y = 500;

    scene.add.existing(this);
  }
}
