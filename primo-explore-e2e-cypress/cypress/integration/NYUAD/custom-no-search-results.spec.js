describe('primo-explore-custom-no-search-results', function () {
  describe('when a search returns no results', () => {
    // bad search:asf;afsd;/1!
    before(() => {
      cy.visit(`?query=any,contains,asf;afsd;~2F1!&tab=all&search_scope=all&vid=NYUAD&offset=0`)
    })

    it('renders No records found', () => {
      cy.get(`[data-cy=no-search-results]`)
        .contains(`No records found`)
        .should('exist')
    })

    describe('its links', () => {
      const links = {
        ['Request a book from E-ZBorrow (NYU only)']: `https://login.library.nyu.edu/ezborrow/nyuad?query=asf%3Bafsd%3B~2F1!`,
        [`Search WorldCat for items in nearby libraries`]: `http://www.worldcat.org/search?qt=worldcat_org_all&q=asf%3Bafsd%3B~2F1!`,
        [`journal`]: `/primo-explore/jsearch?vid=NYUAD`,
        [`article by citation`]: `/primo-explore/citationlinker?vid=NYUAD`,
        [`Ask a Librarian`]: `https://nyuad.nyu.edu/en/library/research-and-instruction-services/research-librarians/ask-a-librarian.html`,
      }

      it(`includes the expected number of links`, () => {
        cy.get(`[data-cy=no-results-more-info] a`)
          .should('have.lengthOf', Object.keys(links).length)
      })

      Object.entries(links).forEach(([text, href], idx) => {
        it(`${idx} anchor includes information about: ${text}`, () => {
          cy.get(`[data-cy=no-results-more-info] a`)
            .contains(text)
            .should('have.attr', 'href', href)
        })
      })
    })
  })
})