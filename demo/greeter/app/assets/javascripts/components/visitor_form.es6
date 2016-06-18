class VisitorForm extends Cape.Component {
  render(m) {
    m.h2('Visitors Entry Form')
    m.p("Please fill in your name on this form.")
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('name')
      })
      m.onclick(e => window.router.navigateTo('')).btn('Submit')
    })
  }
}
