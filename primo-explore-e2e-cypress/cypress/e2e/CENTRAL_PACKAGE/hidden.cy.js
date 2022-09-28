describe('Checks hidden elements', function() {
  describe('citation linker', function() {
    beforeEach(function() {
      cy.visit(`/citationlinker?vid=NYU`)
    })

    describe('radio options', function() {
      it('are not visible', function() {

        cy.get(`prm-citation-linker form`)
          .should('be.visible')
          .get(`[role="radio"]`)
          .then($buttons => {
            Array.from($buttons).forEach($button => {
              cy.wrap($button).should('not.be.visible')
            })
          })
      })
    })
  })
})