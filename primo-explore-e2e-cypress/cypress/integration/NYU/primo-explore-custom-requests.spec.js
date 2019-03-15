describe('primo-explore-custom-requests', () => {
  before(() => {
    cy.visit('/fulldisplay?docid=nyu_aleph006344819&vid=NYU')
  })

  it('successfully loads', () => {
    cy.get('.result-item-text')
      .should('exist')
  })

  it('has visible primo-explore-custom-requests options', () => {
    cy.get('primo-explore-custom-requests')
      .should('exist')
  })

  it(`has a Login to see request options button`, () => {
    cy.get('primo-explore-custom-requests button')
      .contains(`Login to see request options`)
      .should('exist')
  })
})