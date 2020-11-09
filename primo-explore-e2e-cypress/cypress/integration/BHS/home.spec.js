describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=BHS') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Other BHS Catalogs', () => {
    const links = {
      ["Finding Aid Portal"]: `http://dlib.nyu.edu/findingaids/`,
      ["Image Catalog"]: `https://brooklynhistory.pastperfectonline.com/`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-other-bhs-catalogs]`)
          .contains(text)
          .should('have.attr', 'href', href)
          .should('have.attr', 'target', '_blank')
      })
    })
  })

  describe('Need Help?', () => {
    const links = {
      ["Reference Question?"]: `http://www.brooklynhistory.org/library/ask.html`,
      ["Visit the Library"]: `http://www.brooklynhistory.org/library/visit.html`,
      ["Family Research"]: `http://www.brooklynhistory.org/library/genealogy.html`,
      ["House Research"]: `http://www.brooklynhistory.org/library/house.html`,
      ["Rights & Reproductions"]: `http://www.brooklynhistory.org/library/reproduction.html`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-help]`)
          .contains(text)
          .should('have.attr', 'href', href)
          .should('have.attr', 'target', '_blank')
      })
    })
  })

  describe('Additional Options', () => {
    const links = {
      ["CBH blog"]: `http://brooklynhistory.org/blog`,
      ["BobCat Standard"]: `http://aleph.library.nyu.edu`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-additional-options]`)
          .contains(text)
          .should('have.attr', 'href', href)
          .should('have.attr', 'target', '_blank')
      })
    })
  })
})
