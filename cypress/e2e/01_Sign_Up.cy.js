// Complete Sign up
describe("User Creation and Email Verification", () => {
  it("Creates system admin and verifies email", () => {
    const emailAddress = Cypress.env('GMAIL_USER');

    // Step 1: Login and navigate
    cy.login("systemAdmin"); // assumes you have a cy.login command

    // Step 2: Fill form and send invite
    cy.get("input[id=':r2:']").type("System");
    cy.get("input[id=':r3:']").type("Admin");
    cy.get("input[id=':r4:']").type(emailAddress);
    cy.get("input[id=':r5:']").type("1234567890");
    cy.get('input[type="checkbox"]').check();
    cy.get('#demo-basic-select-outlined').should('have.attr', 'aria-disabled', 'true');
    cy.contains("Send Invite To User").click();

    // Step 3: Wait and get verification link
    cy.wait(15000); // Wait for email delivery
    cy.getVerificationLinkFromLatestEmail().then((verificationLink) => {
      cy.log(`🔗 Visiting verification link: ${verificationLink}`);
      cy.visit(verificationLink);

 // Step 4: Set password fields, wait for visibility and type with force fallback
      cy.get("input[type='password']").first()
        .should('be.visible')
        .should('not.be.disabled')
        .type("Alpha@1234", { force: true });

      cy.get("input[type='password']").last()
        .should('be.visible')
        .should('not.be.disabled')
        .type("Alpha@1234", { force: true });

      // Step 5: Click "Set Password" button and wait for navigation
      cy.contains("Set Password").click();

     });

    // Step 6: Cleanup the user from DB
    cy.task('READFROMDB', {
      dbConfig: Cypress.config('DB'),
      sql: `DELETE FROM public."user" WHERE email = '${emailAddress}';`
    }).then(() => {
      cy.log("🧹 Test user deleted from DB");
    });
  });


  it.only("Creates tenant admin and verifies email", () => {
    const emailAddress = Cypress.env('GMAIL_USER');

    // Step 1: Login and navigate
    
    cy.login("tenantAdmin"); // assumes you have a cy.login command

    // Step 2: Fill form and send invite
    cy.get("input[id=':r2:']").type("Tenant");
    cy.get("input[id=':r3:']").type("Admin");
    cy.get("input[id=':r4:']").type(emailAddress);
    cy.get("input[id=':r5:']").type("1234567890");
          // Select Tenant or System Admin
      cy.get('#demo-basic-select-outlined')
        .click()
        .get('[role="listbox"]')
        .find('li')
        .contains('enfrashare')
        .click()
        .get('#demo-basic-select-outlined')
        .should('contain', 'enfrashare');

      // Uncheck the "User is System Admin" checkbox
    cy.get('input[type="checkbox"]').uncheck();
    cy.contains("Send Invite To User").click();

    // Step 3: Wait and get verification link
    cy.wait(15000); // Wait for email delivery
    cy.getVerificationLinkFromLatestEmail().then((verificationLink) => {
      cy.log(`🔗 Visiting verification link: ${verificationLink}`);
      cy.visit(verificationLink);

 // Step 4: Set password fields, wait for visibility and type with force fallback
      cy.get("input[type='password']").first()
        .should('be.visible')
        .should('not.be.disabled')
        .type("Alpha@1234", { force: true });

      cy.get("input[type='password']").last()
        .should('be.visible')
        .should('not.be.disabled')
        .type("Alpha@1234", { force: true });

      // Step 5: Click "Set Password" button and wait for navigation
      cy.contains("Set Password").click();

     });

    // Step 6: Cleanup the user from DB
    cy.task('READFROMDB', {
      dbConfig: Cypress.config('DB'),
      sql: `DELETE FROM public."user" WHERE email = '${emailAddress}';`
    }).then(() => {
      cy.log("🧹 Test user deleted from DB");
    });
  });
});
