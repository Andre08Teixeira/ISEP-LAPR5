describe('Visit Delivery Dashboard', () => {
    it('Visits delivery dashboard page from the initial page', () => {
      cy.visit('/login')
      cy.get('#email').type('micael@isep.ipp.pt')
      cy.get('#password').type('ruben')
      cy.contains('Login').click()      
      cy.contains('Warehouse Management').click()  
      cy.contains('DeliveryDashboard').click()  
      cy.contains('dashboard-delivery')
      cy.contains('List deliveries')
      cy.contains('Create a delivery')
      cy.contains('go back')
  
    })
  })

  describe('Show deliveries', () => {
    it('Lists the deliveries', () => {
      cy.visit('/login')
      cy.get('#email').type('micael@isep.ipp.pt')
      cy.get('#password').type('ruben')
      cy.contains('Login').click()      

      cy.contains('Warehouse Management').click()  
      cy.contains('DeliveryDashboard').click() 
      cy.contains('List deliveries').click()
  
  
      cy.contains("go back")
    })
  })
  
  describe('Add Deliveries', () => {
    it('Shows the add delvieries page', () => {
      cy.visit('/login')
      cy.get('#email').type('micael@isep.ipp.pt')
      cy.get('#password').type('ruben')
      cy.contains('Login').click()      

      cy.contains('Warehouse Management').click()  
      cy.contains('DeliveryDashboard').click()
      cy.contains('Create a delivery').click()
        cy.contains('Create a delivery:')
      cy.contains('Add delivery')
      cy.contains("go back")
    })
  })