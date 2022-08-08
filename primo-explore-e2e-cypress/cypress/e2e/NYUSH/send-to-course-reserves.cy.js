describe('send-to-course-reserves', () => {
  describe('if the user is not logged in', () => {
    beforeEach(() => {
      cy.visit('/search?query=any,contains,work&tab=crp&search_scope=cre&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = false
        }
      })
    });

    it('has a send to course reserves button', () => {
      cy.get('#send-to-course-reserves')
        .contains('Add to Course Reserves (Instructors Only)')
        .should('be.visible')
        .should('have.attr', 'data-href')
        .and('match', /ares\.library\.nyu\.edu/)
    });
  });

  describe('if the user is logged in', () => {
    beforeEach(() => {
      cy.visit('/search?query=any,contains,work&tab=crp&search_scope=cre&vid=NYUSH', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
        }
      })
    });

    it('has a send to course reserves button', () => {
      cy.get('#send-to-course-reserves')
        .contains('Add to Course Reserves (Instructors Only)')
        .should('be.visible')
        .should('have.attr', 'data-href')
        .and('match', /ares\.library\.nyu\.edu/)
    });
  });
});
