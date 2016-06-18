window.router = new Cape.Router()

router.draw(m => {
  m.root('reception')
  m.page('visitor_form')
  m.page('thanks')
})

document.addEventListener("DOMContentLoaded", event => {
  window.router.mount('main')
  window.router.start()
})
