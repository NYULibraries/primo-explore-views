describe('My Account', function () {
    // we can use these values to log in
    const username = 'PS50TS03'
    const password = 'TEST'

    // NOTE: These functions were originally inlined in the individual tests, just
    // in case Cypress required that.  Later the code was extracted into these functions.
    // The results are the same either way.
    function devLogin() {
        cy.visit('https://dev.login.library.nyu.edu')
        cy.get('a').contains('Other Borrowers').click()
        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('input[type=submit]').click()
    }

    function primoLogin() {
        cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        cy.get('button').contains('Login').click()
        cy.get('a').contains('Other Borrowers').click()
        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('input[type=submit]').click()
    }

    // Helper function for debugging
    function printSessionStorageData() {
        cy.window().then(win => {
            cy.log(JSON.stringify(win.sessionStorage, null, '   '))
        })
    }

    // Minimum reproducible example demonstrating that the workaround documented here:
    // https://docs.cypress.io/guides/guides/web-security#Set-chromeWebSecurity-to-false
    // ...does not work.  Fails with error:
    //
    // CypressError: cy.visit() failed because you are attempting to visit a second unique domain.
    //
    //     You may only visit a single unique domain per test.
    //
    //     Different subdomains are okay, but unique domains are not.
    //
    //     The previous domain you visited was: 'https://www.google.com'
    //
    // You're attempting to visit this new domain: 'https://nyu.edu'
    //
    //     You may need to restructure some of your code to prevent this from happening.
    //
    //     https://on.cypress.io/cannot-visit-second-unique-domain
    //
    describe.only('Barebones test of `chromeWebSecurity:false` workaround', function () {
        it('Visit two different domains in succession', function () {
            cy.log(`chromeWebSecurity = ${ JSON.stringify(Cypress.config('chromeWebSecurity') , null, '    ')}`)

            cy.visit('https://www.google.com')
            cy.visit('https://nyu.edu')
        })
    })

    // This fails because the "chromeWebSecurity":false workaround does not actually
    // work.  The single-origin per test limitation appears to be keeping the login from happening.
    describe('Do normal login relying solely on the "chromeWebSecurity":false workaround', function () {
        it('Login using Login button', function () {
            primoLogin()

            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        })
    })

    // Here we see that we can successfully login in a separate initial test where
    // we visit dev.login.library.nyu.edu directly instead of clicking on Login in
    // Primo.  Unfortunately the second test appears to not benefit from the first test's
    // successful login, because it apparently (and unsurprisingly) happens in a separate session.
    describe.only('Do login in initial test by visiting dev.login.library.nyu.edu directly', function () {
        it('Login as Aleph test user', function () {
            devLogin()
        })

        it('Load local Primo after the first test has performed the login', function () {
            printSessionStorageData()

            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')

            // If the user is still not logged in, click Login again, which often
            // causes login to magically happen without having to go through the
            // login process again.
            cy.get('button').contains('Login')
                .then(($loginButton) => {
                    cy.wrap($loginButton).click()
                })

            cy.get('span[class=user-name]').should('contain', 'TEST-RECORD')
        })
    })

    // This fails with error:
    //
    //     CypressError: cy.visit() failed because you are attempting to visit a second unique domain.
    //
    //     You may only visit a single unique domain per test.
    //
    //     Different subdomains are okay, but unique domains are not.
    //
    //     The previous domain you visited was: 'https://dev.login.library.nyu.edu'
    //
    //     You're attempting to visit this new domain: 'http://localhost:8004'
    //
    //     You may need to restructure some of your code to prevent this from happening.
    //
    //     https://on.cypress.io/cannot-visit-second-unique-domain
    //
    // ...perhaps because the before() and it() are both in scope of the single-origin rule,
    // which in the Cypress documentation is said to apply to a single test.
    describe('Login using before() hook', function () {
        before('Do login in before() hook test by visiting dev.login.library.nyu.edu directly', function () {
            devLogin()
        })

        it('Load local Primo after the before() hook has performed the login', function () {
            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        })
    })

    // This fails with error:
    //
    //     CypressError: cy.visit() failed because you are attempting to visit a second unique domain.
    //
    //     You may only visit a single unique domain per test.
    //
    //     Different subdomains are okay, but unique domains are not.
    //
    //     The previous domain you visited was: 'https://dev.login.library.nyu.edu'
    //
    //     You're attempting to visit this new domain: 'http://localhost:8004'
    //
    //     You may need to restructure some of your code to prevent this from happening.
    //
    //     https://on.cypress.io/cannot-visit-second-unique-domain
    //
    // ...perhaps because the beforeEach() and it() are both in scope of the single-origin rule,
    // which in the Cypress documentation is said to apply to a single test.
    describe('Login using beforeEach() hook', function () {
        beforeEach('Do login in beforeEach() hook test by visiting dev.login.library.nyu.edu directly', function () {
            devLogin()
        })

        it('Load local Primo after the beforeEach() hook has performed the login', function () {
            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        })
    })

    describe('Login using custom Cypress command', function () {
        Cypress.Commands.add('devLoginCypressCommand', (overrides = {}) => {
            Cypress.log( { name : 'devLoginCypressCommand' } )

            devLogin()
        })

        Cypress.Commands.add('primoLoginCypressCommand', (overrides = {}) => {
            Cypress.log( { name : 'primoLoginCypressCommand' } )

            primoLogin()
        })

        it('Run cy.devLoginCypressCommand then load local Primo', function () {
            cy.devLoginCypressCommand()
            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        })

        it('Run cy.primoLoginCypressCommand then load local Primo', function () {
            cy.primoLoginCypressCommand()
            cy.visit('http://localhost:8004/primo-explore/search?vid=NYU')
        })
    })
})
