describe('My Account', () => {

    Cypress.Commands.add('login', ({username, password}) => {
        cy.session(
            [username, password],
            () => {
            cy.origin('https://bobcatdev.library.nyu.edu', { args: { username, password } }, ({ username, password }) => { 
                cy.visit('https://bobcatdev.library.nyu.edu/primo-explore/search?vid=NYU')
                // cy.wait(3000)
                cy.contains('Login').should('be.visible').click()
                cy.get('a').contains('Other Borrowers').should('be.visible').click()
                cy.url().should('contain', '/auth/bobst/nyu')
                cy.contains('Enter your library card number').should('be.visible')
                cy.get('input[name=username]').type(username)
                cy.contains('First four letters of your last name').should('be.visible')
                cy.get('input[name=password]').type(password)
                cy.get('input[type=submit]').click()
                cy.contains('TEST-RECORD').should('be.visible')
            })  
            },
            {
                validate: () => {
                    cy.visit('https://bobcatdev.library.nyu.edu/primo-explore/search?vid=NYU')
                    cy.contains('TEST-RECORD').should('be.visible')
            },
            })
    })

          it('login', () => {
            cy.login({
              username: Cypress.env('ALEPH_USERNAME'),
              password: Cypress.env('ALEPH_PASSWORD'),
            }) // This is the login command.
            
            cy.visit('https://bobcatdev.library.nyu.edu/primo-explore/search?vid=NYU')
            cy.contains('TEST-RECORD').should('be.visible')
          })
    }
)




