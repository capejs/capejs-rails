window.router = new Cape.Router();

router.draw(m => {
  m.root('reception')
})

document.addEventListener("DOMContentLoaded", event => {
  window.router.mount('main');
  window.router.start();
});
