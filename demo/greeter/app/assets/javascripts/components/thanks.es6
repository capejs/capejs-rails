class Thanks extends Cape.Component {
  render(m) {
    m.p("Thank you!")
    m.div(m => {
      m.onclick(e => window.router.navigateTo('')).btn('Return to the top page')
    })
  }
}
