describe('primo-explore-custom-requests', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      cy.visit('/fulldisplay?docid=nyu_aleph006344819&vid=NYUAD').then(win => {
        win.$$mockUserLoggedIn = false
      })
    })

    it('has visible primo-explore-custom-requests options', () => {
      cy.get('primo-explore-custom-requests')
        .should('be.visible')
    })

    it(`has a Login to see request options button`, () => {
      cy.get('primo-explore-custom-requests button')
        .contains(`Login to see request options`)
        .should('exist')
        .should('be.visible')
    })

    it(`no other button is visible`, () => {
      [`Request E-ZBorrow`, `Request ILL`, `Schedule a video loan`].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })
  })
 describe(`if the user is logged in`, () => {
    before(() => {
        cy.visit('/fulldisplay?docid=nyu_aleph006344819&vid=NYUAD').then(win => {
          win.$$mockUserLoggedIn = true
        })
    })

    it('has visible primo-explore-custom-requests options', () => {
      cy.get('primo-explore-custom-requests')
        .should('be.visible')
    })

    it(`does not have a visible Login to see request options or Request ILL button`, () => {
      [`Login to see request options`, `Request ILL`].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })

    it(`has visible Request E-ZBorrow and Schedule a video loan buttons`, () => {
      [`Request E-ZBorrow`, `Schedule a video loan`].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('be.visible')
      })
    })
  })
})
