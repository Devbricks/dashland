import Phaser from 'phaser';

// Config
import config from './config/config';

// Scenes
import BootScene from './scenes/boot';
import SplashScreenScene from './scenes/splashscreen';
import MenuScene from './scenes/menu';
import OptionsScene from './scenes/options';
import TutorialScene from './scenes/tutorial';
import CreditsScene from './scenes/credits';
import GameScene from './scenes/game';

// Styles
import './styles/global.css';

class DashLand extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Splashscreen', SplashScreenScene);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Tutorial', TutorialScene);
    this.scene.add('Credits', CreditsScene);

    this.scene.start('Boot');
  }
}

window.dashland = new DashLand(config);

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}
