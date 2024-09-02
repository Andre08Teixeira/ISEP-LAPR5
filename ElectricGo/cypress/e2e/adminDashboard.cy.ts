describe('Visit AdminDashboard', () => {
    it('Visits the admin page', () => {
      cy.visit('/login')
      cy.get('#email').type('miguelmacedo@isep.ipp.pt')
      cy.get('#password').type('miguel')
      cy.contains('Login').click()      
      cy.contains('Administrator dashboard').click()
    })
  })

  describe('Visit User Cancellation', () => {
    it('Visits the user anonymization page and anonymizates an user', () => {
      cy.visit('/login')
      cy.get('#email').type('miguelmacedo@isep.ipp.pt')
      cy.get('#password').type('miguel')
      cy.contains('Login').click()      
      cy.contains('Administrator dashboard').click()
      cy.contains('Cancel an Account').click()
      cy.contains('Cancel account').click()
    })
  })

  describe('Visit User Create', () => {
    it('Visits the user create page', () => {
      cy.visit('/login')
      cy.get('#email').type('miguelmacedo@isep.ipp.pt')
      cy.get('#password').type('miguel')
      cy.contains('Login').click()      
      cy.contains('Administrator dashboard').click()
      cy.contains('Create an User').click()
      cy.contains('Create an user:')
    })
  })

