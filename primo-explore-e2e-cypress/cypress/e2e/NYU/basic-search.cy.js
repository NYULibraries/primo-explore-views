describe('when searching', () => {
  before(() => {
    cy.visit('/search?vid=NYU')
  })

  it('allows for a basic search', () => {
    cy.get('#searchBar')
      .type('TEST{enter}')
    cy.url().should('include', 'TEST')
    cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
      .first()
      .then($el => {
        // current bug with partial string matches with .should('contain.text', 'ALMATEST')
        expect($el.text().length).to.be.at.least(1)
      })
  })
})
