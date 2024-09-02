describe('Visit Planning Dashboard', () => {
    it('Visits planning dashboard page from the initial page', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
    
      cy.contains('List Plannings')
      cy.contains('go back')
    })
  })

  describe('Add Plannings', () => {
    it('Shows the add plannings page', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
      cy.contains('Create planning').click()
  
      cy.contains('Create a planning for a day')
      cy.contains('Apply filter')
    
      cy.contains("Return")
    })
  })