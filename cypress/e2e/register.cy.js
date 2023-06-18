describe('register user', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Register").click()

    const uuid = () => Cypress._.random(0, 1e12)
    const id = uuid()
    const username = `testuser_${id}`
    const email = `${username}@test.com`
    const password = `PWD${id}`

    cy.get('label').contains('User name').should('exist')
    cy.get('label').contains('User name').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('User name').parent('div.v-text-field__slot').children('input').type(username)

    cy.get('label').contains('Email').should('exist')
    cy.get('label').contains('Email').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Email').parent('div.v-text-field__slot').children('input').type(email)

    cy.get('label').contains('Password').should('exist')
    cy.get('label').contains('Password').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Password').parent('div.v-text-field__slot').children('input').type(password)

    cy.get('label').contains('Repeat Password').should('exist')
    cy.get('label').contains('Repeat Password').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Repeat Password').parent('div.v-text-field__slot').children('input').type(password)

    cy.get('[class="v-btn__content"]').contains('Register').should('exist')
    cy.get('[class="v-btn__content"]').contains('Register').click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Success').should('exist')
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Success').should('be.visible')

    cy.get('[class="v-card__text"]').contains('Successfully registered').should('exist')
    cy.get('[class="v-card__text"]').contains('Successfully registered').should('be.visible')

    cy.get('[class="v-btn__content"]').contains('Ok').should('exist')
    cy.get('[class="v-btn__content"]').contains('Ok').should('be.visible')

    cy.get('[class="v-btn__content"]').contains('Ok').click()

    cy.get('[class="v-chip__content"]').contains("Log in").click()
    cy.get('[type="text"]').type(username)
    cy.get('[type="password"]').type(password)
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.wait(2000)
    cy.get('[class="v-chip__content"]').contains("Log in").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Register").should('not.exist')
    cy.get('[class="v-chip__content"]').contains("Log out").should('exist')

    cy.get('b').contains(`${username} [You]`).should('exist')
  })
})

describe('register existing', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Register").click()

    cy.get('label').contains('User name').should('exist')
    cy.get('label').contains('User name').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('User name').parent('div.v-text-field__slot').children('input').type('test')

    cy.get('label').contains('Email').should('exist')
    cy.get('label').contains('Email').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Email').parent('div.v-text-field__slot').children('input').type('test@test.com')

    cy.get('label').contains('Password').should('exist')
    cy.get('label').contains('Password').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Password').parent('div.v-text-field__slot').children('input').type('1234')

    cy.get('label').contains('Repeat Password').should('exist')
    cy.get('label').contains('Repeat Password').parent('div.v-text-field__slot').children('input').should('exist')
    cy.get('label').contains('Repeat Password').parent('div.v-text-field__slot').children('input').type('1234')

    cy.get('[class="v-btn__content"]').contains('Register').should('exist')
    cy.get('[class="v-btn__content"]').contains('Register').click()

    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Error').should('exist')
    cy.get('[class="v-card__title text-h5 grey lighten-2"]').contains('Error').should('be.visible')

    cy.get('[class="v-card__text"]').contains('[username] A user with that username already exists').should('exist')
    cy.get('[class="v-card__text"]').contains('[username] A user with that username already exists').should('be.visible')

    cy.get('[class="v-btn__content"]').contains('Ok').should('exist')
    cy.get('[class="v-btn__content"]').contains('Ok').should('be.visible')

    cy.get('[class="v-btn__content"]').contains('Ok').click()
  })
})
