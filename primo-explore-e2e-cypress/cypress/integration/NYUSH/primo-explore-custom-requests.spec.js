describe('primo-explore-custom-requests', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      // PRIMOCIRCTEST-BOBST-MAIN-09-ZZ
      cy.visit('/fulldisplay?docid=nyu_aleph007467436&vid=NYUSH', {
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
  // Temporary logic for logged in users an all physical items through ILL
  describe(`if the user is logged in`, () => {
    before(() => {
      // PRIMOCIRCTEST-BOBST-MAIN-09-ZZ
      cy.visit('/fulldisplay?docid=nyu_aleph007467436&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
          contentWindow.$$mockUser = {
            'id': '1234567',
            'bor-status': '50',
          }
        }
      })
    })

    it('has visible primo-explore-custom-requests options', () => {
      cy.get('primo-explore-custom-requests')
        .should('be.visible')
    })

    it(`has visible 'Request' button`, () => {
      [
        `Request`,
      ].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('be.visible')
      })
    })

    it(`does not have a visible 'Login to see request options', 'Schedule a video loan', or 'Request ILL' button`, () => {
      [
        `Login to see request options`,
        `Schedule a video loan`,
        `Request ILL`,
      ].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })
  })
  xdescribe(`if the user is logged in`, () => {
    before(() => {
      // PRIMOCIRCTEST-BOBST-MAIN-09-ZZ
      cy.visit('/fulldisplay?docid=nyu_aleph007467436&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
          contentWindow.$$mockUser = {
            'id': '1234567',
            'bor-status': '50',
          }
        }
      })
    })

    it('has visible primo-explore-custom-requests options', () => {
      cy.get('primo-explore-custom-requests')
        .should('be.visible')
    })

    it(`has visible 'Request E-ZBorrow' button`, () => {
      [
        `Request E-ZBorrow`,
      ].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('be.visible')
      })
    })

    it(`does not have a visible 'Login to see request options', 'Schedule a video loan', or 'Request ILL' button`, () => {
      [
        `Login to see request options`,
        `Schedule a video loan`,
        `Request ILL`,
      ].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })
  })

  describe('with an NYUSH user in an NSHNG library', () => {
    before(() => {
      // PRIMOCIRCTEST-NSHNG-PPL-11-ZZ
      cy.visit('/fulldisplay?docid=nyu_aleph007470646&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
          contentWindow.$$mockUser = {
            id: '1234567',
            'bor-status': '20',
          }
        }
      })
    })

    it(`does not have a visible 'Request ILL' button`, () => {
      [
        `Request ILL`
      ].forEach(buttonLabel => {
        cy.get('primo-explore-custom-requests button')
          .contains(buttonLabel)
          .should('not.be.visible')
      })
    })

    // Note: I cannot check if an actual "Request" button will render without an actual user being logged in!'
    // Be sure to test this with a real user if making tweaks to this behavior.
  })
})
