class VisitorForm extends Cape.Component {
  init() {
    this.agent = new VisitorListAgent(this)
    this.refresh()
  }

  render(m) {
    m.h2('Visitors Entry Form')
    if (this.errors) {
      m.p("You have errors. Please fix them and submit again.")
    }
    else {
      m.p("Please fill in your name on this form.")
    }
    m.formFor('visitor', m => {
      m.div(m => {
        m.labelFor('given_name', 'Given Name').sp().textField('given_name')
      })
      m.div(m => {
        m.labelFor('family_name', 'Family Name').sp().textField('family_name')
      })
      m.onclick(e => this.submit()).btn('Submit')
    })
  }

  submit() {
    this.agent.create(this.paramsFor('visitor'), data => {
      if (data.result === 'Success') {
        window.router.navigateTo('thanks')
      }
      else {
        this.errors = data.errors
        this.refresh()
      }
    })
  }
}
