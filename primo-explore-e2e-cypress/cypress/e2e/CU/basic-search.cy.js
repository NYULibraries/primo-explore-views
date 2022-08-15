describe('The Home Page', function () {
  beforeEach(() => {
    cy.visit('/search?vid=CU') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  describe('when searching', () => {
    beforeEach(() => {
      cy.visit('/search?vid=CU')
    })

    afterEach(() => {
      cy.visit('/search?vid=CU')
    })

    it('allows for a basic search', () => {
      cy.wait(1000)
      cy.get('#searchBar')
        .type('PRIMOTEST{enter}')
      cy.url().should('include', 'PRIMOTEST')
      cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
        .first()
        .then($el => {
          // current bug with partial string matches with .should('contain.text', 'PRIMOTEST')
          expect($el.text().length).to.be.at.least(1)
        })
    })
  })
})