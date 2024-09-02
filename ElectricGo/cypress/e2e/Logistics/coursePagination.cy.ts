describe('List Courses ordered by ID', () => {
    it('Shows the plannnings ordered by ID ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()      
      cy.contains('Logistics').click()  
      cy.contains('CourseDashboard').click()
      cy.contains('List courses').click()
      cy.contains('ID').click();
      cy.contains("Return")
    })
  })
  describe('List Courses ordered by ID', () => {
    it('Shows the courses ordered by ID DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('CourseDashboard').click()
        cy.contains('List courses').click()
        cy.contains('ID').click();
        cy.contains('ID').click();
        cy.contains("Return")
        
    })
  })

  describe('List Courses ordered by Destiny Warehouse', () => {
    it('Shows the courses ordered by Destiny Warehouse DSC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('CourseDashboard').click()
        cy.contains('List courses').click()
        cy.contains('Destiny Warehouse').click();
        cy.contains('Destiny Warehouse').click();
        cy.contains("Return")
        
    })
  })
  describe('List Courses ordered by Destiny Warehouse', () => {
    it('Shows the courses ordered by Destiny Warehouse ASC', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('CourseDashboard').click()
        cy.contains('List courses').click()
        cy.contains('Destiny Warehouse').click();
        cy.contains("Return")
        
    })
  })


  describe('Filter Courses', () => {
    it('Shows the courses filtered by vdvdv', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('CourseDashboard').click()
        cy.contains('List courses').click()
        cy.contains("Filter").type("vdvdv")
        cy.contains("Return")
    })
  })

  describe('Show course info', () => {
    it('Shows a course details', () => {
        cy.visit('/login')
        cy.get('#email').type('martim@isep.ipp.pt')
        cy.get('#password').type('martim')
        cy.contains('Login').click()      
        cy.contains('Logistics').click()  
        cy.contains('CourseDashboard').click()
        cy.contains('List courses').click()
        cy.contains('Details').click()
        cy.contains("go back")
        
    })
  })