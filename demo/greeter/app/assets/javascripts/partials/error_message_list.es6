class ErrorMessageList extends Cape.Partial {
  render(m) {
    m.div({ class: 'error-message' }, m => {
      m.p("Please fill in your name on this form.")
      m.ul(m => {
        this.errors.forEach(err => {
          m.li(err)
        })
      })
    })
  }
}
