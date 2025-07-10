describe("Automate User Creation and Verification", () => {
    it("Create User and Verify Account for tenant admin", () => {
      // Step 1: Visit Temp-Mail.org to get a temporary email address
      cy.visit("https://temp-mail.org/en", { failOnStatusCode: false });
  
      // Step 2: Extract the temporary email address
      cy.get("#mail", { timeout: 10000 }).then(($email) => {
        const emailAddress = $email.val();
        cy.log(`Test email address: ${emailAddress}`);
  
        // Step 3: Visit the login page of your application
        cy.visit("https://qa.cratus.softoo.co/login");
  
        // Step 4: Fill in login details and submit
        cy.get("input[id=':r0:']").type("mohammadtalha1@gmail.com");
        cy.get("input[id=':r1:']").type("Alpha@1234");
        cy.get("button[type='submit']").click();
  
        // Step 5: Fill in user details
        cy.get("input[id=':r2:']").should("be.visible").type("Test");
        cy.get("input[id=':r3:']").type("User");
        cy.get("input[id=':r4:']").type(emailAddress); // Use the generated email
        cy.get("input[id=':r5:']").type("1234567890");
  
        // Step 6: Select Tenant or System Admin
        cy.get("#demo-basic-select-outlined")
          .click()
          .get('[role="listbox"]')
          .find("li")
          .contains("Jazz")
          .click()
          .get("#demo-basic-select-outlined")
          .should("contain", "Jazz");
  
        // Step 7: Uncheck the "User is System Admin" checkbox
        cy.get('input[type="checkbox"]').uncheck();
  
        // Step 8: Click to send invite
        cy.get("button[type='button']").contains("Send Invite To User").click();
  
        // Step 9: Wait for the verification email in Temp-Mail.org
        cy.wait(10000); // Wait for 10 seconds to allow the email to be sent
        cy.visit("https://temp-mail.org/en", { failOnStatusCode: false });
  
        // Step 10: Refresh the inbox and open the verification email
        cy.get("#click-to-refresh", { timeout: 10000 }).click();
        cy.get(".inbox-dataList li", { timeout: 30000 })
          .first()
          .click();
  
        // Step 11: Extract the verification link from the email body
        cy.get("#iframeMail", { timeout: 10000 }).then(($iframe) => {
          const $body = $iframe.contents().find("body");
          const emailBody = $body.text();
          const verificationLink = emailBody.match(/https?:\/\/[^\s]+/)[0];
          cy.log(`Verification link: ${verificationLink}`);
  
          // Step 12: Visit the verification link
          cy.visit(verificationLink);
  
          // Step 13: Set the password
          cy.get("input[id=':R15l7rrqkq:']").type("Alpha@1234");
          cy.get("input[id=':R19l7rrqkq:']").type("Alpha@1234");
  
          // Step 14: Submit the password form
          cy.get("button[type='submit']").contains("Set Password").click();
  
          // Step 15: Verify successful navigation to dashboard
          cy.url().should("include", "/dashboard");
        });
      });
    });
  });