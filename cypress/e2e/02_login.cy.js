describe('Login Tests', () => {
  
    // Test Case 1: Login with Tenant Admin Account using custom command and env variables
    it('should login with Tenant Admin', () => {
       cy.login('tenantAdmin');
      // selecting the hamburger menu
      cy.get(".tabler-menu-2.cursor-pointer").should("be.visible").click();
      // Check if 'User Management' is directly visible and click it
      cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
    });
  
    // Test Case 2: Login with System Admin Account using custom command and env variables
    it('should login with System Admin Account', () => {
      cy.login('systemAdmin');
      cy.contains('h4', 'Join Cratus').should('be.visible');
  
    });
  
    // // Test Case 3: Login with NOC Account 
    // it('should login with NOC Account', () => {
    //   cy.login('NOC');
    //   cy.get("button[id=':rk:']").contains('Onboard Cabinet').should('be.visible');
    // });
  
  
  });
