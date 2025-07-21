// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-xpath';
import 'cypress-iframe';
import 'cypress-file-upload';


/// <reference types= 'Cypress'/>
/// <reference types= 'cypress-xpath'/>
/// <reference types= 'cypress-iframe'/>
/// <reference types= 'cypress-file-upload'/>

Cypress.Commands.add('login', (userType) => {
    let email, password;
    
    switch(userType) {
        case 'tenantAdmin':
            email = Cypress.env('TenantAdmin_email');
            password = Cypress.env('TenantAdmin_Password');
            break;
        case 'systemAdmin':
            email = Cypress.env('SystemAdmin_email');
            password = Cypress.env('Password');
            break;
        default:
            throw new Error(`Invalid user type: ${userType}. Use 'tenantAdmin' or 'systemAdmin'`);
    }
    
    if (!email || !password) {
        throw new Error(`Credentials not found for user type: ${userType}`);
    }
    
    cy.visit(Cypress.env('baseURL'));
    cy.get('input[placeholder="Enter Email Address"][type="email"]').type(email);
    cy.get('input[type="password"][placeholder="Enter Password"]').type(password);
    cy.get("button[type='submit']").click();
    cy.wait(6000);
})


// Gmail commands
Cypress.Commands.add('getEmailsViaIMAP', (searchCriteria = ['UNSEEN']) => {
  return cy.task('getEmailsViaIMAP', searchCriteria, { timeout: 120000 });
});

const cheerio = require('cheerio');

Cypress.Commands.add('getVerificationLinkFromLatestEmail', () => {
  return cy.task('getEmailsViaIMAP', ['UNSEEN'], { timeout: 120000 }).then((emails) => {
    if (!emails || emails.length === 0) {
      throw new Error("❌ No unread emails found");
    }

    // Sort newest to oldest
    const sortedEmails = emails.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestEmail = sortedEmails[0];

    if (!latestEmail.html) {
      throw new Error("❌ Latest email has no HTML content");
    }

    const $ = cheerio.load(latestEmail.html);
    let link = null;

    // Case-insensitive search for any <a> tag containing 'verify'
    $('a').each((i, el) => {
      const text = $(el).text().toLowerCase().trim();
      if (text.includes('verify')) {
        link = $(el).attr('href');
        return false; // break loop
      }
    });

    if (!link) {
      throw new Error("❌ 'Verify' button/link not found in latest email");
    }

    return link;
  });
});

// // Function to exchange permission code for access token
// Cypress.Commands.add('getAccessTokenFromCode', (authCode) => {
//   return cy.request({
//     method: 'POST',
//     url: `https://login.microsoftonline.com/${Cypress.env('OUTLOOK_TENANT_ID')}/oauth2/v2.0/token`,
//     form: true,
//     body: {
//       client_id: Cypress.env('OUTLOOK_CLIENT_ID'),
//       client_secret: Cypress.env('OUTLOOK_CLIENT_SECRET'),
//       scope: 'https://graph.microsoft.com/Mail.Read',
//       code: authCode,
//       redirect_uri: 'http://localhost:3000/auth/callback',
//       grant_type: 'authorization_code'
//     }
//   }).then(response => response.body.access_token);
// });

// // Function to read emails from Outlook
// Cypress.Commands.add('getOutlookEmails', (accessToken) => {
//   return cy.request({
//     method: 'GET',
//     url: 'https://graph.microsoft.com/v1.0/me/messages?$filter=isRead eq false&$orderby=receivedDateTime desc',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     }
//   });
// });
