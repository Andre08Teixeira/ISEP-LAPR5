describe('Visit Course Dashboard', () => {
    it('Visits course dashboard page from the initial page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      
      cy.contains('Logistics').click()
      cy.contains('CourseDashboard').click()
      cy.contains('List courses')
      cy.contains('Create a course')
      cy.contains('go back')
  
    })
  })

  describe('Show Courses', () => {
    it('Lists the courses', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()
      cy.contains('CourseDashboard').click()
      
      cy.contains('List courses').click()
  
      cy.url().should('include', '/course-pagination')
  
      cy.contains("Return")
    })
  })
  
  describe('Add Courses', () => {
    it('Shows the add courses page', () => {
      cy.visit('/login')
      cy.get('#email').type('martim@isep.ipp.pt')
      cy.get('#password').type('martim')
      cy.contains('Login').click()
      cy.contains('Logistics').click()
      cy.contains('CourseDashboard').click()
      cy.contains('Create a course').click()
      cy.contains('Create a course:')
      cy.contains('Add course')
      cy.contains("go back")
    })
  })
  