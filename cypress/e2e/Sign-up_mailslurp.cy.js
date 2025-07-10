import MailSlurp from "mailslurp-client";
const mailslurp = new MailSlurp({ apiKey: Cypress.env("MAILSLURP_API_KEY") });

describe("Automate User Creation and Verification", () => {


  it("Create User and Verify Account for tenant admin", () => {
            // Now that the test is done, delete the inbox
            mailslurp.deleteInbox(inboxId).then(() => {
              cy.log('Inbox deleted successfully');
            });
    // Create a temporary inbox first
    mailslurp.createInbox().then((inbox) => {
      const inboxId = inbox.id;
      const emailAddress = inbox.emailAddress;
      cy.log(`Test email address: ${emailAddress}`);

      // Visit the login page after creating the inbox
      cy.visit("https://qa.cratus.softoo.co/login");

      // Fill in login details and submit
      cy.get("input[id=':r0:']").type("mohammadtalha1@gmail.com");
      cy.get("input[id=':r1:']").type("Alpha@1234");
      cy.get("button[type='submit']").click();

    //   // Visit the form and fill in user details;
       cy.get("input[id=':r2:']").should('be.visible').type("Test");
       cy.get("input[id=':r3:']").type("User");
       cy.get("input[id=':r4:']").type(emailAddress); // Use the generated temp email
       cy.get("input[id=':r5:']").type("1234567890");

      // Select Tenant or System Admin
      cy.get('#demo-basic-select-outlined')
        .click()
        .get('[role="listbox"]')
        .find('li')
        .contains('Jazz')
        .click()
        .get('#demo-basic-select-outlined')
        .should('contain', 'Jazz');

      // Uncheck the "User is System Admin" checkbox
      cy.get('input[type="checkbox"]').uncheck();

      // Click to send invite
      cy.get("button[type='button']").contains("Send Invite To User").click();

      // Wait for the email and extract the verification link
      mailslurp.waitForLatestEmail(inboxId, 60000).then((email) => {
        const verificationLink = email.body.match(/https?:\/\/[^\s]+/)[0];
        cy.log(`Verification link: ${verificationLink}`);

        // Visit the verification link
        cy.visit(verificationLink);

        // Set the password
        cy.get("input[id=':R15l7rrqkq:']").type("Alpha@1234");
        cy.get("input[id=':R19l7rrqkq:']").type("Alpha@1234");

        cy.get("button[type='submit']").contains("Set Password").click();
        // Wait for 1 second (1000 ms)

        // Verify successful navigation to dashboard
        cy.url().should("include", "/dashboard");
      });
    });
  });
  it.only("Create User and Verify Account for System admin", () => {
    // Create a temporary inbox first
    mailslurp.createInbox().then((inbox) => {
      const inboxId = inbox.id;
      const emailAddress = inbox.emailAddress;
      cy.log(`Test email address: ${emailAddress}`);

      // Visit the login page after creating the inbox
      cy.visit("https://qa.cratus.softoo.co/login");

      // Fill in login details and submit
      cy.get("input[id=':r0:']").should("be.visible").type("mohammadtalha1@gmail.com");
      cy.get("input[id=':r1:']").type("Alpha@1234");
      cy.get("button[type='submit']").click();

    //   // Visit the form and fill in user details;
       cy.get("input[id=':r2:']").should('be.visible').type("Test");
       cy.get("input[id=':r3:']").type("User");
       cy.get("input[id=':r4:']").type(emailAddress); // Use the generated temp email
       cy.get("input[id=':r5:']").type("1234567890");

      // Uncheck the "User is System Admin" checkbox
      cy.get('input[type="checkbox"]').check();
      // Check the drop-down is disabled
      // Assert that the dropdown is disabled by checking for the `aria-disabled` attribute
      cy.get('#demo-basic-select-outlined')
        .should('have.attr', 'aria-disabled', 'true');  // Check if the aria-disabled attribute is set to true

      // Or, alternatively, check if the dropdown has the 'Mui-disabled' class
        // cy.get('#demo-basic-select-outlined')
        // .should('have.class', 'Mui-disabled');  // Check if the dropdown has the Mui-disabled class

      // Click to send invite
      cy.get("button[type='button']").contains("Send Invite To User").click();

      // Wait for the email and extract the verification link
      mailslurp.waitForLatestEmail(inboxId, 60000).then((email) => {
        const verificationLink = email.body.match(/https?:\/\/[^\s]+/)[0];
        cy.log(`Verification link: ${verificationLink}`);

        // Visit the verification link
        cy.visit(verificationLink);

        // Set the password
        cy.get("input[id=':R15l7rrqkq:']").type("Alpha@1234");
        cy.get("input[id=':R19l7rrqkq:']").type("Alpha@1234");

        cy.get("button[type='submit']").contains("Set Password").click();
        // Wait for 1 second (1000 ms)

        // Verify successful navigation to dashboard
        cy.url().should("include", "/dashboard");
      });
    });
  });

});
