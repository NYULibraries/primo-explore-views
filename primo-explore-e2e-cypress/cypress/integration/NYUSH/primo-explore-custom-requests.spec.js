describe('primo-explore-custom-requests', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      cy.visit('/fulldisplay?docid=nyu_aleph006344819&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = false
        }
      })
    })

    it(`has a Login to see request options button`, () => {
        cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
          .should('be.visible')
          .get('primo-explore-custom-requests button')
        .contains(`Login to see request options`)
        .should('be.visible')
    })

    it(`no other button is visible`, () => {
      [`Request E-ZBorrow`, `Request ILL`, `Schedule a video loan`].forEach(buttonLabel => {
        cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
          .should('be.visible')
          .get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })
  })
  describe(`if the user is logged in`, () => {
    before(() => {
      cy.visit('/fulldisplay?docid=nyu_aleph006344819&vid=NYU', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
        }
      })
    })

    it(`does not have a visible Login to see request options or Request ILL button`, () => {
      [`Login to see request options`, `Request ILL`].forEach(buttonLabel => {
        cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
          .should('be.visible')
          .get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })

    it(`has visible Request E-ZBorrow and Schedule a video loan buttons`, () => {
      [`Request E-ZBorrow`, `Schedule a video loan`].forEach(buttonLabel => {
        cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
          .should('be.visible')
          .get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('be.visible')
      })
    })
  })
})
