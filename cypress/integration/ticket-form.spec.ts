import { fillForm } from '../utils/formFiller'

describe('Ticket form submission', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Ticket form is successfully submitted', () => {
        //given
        const form = fillForm()
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 200,
            body: { id: 'ABCD' },
        }).as('SubmissionSuccessful')

        //when
        cy.get('#name').type(form.name)
        cy.get('#email').type(form.email)
        cy.get('#subject').type(form.subject)
        cy.get('#message').type(form.message)
        cy.get('button[type="submit"]').click()
        cy.wait('@SubmissionSuccessful')

        //then
        cy.get('.success').should('be.visible').and('have.text', 'Thank you!')
    })

    it('Ticket form is unsuccessfully submitted', () => {
        //given
        const form = fillForm()
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 500,
            body: { error: 'Internal server error' },
        }).as('SubmissionUnsuccessful')

        //when
        cy.get('#name').type(form.name)
        cy.get('#email').type(form.email)
        cy.get('#subject').type(form.subject)
        cy.get('#message').type(form.message)
        cy.get('button[type="submit"]').click()
        cy.wait('@SubmissionUnsuccessful')

        //then
        cy.get('.fail').should('be.visible').and('have.text', 'Error!')
    })
})
