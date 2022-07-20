describe('primo-explore-custom-request-wrapper', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      // PRIMOCIRCTEST-BOBST-MAIN-09-ZZ
      cy.visit('/fulldisplay?docid=nyu_aleph008073830&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = false
        },
        qs: {
          testAngularCompatibility: true,
        },
      })
    })

    it(`has a Login to see request options button`, () => {
      cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
        .should('be.visible')
        .get('primo-explore-custom-request-wrapper button')
        .contains(`Login to see request options`)
        .should('be.visible')
    })

    it(`no other button is visible`, () => {
      cy.get(`prm-location-items .md-2-line > :nth-child(1) > .md-list-item-text`)
        .should('be.visible')
        .get('primo-explore-custom-request-button button')
        .should('not.be.visible')
    })
  })
  describe(`if the user is logged in`, () => {

    describe('and the item has electronic copies', () => {
      before(() => {
        // nyu_aleph002934513 - requires more permanent record
        cy.visit('/fulldisplay?docid=nyu_aleph002934513&vid=NYUSH', {
          onBeforeLoad: (contentWindow) => {
            contentWindow.$$mockUserLoggedIn = true
            contentWindow.$$mockUser = {
              'id': '1234567',
              'bor-status': '50',
            }
          },
          qs: {
            testAngularCompatibility: true,
          }
        })
      })

      it('has does not have a visible "Request Scan" option', () => {
        cy.get('button > span[translate="PhotocopyRequest"]').should('not.exist')
      })


    })

    describe('and the item is unavailable', () => {
      before(() => {
        // PRIMOCIRCTEST-BOBST-MAIN-09-ZZ
        // cy.visit('/fulldisplay?docid=nyu_aleph008073830&vid=NYUSH', {
        // Need a new record that is unavailable
        cy.visit('/fulldisplay?docid=nyu_aleph008073830&vid=NYUSH', {
          onBeforeLoad: (contentWindow) => {
            contentWindow.$$mockUserLoggedIn = true
            contentWindow.$$mockUser = {
              'id': '1234567',
              'bor-status': '50',
            }
          },
          qs: {
            testAngularCompatibility: true,
          }
        })
      })

      it('does not have visible primo-explore-custom-request-wrapper options', () => {
        cy.get('primo-explore-custom-request-wrapper')
          .should('not.exist')
      })

      xit(`has visible 'Request ILL' button`, () => {
        [
          `Request ILL`,
        ].forEach(buttonLabel => {
          cy.get('primo-explore-custom-request-button button')
            .contains(buttonLabel)
            .should('be.visible')
        })
      })

      it(`does not have a visible 'Login to see request options' button`, () => {
        [
          `Login to see request options`,
        ].forEach(buttonLabel => {
          cy.get('primo-explore-custom-request-wrapper button')
            .contains(buttonLabel)
            .should('not.be.visible')
        })
      })
    })
  })

    // Note: I cannot check if an actual "Request" button will render without an actual user being logged in!'
    // Be sure to test this with a real user if making tweaks to this behavior.

})

// Potential test to reenable
// with an NYUSH user in an NSHNG library
// PRIMOCIRCTEST-NSHNG-PPL-11-ZZ
