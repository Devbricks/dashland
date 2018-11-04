import Phaser from 'phaser';

// Config
import config from './config/config';

// Styles
import './styles/global.css';
// import './styles/scene.css';

// Utils
import canvasResizer from './utils/resizer';

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
