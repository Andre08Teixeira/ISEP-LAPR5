describe('Create Plannings', () => {
    it('Create a planning from 2022-05-12 in the truck ZZ-55-DD', () => {
      cy.visit('/login')
      cy.get('#email').type('carlos@isep.ipp.pt')
      cy.get('#password').type('carlos')
      cy.contains('Login').click()      
      cy.contains('Planning').click()  
      cy.contains('Create planning').click()
      cy.get('input[type="date"]').click()
      cy.get('input[type="date"]').type('2023-01-01')
      cy.get('select.form-control').eq(0).select('Heuristica Massa')
      cy.get('select.form-control').eq(1).select('RA-55-TO')
      cy.contains("Apply filter").click()
      cy.contains("Message")
      cy.contains("PlanningService: getPlanning id=20220512 failed: Http failure response for http://localhost:3002/Planning/Heuristic-mass?data=20220512: 0 Unknown Error")
    })
  })
  
  