describe('Show delivery info', () => {
    it('Shows a delivery details', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains('Edit details').click()
        cy.contains("go back")
    })
  })
  describe('Order deliveries', () => {
    it('Order deliveries by date ASC', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains("go back")
        cy.get('select').eq(0).select('Date asc')
    })
  })

  describe('Order deliveries', () => {
    it('Order deliveries by date DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains("go back")
        cy.get('select').eq(0).select('Date dsc')
    })
  })

  describe('Order deliveries', () => {
    it('Order deliveries by warehouse ASC', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains("go back")
        cy.get('select').eq(0).select('By Warehouse asc')
    })
  })

  describe('Order deliveries', () => {
    it('Order deliveries by warehouse DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains("go back")
        cy.get('select').eq(0).select('By Warehouse dsc')
    })
  })

  describe('Filter deliveries', () => {
    it('Filter deliveries beetween 2022-12-31 and 2023-01-02', () => {
        cy.visit('/login')
        cy.get('#email').type('micael@isep.ipp.pt')
        cy.get('#password').type('ruben')
        cy.contains('Login').click()      
        cy.contains('Warehouse Management').click()  
        cy.contains('DeliveryDashboard').click()
        cy.contains('List deliveries').click()
        cy.contains("go back")
        cy.get('select').eq(1).select('Date')
        cy.get('input[type="date"]').eq(0).click()
        cy.get('input[type="date"]').eq(0).type('2022-12-31')
        cy.get('input[type="date"]').eq(1).click()
        cy.get('input[type="date"]').eq(1).type('2023-01-02')
        cy.contains('Apply filter').click()
    })
  })