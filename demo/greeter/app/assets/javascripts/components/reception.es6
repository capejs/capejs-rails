class Reception extends Cape.Component {
  render(m) {
    m.p("Hi, I am Greeter. Nice to meet you!")
    m.div(m => {
      m.onclick(e => $router.navigateTo('visitor_form'))
        .btn('Proceed to the Entry Form')
    })
    m.div(m => {
      m.onclick(e => $router.navigateTo('visitors'))
        .btn('Show the list of registered visitors')
    })
  }
}
