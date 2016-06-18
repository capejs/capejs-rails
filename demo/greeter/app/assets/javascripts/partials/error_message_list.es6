class ErrorMessageList extends Cape.Partial {
  render(m) {
    m.div({ class: 'error-message' }, m => {
      m.p("You have errors. Please fix them and submit again.")
      m.ul(m => {
        this.parent.errors.forEach(err => {
          m.li(err)
        })
      })
    })
  }
}
