describe('about basic', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')
    cy.get('[class="v-card v-sheet theme--light"]').contains("My planner is a beautiful interactive goal calendar that will help you start planning your day with pleasure. The messenger will discreetly remind your friends about upcoming meetings, and the beautiful pastel colors never get boring and wrap your aspirations in a stylish package, which will delight you and your friends.")
    
  })
})


describe('about move to', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:8080')

    cy.get('[class="v-chip__content"]').contains("Log in").click()

    cy.get('[type="text"]').type('test')
    cy.get('[type="password"]').type('1234')
    cy.get('[class="v-btn__content"]').contains("Log In").click()

    cy.wait(2000)

    cy.get('[class="v-btn__content"]').contains('My Planner').should('exist')
    cy.get('[class="v-btn__content"]').contains('My Planner').parent('[class="mx-2 v-btn purple white--text v-btn--active v-btn--has-bg v-btn--rounded theme--light v-size--default"]').should('exist')

    cy.get('[class="v-btn__content"]').contains('About').should('exist')
    cy.get('[class="v-btn__content"]').contains('About').parent('[class="mx-2 v-btn v-btn--has-bg v-btn--rounded theme--light v-size--default"]').should('exist')
    cy.get('[class="v-btn__content"]').contains('About').click()

    cy.get('[class="v-btn__content"]').contains('My Planner').should('exist')
    cy.get('[class="v-btn__content"]').contains('My Planner').parent('[class="mx-2 v-btn v-btn--has-bg v-btn--rounded theme--light v-size--default"]').should('exist')

    cy.get('[class="v-btn__content"]').contains('About').should('exist')
    cy.get('[class="v-btn__content"]').contains('About').parent('[class="mx-2 v-btn purple white--text v-btn--active v-btn--has-bg v-btn--rounded theme--light v-size--default"]').should('exist')

    cy.get('[class="v-card v-sheet theme--light"]').contains("My planner is a beautiful interactive goal calendar that will help you start planning your day with pleasure. The messenger will discreetly remind your friends about upcoming meetings, and the beautiful pastel colors never get boring and wrap your aspirations in a stylish package, which will delight you and your friends.")
    
  })
})