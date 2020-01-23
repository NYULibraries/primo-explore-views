describe('primo-explore-custom-no-search-results', function () {
  describe('when a search returns no results', () => {
    const searchTerm = `asdfhello;worldgoodbye;worldasdf`

    before(() => {
      cy.visit(`?query=any,contains,${searchTerm}&tab=all&search_scope=all&vid=BHS&offset=0`)
    })


    it('renders No records found', () => {
      cy.get(`[data-cy=no-search-results]`)
        .contains(`No records found`)
        .should('exist')
    })

    describe('its links', () => {
      const links = {
        ['Request a book from E-ZBorrow (NYU only)']: `https://login.library.nyu.edu/ezborrow?query=${encodeURIComponent(searchTerm)}`,
        [`Search WorldCat for items in nearby libraries`]: `http://www.worldcat.org/search?qt=worldcat_org_all&q=${encodeURIComponent(searchTerm)}`,
        [`Ask a Librarian`]: `http://library.nyu.edu/ask`,
      }

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