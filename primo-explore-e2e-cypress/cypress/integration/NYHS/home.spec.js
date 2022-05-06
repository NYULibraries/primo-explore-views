describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=NYHS') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Need Help?', () => {
    const links = {
      ["Collections Request System"]: `https://nyhs.aeon.atlas-sys.com/aeon/`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-my-workspace]`)
          .contains(text)
          .should('have.attr', 'href', href)
          .should('have.attr', 'target', '_blank')
      })
    })
  })

  describe('Additional Options', () => {
    const links = {
      ["BobCat Standard"]: `http://aleph.library.nyu.edu`,
      ["Library Homepage"]: `http://www.nyhistory.org/library`,
      ["Manuscript Collections Finding Aids"]: `http://www.nyhistory.org/library/findingaids/manuscripts`,
      ["Graphic Collections Finding Aids"]: `http://www.nyhistory.org/library/findingaids/printroom`,
      ["Full-text Finding Aid Search"]: `https://specialcollections.library.nyu.edu/search/?f%5Brepository_sim%5D%5B%5D=nyhs`,
      ["Dining Menus"]: `https://www.nyhistory.org/library`,
      ["Hotel Files"]: `https://www.nyhistory.org/library`,
      ["Apartment Building Files"]: `https://www.nyhistory.org/library`,
      ["Digital Library"]: `https://www.nyhistory.org/library`,
      ["Onsite Electronic Resources"]: `https://www.nyhistory.org/library`,
      ["E-mail Reference Form"]: `http://www.nyhistory.org/library/reference-assistance`,
      ["Rights and Reproductions"]: `http://www.nyhistory.org/about/rights-reproductions`,
    }

    it(`includes the expected number of links`, () => {
      cy.get(`[data-cy=home-additional-options] a`)
        .should('have.lengthOf', Object.keys(links).length)
    })

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-additional-options] a`)
          .contains(text)
          .should('have.attr', 'href', href)
          .should('have.attr', 'target', '_blank')
      })
    })
  })
})