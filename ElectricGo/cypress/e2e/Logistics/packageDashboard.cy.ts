describe('Visit Package Dashboard', () => {
    it('Visits package dashboard page from the initial page', () => {

      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()
    
      cy.contains('List packages')
      cy.contains('Add a package')
      cy.contains('go back')
  
    })
  })
  describe('Show packages', () => {
    it('Lists the packages', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()      
      cy.contains('List packages').click()
  
      cy.url().should('include', '/package-pagination')
  
      cy.contains("Return")
    })
  })
  
  describe('Add Packages', () => {
    it('Shows the add packages page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()
      cy.contains('Add a package').click()
  
      cy.url().should('include', '/package-create')
      cy.contains('Package X:')
      cy.contains('Package Y:')
      cy.contains('Package Z:')
      cy.contains('Package TCarga:')
      cy.contains('Package TDescarga:')
      cy.contains('Add package')
      cy.contains("Return")
    })
  })