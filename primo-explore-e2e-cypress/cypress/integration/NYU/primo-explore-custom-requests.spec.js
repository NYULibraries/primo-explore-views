describe('primo-explore-custom-requests', () => {
  describe('if the user is not logged in', () => {
    before(() => {
     cy.visit('/fulldisplay?docid=nyu_aleph007365590&vid=NYU', {
       onBeforeLoad: (contentWindow) => {
         contentWindow.$$mockUserLoggedIn = false
       }
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
      cy.visit('/fulldisplay?docid=nyu_aleph007365590&vid=NYU', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
        }
      })
    })

    it('has visible primo-explore-custom-requests options', () => {
      cy.get('primo-explore-custom-requests')
        .should('be.visible')
    })

    it(`has visible 'Request E-ZBorrow' button`, () => {
      [`Request E-ZBorrow`].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('be.visible')
      })
    })

    it(`does not have a visible 'Login to see request options', 'Schedule a video loan', or 'Request ILL' button`, () => {
      [`Login to see request options`, `Request ILL`, `Schedule a video loan`].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })
  })
})
