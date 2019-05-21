describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=NYUAD') // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Using BobCat', () => {
    [
      'Books & More',
      'Articles & Databases',
      'Course Reserves'
    ].forEach(infoText => {
      it(`includes information about: ${infoText}`, () => {
        cy.get('[data-cy=home-using-bobcat]').then($card => {
          const text = $card.text()
            expect(text).to.include(infoText)
          })
        })
    })
  })

  describe('Need Help?', () => {
    const links = {
      ["Ask a librarian"]: `https://nyuad.nyu.edu/en/library/research-and-instruction-services/research-librarians/ask-a-librarian.html`,
      ["Facebook"]: `http://www.facebook.com/nyu.abudhabi.library`,
      ["Twitter"]: `https://twitter.com/nyuadlibrary`,
      ["Explore our services"]: `https://nyuad.nyu.edu/en/library.html`,
      ["BobCat FAQs"]: `http://library.answers.nyu.edu/friendly.php?slug=website/search&q=bobcat&t=0`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-need-help]`)
          .contains(text)
          .should('have.attr', 'href', href)
      })
    })
  })

  describe('Additional Options', () => {
    const links = {
      ["Search WorldCat for items in nearby libraries"]: `http://www.worldcat.org/search?qt=worldcat_org_all`,
      ["Request a book from E-ZBorrow"]: `https://login.library.nyu.edu/ezborrow/nyuad`,
      ["journal"]: `/primo-explore/jsearch?vid=NYUAD`,
      ["article by citation"]: `/primo-explore/citationlinker?vid=NYUAD`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-additional-options]`)
          .contains(text)
          .should('have.attr', 'href', href)
      })
    })
  })
})