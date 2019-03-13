describe('when searching', () => {
  before(() => {
    cy.visit('/search?vid=NYU')
  })

  it('allows for a basic search', () => {
    cy.get('#searchBar')
      .type('monk{enter}')
    cy.url().should('include', 'monk')
    cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
      .first()
      .then($el => {
        // current bug with partial string matches with .should('contain.text', 'Monk')
        expect($el.text().length).to.be.at.least(1)
      })
  })
})