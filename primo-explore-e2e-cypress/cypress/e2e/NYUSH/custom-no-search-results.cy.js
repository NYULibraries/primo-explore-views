describe('primo-explore-custom-no-search-results', function () {
  describe('when a search returns no results', () => {
    const searchTerm = `asdfhello;worldgoodbye;worldasdf`

    before(() => {
      cy.visit(`?query=any,contains,${searchTerm}&tab=all&search_scope=all&vid=NYUSH&offset=0`, {
        qs: {
          testAngularCompatibility: true,
        }
      })
    })

    it('renders No records found', () => {
      cy.get(`[data-cy=no-search-results]`)
        .contains(`No records found`)
    })

    describe('its links', () => {
      const links = {
        [`Search WorldCat for items in nearby libraries`]: `http://www.worldcat.org/search?qt=worldcat_org_all&q=${encodeURIComponent(searchTerm)}`,
        [`journal`]: `/primo-explore/jsearch?vid=NYUSH`,
        [`article by citation`]: `/primo-explore/citationlinker?vid=NYUSH`,
        [`Ask a Librarian`]: `https://shanghai.nyu.edu/academics/library/services/aal`,
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
