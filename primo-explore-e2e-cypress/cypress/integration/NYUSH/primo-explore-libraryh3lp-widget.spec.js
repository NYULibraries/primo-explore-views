describe('primo-explore-libraryh3lp-widget', () => {
  describe('when visiting the homepage', () => {
    before(() => {
      cy.visit('/search?vid=NYUSH')
    })

    it('has a visible open chat button', () => {
      cy.get('button.chat-tab.ss-chat.js-toggle-chat')
        .should('be.visible')
    })

    it('does not have a visible libraryh3lp element', () => {
      cy.get('.libraryh3lp')
        .should('not.be.visible')
    })

    it('does not have a visible close button', () => {
      cy.get('button.close-chat')
        .should('not.be.visible')
    })

    describe('when the Chat with us button is clicked', () => {
      before(() => {
        cy.contains('Chat with us')
          .click('center')
      })

      it('it opens a visible libraryh3lp iframe', () => {
        cy.get('div.chat-frame-wrap')
          .should('be.visible')
      })

      it('can close the iframe when clicking the close button', () => {
        cy.get('button.chat-close')
          .should('be.visible')
          .click('center')
          .get('div.chat-frame-wrap')
          .should('not.be.visible')
      })
    })
  })
})