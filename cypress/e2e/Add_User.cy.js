

describe("Add Member", () => {
    it("Tenant NOC", () => {
      //const emailAddress = Cypress.env('GMAIL_USER');
      const emailAddress = 'hrie@gmail.com'
      cy.login('T_Admin')
      
      // selecting the hamburger menu
      cy.get(".tabler-menu-2.cursor-pointer").should("be.visible").click();
      
      // Check if 'User Management' is directly visible and click it
      cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
      
      // REMOVED: Duplicate hamburger menu clicks
      cy.wait(5000)
      cy.contains('+ Add Member').should('be.visible').click();
      
      
      // Find by label text and click dropdown
      cy.contains('label', 'Tenant Type').siblings().find('.MuiAutocomplete-popupIndicator').click();
      
      // Select option
      cy.get('[role="option"]').contains('Tenant Noc').click();
      
      cy.get('input[placeholder="Enter First Name"][type="text"]').should("be.visible").type("Emily")
      cy.get('input[placeholder="Enter Last Name"][type="text"]').should("be.visible").type("Anderson")
      
      // FIXED: Remove duplicate mobile number entry and use proper 10-digit number
      cy.get('input[placeholder="Enter Mobile"][type="number"]').should("be.visible").clear().type("1234567890")
      cy.get('input[placeholder="Enter Email"][type="text"]').should("be.visible").type(emailAddress)
      cy.get('input[placeholder="Enter Department"][type="text"]').should("be.visible").type("Technology")
      cy.get('input[placeholder="Enter Designation"][type="text"]').should("be.visible").type("Manager")
      
      // Permission section
      // Region Selection
      const Region = ["Central", "North"];
      cy.get('[role="combobox"]').eq(2).click();
      cy.get('[role="listbox"]')
        .find('li')
        .each(($el) => {
           if (Region.includes($el.text().trim())) {
               cy.wrap($el)
                 .find('input[type="checkbox"]')
                 .check({ force: true });
              }
           });
      
      // FIXED: Close dropdown properly
    //  cy.get('body').click(0, 0); // Click outside to close dropdown
      
      // Wait for subregion options to load after region selection
      cy.wait(2000);
      
      // File upload
      // cy.get('.MuiButtonBase-root').contains('Upload').click();
      // cy.get('input[type="file"]').attachFile('barcode.png');
      // cy.wait(5000)

      
      // Create user
      cy.get('button:contains("Create")').click();
      
      // Wait and get verification link
    //   cy.wait(15000);
    //   cy.getVerificationLinkFromLatestEmail().then((verificationLink) => {
    //     cy.log(`🔗 Visiting verification link: ${verificationLink}`);
    //     cy.visit(verificationLink);

    //     // Set password fields
    //     cy.get("input[type='password']").first()
    //       .should('be.visible')
    //       .should('not.be.disabled')
    //       .type("Alpha@1234", { force: true });

    //     cy.get("input[type='password']").last()
    //       .should('be.visible')
    //       .should('not.be.disabled')
    //       .type("Alpha@1234", { force: true });

    //     // Click "Set Password" button
    //     cy.contains("Set Password").click();
        
    //     // ADDED: Verify success
    //     cy.url().should('not.include', 'verification');
    //   });
    //   cy.task('READFROMDB', {
    //   dbConfig: Cypress.config('DB'),
    //   sql: `DELETE FROM public."user" WHERE email = '${emailAddress}';`
    // }).then(() => {
    //   cy.log("🧹 Test user deleted from DB");
    // });
   });
    
});
// describe("Login Tests", () => {
//     it("should login successfully", () => {
//       cy.login('T_Admin')
//       // selecting the hamburger menu
//       cy.get(".tabler-menu-2.cursor-pointer").should("be.visible").click();
//       // Check if 'User Management' is directly visible and click it
//       cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
//       // Check if the hamburger menu is visible and click it
//       cy.get('.tabler-menu-2').click();
//       cy.get('a.ts-menu-button').contains('User Management').should('be.visible').click();
//       cy.contains('+ Add Member').should('be.visible').click();
//       // Find by label text and click dropdown
//       cy.contains('label', 'Tenant Type').siblings().find('.MuiAutocomplete-popupIndicator').click();
//       // Select option
//       cy.get('[role="option"]').contains('Tenant Noc').click();
//       cy.get('input[placeholder="Enter First Name"][type="text"]').should("be.visible").type("Emily")
//       cy.get('input[placeholder="Enter Last Name"][type="text"]').should("be.visible").type("Anderson")
//       cy.get('input[placeholder="Enter Mobile"][type="number"]').should("be.visible").type("1234567")
//       cy.get('input[placeholder="Enter Mobile"][type="number"]').should("be.visible").type("1234567")
//       const emailAddress = Cypress.env('GMAIL_USER');
//       cy.get('input[placeholder="Enter Email"][type="text"]').should("be.visible").type(emailAddress)
//       cy.get('input[placeholder="Enter Department"][type="text"]').should("be.visible").type("Technology")
//       cy.get('input[placeholder="Enter Designation"][type="text"]').should("be.visible").type("Manager")
//       // Permission section
//       // this code is for the single select
//         // cy.get('[role="combobox"]').eq(2).click();
//         // cy.get('[role="listbox"]')
//         //    .find('li')
//         //    .contains(/^Central A\s*$/)  // Handle extra spaces
//         //    .check();  // Click directly

  
//         const Region = ["Central", "North"]; // List of options to select
//         cy.get('[role="combobox"]').eq(2).click();
//         cy.get('[role="listbox"]')
//           .find('li')
//           .each(($el) => {
//              if (Region.includes($el.text().trim())) {
//                  cy.wrap($el)
//                    .find('input[type="checkbox"]')
//                    .check({ force: true }); // Check the checkbox    
//                 }
//              });
//         cy.get('body').click(0, 0); // Click on the top-left corner of the page

//         const subRegion = ['Central-A'];
//         cy.get('[role = "combobox"]').eq(3).click()
//         cy.get('[role="listbox"]')
//           .find('li')
//           .each( ($el) =>
//           {
//             if (subRegion.includes($el.text().trim())){
//                 cy.wrap($el)
//                   .find('input[type ="checkbox"]')
//                   .check({force : true});

//             }

//           })
//           cy.get('body').click(0,0)

//           const cluster = ["Abbottabad"];
//           cy.get('[role = "combobox"]').eq(4).click()
//           cy.get('[role = "listbox"]')
//             .find("li")
//             .each( ($el) =>
//             {
//                 if( cluster.includes(($el.text().trim()))){
//                     cy.wrap($el)
//                       .find("input[type ='checkbox']").check({ force : true })


//                 }
//             }
//             )
//             cy.get('body').click(0,0)

//             const city = [];
//             cy.get('[role = "combobox"]').eq(5).click();
//             cy.get('[role = "listbox"]').find('li')
//               .each( ($el) =>{
//                 if (cluster.includes(($el.text().trim()))){
//                     cy.wrap($el)
//                       .find('input[type = "checkboxx"]').check({force : true})

//                 }
//               }
//             )
//             cy.get('body').click(0,0)
//             cy.get('.MuiButtonBase-root').contains('Upload').click();
//             cy.get('input[type="file"]').attachFile('barcode.png');
            
//             cy.get('button:contains("Create")').click();
//                 // Step 3: Wait and get verification link
//     cy.wait(15000); // Wait for email delivery
//     cy.getVerificationLinkFromLatestEmail().then((verificationLink) => {
//       cy.log(`🔗 Visiting verification link: ${verificationLink}`);
//       cy.visit(verificationLink);

//  // Step 4: Set password fields, wait for visibility and type with force fallback
//       cy.get("input[type='password']").first()
//         .should('be.visible')
//         .should('not.be.disabled')
//         .type("Alpha@1234", { force: true });

//       cy.get("input[type='password']").last()
//         .should('be.visible')
//         .should('not.be.disabled')
//         .type("Alpha@1234", { force: true });

//       // Step 5: Click "Set Password" button and wait for navigation
//       cy.contains("Set Password").click();

//      });
            
            
        







     
//     });
//   });