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
      ["BobCat Standard"]: {
        href: `http://aleph.library.nyu.edu`,
        target: '_blank',
      },
      ["Browse user tags"]: {
        href: `/primo-explore/tags?vid=CU`,
      },
      ["Online Renewal"]: {
        href: `https://eshelf.library.nyu.edu/account?institution=CU`,
        target: `_blank`,
      },
      ["Other Library Catalogs"]: {
        href: `http://library.cooper.edu/other_library_catalogs_page.html`,
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
      ["Consortium libraries & participating libraries"]: {
        href: `http://library.cooper.edu/primo/side_consortium_using.html`,
        target: '_blank',
      },
      ["Limiting results to the Cooper Library"]: {
        href: `http://library.cooper.edu/primo/side_cooper_using.html`,
        target: `_blank`,
      },
      ["Using Course Reserves"]: {
        href: `http://library.cooper.edu/primo/side_reserves_using.html`,
        target: `_blank`,
      },
      ["Contact Us"]: {
        href: `http://library.cooper.edu/primo/side_contact.html`,
        target: `_blank`,
      },
      ["Cooper Library Access & Hours"]: {
        href: `http://library.cooper.edu/library_info_page.html#A`,
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