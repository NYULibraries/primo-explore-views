describe('The Home Page', function () {
  beforeEach(() => {
    cy.visit('?vid=NYU') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  it('allows for a basic search', () => {
    cy.get('#searchBar')
      .type('monk{enter}')
    cy.url().should('include', 'monk')
    cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
      .first()
      .contains('Monk')
  })
})