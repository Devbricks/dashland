import Phaser from 'phaser';

// Config
import config from './config/config';

// Scenes
import GameScene from './scenes/game';

// Styles
import './styles/global.css';
// import './styles/scene.css';

// Utils
// import canvasResizer from './utils/resizer';

class DashLand extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

const game = new DashLand(config);

// fullscreen mode
// setTimeout(() => {
//   const resizer = canvasResizer(game);
//   resizer();
//   window.addEventListener('resize', resizer, false);
// }, 0);

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}
