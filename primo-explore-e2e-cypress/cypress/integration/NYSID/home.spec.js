describe('The Home Page', function () {
  before(() => {
    cy.visit('?vid=CU') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Additional Options', () => {
    const links = {
      ["NYSID Library Website"]: {
        href: `http://library.nysid.edu/library`,
        target: '_blank',
      },
      ["Find Articles & Databases"]: {
        href: `http://library.nysid.edu/library/resources/articles/`,
        target: `_blank`,
      },
      ["Find Images"]: {
        href: `http://libguides.nysid.edu/ImageResources`,
        target: `_blank`,
      },
      ["Search WorldCat for books at other libraries"]: {
        href: `http://www.worldcat.org/search?qt=worldcat_org_all`,
        target: `_blank`,
      },
      ["BobCat Standard"]: {
        href: `http://aleph.library.nyu.edu`,
        target: `_blank`,
      },
      ["Browse tags"]: {
        href: `/primo-explore/tags?vid=NYSID`,
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
      ["Contact NYSID Library"]: {
        href: `mailto:libraryinfo@nysid.edu`
      },
      ["NYSID Subject & Resource Guides"]: {
        href: `http://libguides.nysid.edu/browse.php`,
        target: `_blank`,
      },
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