describe('login/logout', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Register").should('exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('exist')
    cy.get('[type="text"]').should('exist')
    cy.get('[type="password"]').should('exist')
    cy.get('[class="v-btn__content"]').contains("Log In").should('exist')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('exist')

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('be.visible')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Log In").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('be.visible')

    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('1234')
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.wait(2000)
    cy.get('[class="v-chip__content"]').contains("Log in").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Register").should('not.exist')
  
    cy.get('[class="v-chip__content"]').contains("Log out").click()
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Are you sure to Log Out?").should('exist')
    cy.get('[class="v-btn__content"]').contains("Yes").should('exist')
    cy.get('[class="v-btn__content"]').contains("No").should('exist')
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Are you sure to Log Out?").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Yes").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("No").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("No").click()

    cy.get('[class="v-chip__content"]').contains("Log in").should('not.exist');
    cy.get('[class="v-chip__content"]').contains("Register").should('not.exist');
    
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Are you sure to Log Out?").should('not.be.visible')
    cy.get('[class="v-btn__content"]').contains("Yes").should('not.be.visible')
    cy.get('[class="v-btn__content"]').contains("No").should('not.be.visible')
  
    cy.get('[class="v-chip__content"]').contains("Log out").click()
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Are you sure to Log Out?").should('exist')
    cy.get('[class="v-btn__content"]').contains("Yes").should('exist')
    cy.get('[class="v-btn__content"]').contains("No").should('exist')    
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Are you sure to Log Out?").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Yes").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("No").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Yes").click()

    cy.get('[class="v-chip__content"]').contains("Register").should('exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log in").should('exist')
  })
})

describe('login cancel', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Register").should('exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('exist')
    cy.get('[type="text"]').should('exist')
    cy.get('[type="password"]').should('exist')
    cy.get('[class="v-btn__content"]').contains("Log In").should('exist')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('exist')

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('be.visible')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Log In").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('be.visible')

    cy.get('[class="v-btn__content"]').contains("Cancel").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('not.be.visible')
    cy.get('[type="text"]').should('not.be.visible')
    cy.get('[type="password"]').should('not.be.visible')
    cy.get('[class="v-btn__content"]').contains("Log In").should('not.be.visible')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('not.be.visible')

    cy.get('[class="v-chip__content"]').contains("Register").should('exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log in").should('exist')
  })
})

describe('login incorrect', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Register").should('exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('exist')
    cy.get('[type="text"]').should('exist')
    cy.get('[type="password"]').should('exist')
    cy.get('[class="v-btn__content"]').contains("Log In").should('exist')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('exist')

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('be.visible')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Log In").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('be.visible')

    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('4321')
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Error").should('exist')
    cy.get('[class="v-card__text"]').contains("[401]: [detail] No active account found with the given credentials").should('exist')
    cy.get('[class="v-btn__content"]').contains("Ok").should('exist')

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains("Error").should('be.visible')
    cy.get('[class="v-card__text"]').contains("[401]: [detail] No active account found with the given credentials").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Ok").should('be.visible')

    cy.get('[class="v-btn__content"]').contains("Ok").click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Login').should('be.visible')
    cy.get('[type="text"]').should('be.visible')
    cy.get('[type="password"]').should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Log In").should('be.visible')
    cy.get('[class="v-btn__content"]').contains("Cancel").should('be.visible')
  })
})