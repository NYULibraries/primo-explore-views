describe('primo-explore-custom-request-wrapper', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      // Documents algériens. Série politique.
      cy.visit('/fulldisplay?docid=nyu_aleph002138166&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = false
        }
      })
    })

    it(`has a Login to see request options button`, () => {
      cy.get(`prm-authentication .button-with-icon.zero-margin.md-button.md-primoExplore-theme.md-ink-ripple`)
        .should('be.visible')
        .get('prm-request-services button')
        .contains(`Login`)
        .should('be.visible')
    })

    it(`no other button is visible`, () => {
      cy.get(`prm-authentication .button-with-icon.zero-margin.md-button.md-primoExplore-theme.md-ink-ripple`)
        .should('be.visible')
        .get('prm-location-items button')
        .should('not.be.visible')
    })
  })
  describe(`if the user is logged in`, () => {

    describe('and the item has electronic copies', () => {
      before(() => {
        // nyu_aleph009021088 - requires more permanent record
        cy.visit('/fulldisplay?docid=nyu_aleph009021088&vid=NYUAD', {
          onBeforeLoad: (contentWindow) => {
            contentWindow.$$mockUserLoggedIn = true
            contentWindow.$$mockUser = {
              'id': '1234567',
              'bor-status': '50',
            }
          }
        })
      })

      it('has does not have a visible "Request Scan" option', () => {
        cy.get('button > span[translate="PhotocopyRequest"]').should('not.exist')
      })


    })

    describe('and the item is unavailable', () => {
      before(() => {
        // Documents algériens. Série politique.
        // cy.visit('/fulldisplay?docid=nyu_aleph002138166&vid=NYUAD', {
        // Need a new record that is unavailable
        cy.visit('/fulldisplay?docid=nyu_aleph002138166&vid=NYUAD', {
          onBeforeLoad: (contentWindow) => {
            contentWindow.$$mockUserLoggedIn = true
            contentWindow.$$mockUser = {
              'id': '1234567',
              'bor-status': '50',
            }
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
          cy.get('prm-location-items button')
            .contains(buttonLabel)
            .should('not.exist')
        })
      })
    })
  })

    // Note: I cannot check if an actual "Request" button will render without an actual user being logged in!'
    // Be sure to test this with a real user if making tweaks to this behavior.

})

// Potential test to reenable
// with an NYUSH user in an NSHNG library
// ALMATEST NSHNG_PPL_ZZ_11 Loaned
