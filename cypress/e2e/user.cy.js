describe('user info', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('1234')
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.wait(2000)

    cy.get('b').contains('test [You]').should('exist')
    cy.get('div.v-card__text').contains('Test Test').should('exist')
    cy.get('div.v-card__text').contains('test@test.com').should('exist')
    cy.get('div.v-card__text').contains('Male').should('exist')
    cy.get('div.v-card__text').contains('2000-01-01').should('exist')
  })
})

describe('user info other', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[type="text"]').type('testuser')
    cy.get('[type="password"]').type('qwerty')
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.wait(2000)

    cy.get('b').contains('testuser [You]').should('exist')
    cy.get('div.v-card__text').contains('Test User').should('exist')
    cy.get('div.v-card__text').contains('test.user@te.co').should('exist')
    cy.get('div.v-card__text').contains('Female').should('exist')
    cy.get('div.v-card__text').contains('2001-05-30').should('exist')
  })
})