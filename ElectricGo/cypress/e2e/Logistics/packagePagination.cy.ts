describe('List Packages filtered by ID', () => {
    it('Shows the packages ordered by ID ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()
      cy.contains('List packages').click()
      cy.contains('ID').click();
      cy.contains("Return")
    })
  })
  describe('List Packages ordered by ID', () => {
    it('Shows the packages ordered by ID DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('PackageDashboard').click()
        cy.contains('List packages').click()
        cy.contains('ID').click()
        cy.contains('ID').click()
        cy.contains("Return")
        
    })
  })

  describe('List Packages ordered by Y', () => {
    it('Shows the packages ordered by Y ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()
      cy.contains('List packages').click()
      cy.contains('Y').click();
      cy.contains("Return")
    })
  })
  describe('List Packages ordered by Y', () => {
    it('Shows the packages ordered by Y DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('PackageDashboard').click()
        cy.contains('List packages').click()
        cy.contains('Y').click()
        cy.contains('Y').click()
        cy.contains("Return")
        
    })
  })

  describe('List Packages ordered by Z', () => {
    it('Shows the packages ordered by Z ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('PackageDashboard').click()
      cy.contains('List packages').click()
      cy.contains('Z').click();
      cy.contains("Return")
    })
  })
  describe('List Packages ordered by Z', () => {
    it('Shows the packages ordered by Z DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('PackageDashboard').click()
        cy.contains('List packages').click()
        cy.contains('Z').click()
        cy.contains('Z').click()
        cy.contains("Return")
        
    })
  })

  describe('Show package info', () => {
    it('Shows a package details', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('PackageDashboard').click()
        cy.contains('List packages').click()
        cy.contains('Details').click()
        cy.contains("go back")
        
    })
  })