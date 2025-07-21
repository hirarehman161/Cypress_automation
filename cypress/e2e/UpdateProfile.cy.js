describe('Update User Profile', () => {
    beforeEach(() => {

      cy.login("T_Admin");
      cy.wait(10000);
      cy.get('svg[data-testid="PersonIcon"]').click()
      cy.contains('My Profile').click(); // Adjust the button text or selector if needed
    });
  
    it('Updates the user profile information', () => {
      // Edit profile button
      
      // //cy.contains("Edit Profile")
      cy.wait(10000)
      

      cy.xpath("(//button[@type='button'])[2]").should('exist').should('be.enabled').click()
       
      cy.get('button').contains('Upload').then(() => { cy.get('input[type="file"]').attachFile('barcode.png'); });

      // Update the First Name
      cy.get('input[name="first_name"]').clear().type('Emily');
      
      // Update the Last Name
      cy.get('input[name="last_name"]').clear().type('Anderson');
  
      // Update the Mobile Number
      cy.get('input[type="number"]').clear().type('1234567890');
  
      cy.get('input[name="designation"]').should("be.disabled");
      cy.get('input[name="department"][disabled]').should("be.disabled")

  
      // Click the Update button
      cy.contains('Update').click();
      cy.get('input[type="password"]').type("Alpha@1234")
      cy.xpath('//button[contains(text(), "Confirm")]').click()
      
     //Assertions
     cy.get("p.userNameText").should("be.text",'Emily Anderson')
     cy.get("p.userInfoText").should("be.contain",'1234567890')


      
    });
  });
  