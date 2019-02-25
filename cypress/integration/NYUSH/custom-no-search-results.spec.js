describe('primo-explore-custom-no-search-results', function () {
  describe('when a search returns no results', () => {
    // bad search:asf;afsd;/1!
    before(() => {
      cy.visit(`?query=any,contains,asf;afsd;~2F1!&tab=all&search_scope=all&vid=NYUSH&offset=0`);
    })

    it('renders No records found', () => {
      cy.get(`.primo-explore-custom-no-search-results`)
        .contains(`No records found`)
    })

    describe('its links', () => {
      const links = {
        [`Search WorldCat for items in nearby libraries`]: `http://www.worldcat.org/search?qt=worldcat_org_all&q=asf%3Bafsd%3B~2F1!`,
        [`Ask a Librarian`]: `https://shanghai.nyu.edu/academics/library/services/aal`,
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