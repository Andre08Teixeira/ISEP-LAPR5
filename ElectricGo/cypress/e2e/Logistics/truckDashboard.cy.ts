describe('Visit Truck Dashboard', () => {
    it('Visits truck dashboard page from the initial page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()

      cy.contains('TruckDashboard').click()
      cy.contains('dashboard-truck')
      cy.contains('List trucks')
      cy.contains('Add a truck')
      cy.contains('go back')
  
    })
  })

  describe('Show Trucks', () => {
    it('Lists the trucks', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()

      cy.contains('TruckDashboard').click()
      cy.contains('List trucks').click()
      cy.url().should('include', '/trucks')
      cy.contains("go back")
    })
  })
  
  describe('Add Trucks', () => {
    it('Shows the add trucks page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()

      cy.contains('TruckDashboard').click()
      
      cy.contains('Add a truck').click()
      cy.contains('Add truck')

      cy.contains("Return")
    })
  })

  describe('Inhibit Trucks', () => {
    it('Shows the inhibit trucks page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()

      cy.contains('TruckDashboard').click()
      cy.contains('Inhibit a truck').click()
      cy.url().should('include', '/truck-inhibit')
      cy.get('select.form-control').select(0)
      cy.contains('Inhibit').click()
      cy.contains("Return")
    })
  })
  
  