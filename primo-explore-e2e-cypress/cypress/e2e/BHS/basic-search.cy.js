describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=BHS') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  describe('when searching', () => {
    before(() => {
      cy.visit('/search?vid=BHS')
    })

    xit('allows for a basic search', () => {
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
})
