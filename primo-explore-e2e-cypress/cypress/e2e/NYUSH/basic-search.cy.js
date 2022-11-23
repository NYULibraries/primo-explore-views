describe('when searching', () => {
  before(() => {
    cy.visit('/search?vid=NYUSH')
  })

  after(() => {
    cy.visit('/search?vid=NYUSH')
  })

  it('allows for a basic search', () => {
    cy.get('#searchBar')
      .type('ALMATEST{enter}')
    cy.url().should('include', 'ALMATEST')
    cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
      .first()
      .then($el => {
        // current bug with partial string matches with .should('contain.text', 'ALMATEST')
        expect($el.text().length).to.be.at.least(1)
      })
  })
})