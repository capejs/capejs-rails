window.router = new Cape.Router();

router.draw(m => {
  m.root('reception');
  m.page('visitor_form');
})

document.addEventListener("DOMContentLoaded", event => {
  window.router.mount('main')
  window.router.start()
});
