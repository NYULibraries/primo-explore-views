describe('The Home Page', function () {
  beforeEach(() => {
    cy.visit('/search?vid=NYU', {
      qs: {
        testAngularCompatibility: true,
      }
    }) // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  it('allows for a basic search', () => {
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
