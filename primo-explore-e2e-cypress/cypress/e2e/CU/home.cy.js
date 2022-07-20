describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=CU', {
      qs: {
        testAngularCompatibility: true,
      }
    }) // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Additional Options', () => {
    const links = {
      ["BobCat Standard"]: {
        href: `http://aleph.library.nyu.edu`,
        target: '_blank',
      },
      ["Browse user tags"]: {
        href: `/primo-explore/tags?vid=CU`,
      },
      ["My Library Account"]: {
        href: `https://eshelf.library.nyu.edu/account?institution=CU`,
        target: `_blank`,
      },
    }

    it(`includes the expected number of links`, () => {
      cy.get(`[data-cy=home-additional-options] a`)
        .should('have.lengthOf', Object.keys(links).length)
    })

    Object.entries(links).forEach(([text, { href, target }]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-additional-options] a`)
          .contains(text)
          .should($text => {
            expect($text).to.have.attr('href', href)
            target && expect($text).to.have.attr('target', target)
          })
      })
    })
  })

  describe('Need Help?', () => {
    const links = {
      ["Contact Us"]: {
        href: `https://library.cooper.edu/contactus/`,
        target: `_blank`,
      },
      ["Cooper Library Access & Hours"]: {
        href: `https://library.cooper.edu/visit/`,
        target: `_blank`,
      },
      ["Cooper Library Home Page"]: {
        href: `http://library.cooper.edu`,
        target: `_blank`,
      }
    }

    it(`includes the expected number of links`, () => {
      cy.get(`[data-cy=home-need-help] a`)
        .should('have.lengthOf', Object.keys(links).length)
    })

    Object.entries(links).forEach(([text, { href, target }]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-need-help] a`)
          .contains(text)
          .should($text => {
            expect($text).to.have.attr('href', href)
            target && expect($text).to.have.attr('target', target)
          })
      })
    })
  })
})
