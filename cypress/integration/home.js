describe('The Home Page', function () {
  before(() => {
    cy.visit('?vid=NYSID') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  describe('when searching', () => {
    before(() => {
      cy.visit('?vid=NYSID')
    })

    after(() => {
      cy.visit('?vid=NYSID')
    })

    it('allows for a basic search', () => {
      cy.get('#searchBar')
        .type('monk{enter}')
      cy.url().should('include', 'monk')
      cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
        .first()
        .then($el => {
          // current bug with partial string matches with .should('contain.text', 'Monk')
          expect($el.text()).to.include('Monk')
        })
    })
  })
})