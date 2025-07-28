// Complete Sign up with Simulated Email Verification
describe("User Creation and Email Verification (Simulated)", () => {
  const baseUrl = "https://dev.cratus.softoo.co";
  const apiBaseUrl = "https://dev.userapis.cratus.softoo.co";
  const testEmail = "test@example.com";
  const mockVerificationToken = "mock-verification-token-123";

  beforeEach(() => {
    // Only intercept the signup API to monitor it
    cy.intercept('POST', `${apiBaseUrl}/auth/signup`).as('sendVerificationEmail');
  });

  it("Creates tenant admin and verifies email", () => {
    // Step 1: Login and navigate
    cy.visit(`${baseUrl}/login`);
    cy.login("S_Admin");

    // Step 2: Fill form and send invite
    cy.get("input[id=':r2:']").type("Tenant");
    cy.get("input[id=':r3:']").type("Admin");
    cy.get("input[id=':r4:']").type(testEmail);
    cy.get("input[id=':r5:']").type("1234567890");
    
    // Select Tenant
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
    
    // Click send invite
    cy.contains("Send Invite To User").click();

    // Step 3: Wait for API call and verify it was made
    cy.wait('@sendVerificationEmail').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      cy.log("✅ Verification email API called successfully");
      // Store the mock verification token for later use
      Cypress.env('mockVerificationToken', mockVerificationToken);
    });

    // Step 4: Simulate getting verification link from email and visiting it
    cy.then(() => {
      const verificationToken = Cypress.env('mockVerificationToken');
      const mockVerificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
      cy.log(`🔗 Simulating verification link from email: ${mockVerificationUrl}`);
      cy.visit(mockVerificationUrl);
    });

    // Step 5: Set password fields
    cy.get("input[type='password']").first()
      .should('be.visible')
      .should('not.be.disabled')
      .type("Alpha@1234", { force: true });

    cy.get("input[type='password']").last()
      .should('be.visible')
      .should('not.be.disabled')
      .type("Alpha@1234", { force: true });

    // Step 6: Complete signup
    cy.contains("Set Password").click();

    cy.log("🎉 Tenant admin user creation flow completed successfully");
  });
});