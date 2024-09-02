describe('List Plannings', () => {
    it('Shows the plannnings ordered by date ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
      cy.contains('List Plannings').click()
      cy.contains('Date').click();
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings ordered by date DSC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
      cy.contains('List Plannings').click()
      cy.contains('Date').click();
      cy.contains('Date').click();
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings filtered by registration BO-58-BO', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains("Filter").type("BO-58-BO")
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings filtered by date 2022-12-05', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains("Filter").type("2022-12-05")
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings ordered by Truck Registration ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains('Truck Registration').click();
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings ordered by Truck Registration DSC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains('Truck Registration').click();
      cy.contains('Truck Registration').click();
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings ordered by Heuristic ASC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
      cy.contains('List Plannings').click()
      cy.contains('Heuristic').click();
      cy.contains("Return")
    })
  })
  describe('List Plannings', () => {
    it('Shows the plannnings ordered by Heuristic DSC', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard')
      cy.contains('List Plannings').click()
      cy.contains('Heuristic').click();
      cy.contains('Heuristic').click();
      cy.contains("Return")
    })
  })

  describe('List Plannings', () => {
    it('Shows the plannnings filtered by Heuristica Tempo', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains("Filter").type("Heuristica Tempo")
      cy.contains("Return")
    })
  })

  describe('List Plannings', () => {
    it('Shows the plannnings filtered by Algoritmo Genetico', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains("Filter").type("Algoritmo Genetico")
      cy.contains("Return")
    })
  })

  describe('List Plannings', () => {
    it('Shows the plannnings filtered by Heuristica Massa', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Planning Dashboard').click()
      cy.contains('List Plannings').click()
      cy.contains("Filter").type("Heuristica Massa")
      cy.contains("Return")
    })
  })