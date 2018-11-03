import Phaser from 'phaser';

// Plugins
import GameScalePlugin from 'phaser-plugin-game-scale';

// Styles
import './styles/global.css';
// import './styles/scene.css';

// Utils
import canvasResizer from './utils/resizer';

import constants from './config/constants';
import GameScene from './scenes/game';

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  canvas: document.querySelector('#dashland-canvas'),
  antialias: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 10,
      },
      debug: false,
    },
  },
  scene: [GameScene],
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: Phaser.Plugins.GameScalePlugin,
      mapping: 'gameScale',
      data: {
        mode: 'fit',
        resizeCameras: true,
      },
    }],
  },
};

const game = new Phaser.Game(config);

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
