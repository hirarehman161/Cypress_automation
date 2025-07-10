describe('Tenant User Creation', () => {
    it('Create NOC', () => {
      cy.login('T_Admin')
     // selecting the hamburger menu
     cy.get(".tabler-menu-2.cursor-pointer").should("be.visible").click();

      
      // Check if 'User Management' is directly visible and click it
      cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
      // Check if the hamburger menu is visible and click it
      cy.get('.tabler-menu-2').click();
      cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
      cy.contains('+ Add Member').should('be.visible').click();
    });
  });
  