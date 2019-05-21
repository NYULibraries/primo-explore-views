describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=NYUSH') // change URL to match your dev URL
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
      ["Help using the Course Reserves tab"]: `https://library.nyu.edu/services/borrowing/course-reserves/find/`,
      ["BobCat FAQs"]: `http://library.answers.nyu.edu/friendly.php?slug=website/search&q=bobcat&t=0`,
      ["Ask a librarian"]: `https://shanghai.nyu.edu/academics/library/services/aal`,
      ["Facebook"]: `https://www.facebook.com/nyushlibrary/`,
      ["WeChat"]: `http://www.nyu.edu/servicelink/KB0014288/`,
      ["Explore our services"]: `https://shanghai.nyu.edu/academics/library/services`,
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
      ["journal"]: `/primo-explore/jsearch?vid=NYUSH`,
      ["article by citation"]: `/primo-explore/citationlinker?vid=NYUSH`,
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