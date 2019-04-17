describe('primo-explore-custom-no-search-results', function () {
  describe('when a search returns no results', () => {
    // bad search:asf;afsd;/1!
    before(() => {
      cy.visit(`?query=any,contains,asf;afsd;~2F1!&tab=all&search_scope=all&vid=NYU&offset=0`)
    })

    it('renders No records found', () => {
      cy.get(`[data-cy=no-search-results]`)
        .contains(`No records found`)
        .should('exist')
    })

    describe('its links', () => {
      const links = {
        ['Request a book from E-ZBorrow (NYU only)']: `https://login.library.nyu.edu/ezborrow?query=asf%3Bafsd%3B~2F1!`,
        [`Search WorldCat for items in nearby libraries`]: `http://www.worldcat.org/search?qt=worldcat_org_all&q=asf%3Bafsd%3B~2F1!`,
        [`Have a full citation? Use the Citation Linker`]: `/primo-explore/citationlinker?vid=NYU`,
        [`Ask a Librarian`]: `http://library.nyu.edu/ask`,
      }

      it(`includes the expected number of links`, () => {
        cy.get(`[data-cy=no-results-more-info] a`)
          .should('have.lengthOf', Object.keys(links).length)
      })

      Object.entries(links).forEach(([text, href]) => {
        it(`includes information about: ${text}`, () => {
          cy.get(`[data-cy=no-results-more-info]`)
            .contains(text)
            .should('have.attr', 'href', href)
        })
      })
    })
  })
})