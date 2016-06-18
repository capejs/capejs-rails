var $router = new Cape.Router()

$router.draw(m => {
  m.root('reception')
  m.page('visitor_form')
  m.page('thanks')
  m.many('visitors', { only: [ 'index'] })
})

document.addEventListener("DOMContentLoaded", event => {
  $router.mount('main')
  $router.start()
})
