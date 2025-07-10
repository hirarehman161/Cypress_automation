describe('Login Tests', () => {
  
    // Function to perform login
    function login(username, password) {
      cy.visit("https://qa.cratus.softoo.co/login"); 
      cy.get("input[id=':r0:']").type(username); 
      cy.get("input[id=':r2:']").type(password); 
      cy.get("button[type='submit']").click(); 
    }
  
    // Test Case 1: Login with Tenant Admin Account 
    it('should login with Tenant Admin', () => {
      const username = 'powagej732@cironex.com';
      const password = 'Alpha!1234';
      login(username, password);
      cy.wait(6000)
      cy.viewport(1280, 800);
      cy.get('a.ts-menu-button').contains('User Management').should('be.visible') 
    });
  
    // Test Case 2: Login with System Account
    it('should login with System Admin Account', () => {
      const username = 'mohammadtalha1@gmail.com';
      const password = 'Alpha@1234';
      login(username, password);
      cy.wait(6000)
      cy.get('.MuiTypography-root.MuiTypography-h4.css-158e288').contains('Join Cratus').should('be.visible')
    });
  
    // // Test Case 3: Login with NOC Account 
    // it('should login with NOC Account', () => {
    //   const username = 'disalo4535@bflcafe.com';
    //   const password = 'Alpha@1234';
    //   login(username, password);
    //   cy.wait(6000);
    //   cy.get("button[id=':rk:']").contains('Onboard Cabinet').should('be.visible')
    // });
  
  
  });
  