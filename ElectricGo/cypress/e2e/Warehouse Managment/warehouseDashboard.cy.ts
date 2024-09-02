describe('Visit Warehouse Dashboard', () => {
    it('Visits warehouse dashboard page from the initial page', () => {
      cy.visit('/login')
      cy.get('#email').type('micael@isep.ipp.pt')
      cy.get('#password').type('ruben')
      cy.contains('Login').click()      
      cy.contains('Warehouse Management').click()  
      cy.contains('WarehouseDashboard').click()  
      cy.contains('Disable').click()
    })
  })

  