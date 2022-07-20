describe('The Home Page', function () {
  before(() => {
    cy.visit('/search?vid=NYU', {
      qs: {
        testAngularCompatibility: true,
      }
    }) // change URL to match your dev URL
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
      .should('exist')
  })

  describe('Using BobCat', () => {
    [
      'What is in Books & More?',
      'Tools to help with your search:',
      'Looking for Articles or Databases?'
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
      ["Ask A Librarian"]: `https://library.nyu.edu/ask/`,
      ["InterLibrary Loan"]: `https://library.nyu.edu/services/borrowing/from-non-nyu-libraries/interlibrary-loan/`,
      ["expert curated research guides"]: `http://guides.nyu.edu`,
      ["WorldCat"]: `https://www.worldcat.org/search?qt=worldcat_org_all`,
    }

    Object.entries(links).forEach(([text, href]) => {
      it(`includes information about: ${text}`, () => {
        cy.get(`[data-cy=home-need-help]`)
          .contains(text)
          .should('have.attr', 'href', href)
      })
    })
  })
})
