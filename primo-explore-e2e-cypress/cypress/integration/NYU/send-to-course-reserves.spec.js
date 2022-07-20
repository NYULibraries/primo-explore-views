describe('send-to-course-reserves', () => {
  describe('if the user is not logged in', () => {
    before(() => {
      cy.visit('/search?query=any,contains,work&tab=crp&search_scope=cre&vid=NYU', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = false
        },
        qs: {
          testAngularCompatibility: true,
        },
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
    before(() => {
      cy.visit('/search?query=any,contains,work&tab=crp&search_scope=cre&vid=NYU', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.$$mockUserLoggedIn = true
        },
        qs: {
          testAngularCompatibility : true,
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

  describe('always-available-online', () => {
    before(() => {
      cy.visit('/search?tab=crp&search_scope=cre&vid=NYU', {
        qs: {
          testAngularCompatibility: true,
        }
      })
    });

    it('should have Always Available Online already selected', () => {
      cy.get('span[translate="tabbedmenu.crp.label"]')
        .should('contain.text', 'Always Available Online (Ideal for Course Use)')
    })
  });
});
