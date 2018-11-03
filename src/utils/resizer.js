const canvasResizer = game => () => {
  const { canvas } = game;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${(windowWidth / gameRatio)}px`;
  } else {
    canvas.style.width = `${(windowWidth * gameRatio)}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};

export default canvasResizer;
