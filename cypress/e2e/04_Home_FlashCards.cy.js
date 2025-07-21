  //  describe('Database Connection Test', () => {
  //   it('Verifies DB connection and prints query result', () => {
  
  //     cy.task('READFROMDB', 
  //       {
  //           // get config from cypress.config.js
  //           dbConfig : Cypress.config('DB'),
  //           //SQL To Get the total cabinets
  //           sql : 'SELECT COUNT(DISTINCT cabinet_serial) AS Total_Cabinets FROM tenantjazz.tenant_inventory;'
  //       }).then((result) =>
            
  //   {
  //       console.log(result);
  //       // Access the first element of the result array and get the total_cabinets value
  //       const totalCabinets = result[0].total_cabinets;
  //       console.log("Total Cabinets:", totalCabinets); // This will print total cabinets

        
  //   })
  //     cy.task('READFROMDB', 
  //       {
  //           // get config from cypress.config.js
  //           dbConfig : Cypress.config('DB'),
  //           //SQL to Get total number of sites
  //           sql : 'SELECT COUNT(DISTINCT siteid) AS total_sites FROM tenantjazz.tenant_inventory;'
  //       }).then((result) =>
            
  //   {
  //       console.log(result);
  //       // Access the first element of the result array and get the total_cabinets value
  //       const totalSites = result[0].total_sites;
  //       console.log("Total Cabinets:", totalSites); // This will print total cabinets

        
  //   })
      
  //     });
  //   });

  
  describe('Database Connection Test', () => {
    let totalCabinets;
    let totalSites;
    let LiveAlerts;
    let SecurityAlerts;
    let env_livealert;
  
    it('Verifies DB connection and prints query result', () => {
  
    cy.login('tenantAdmin');
      cy.wait(3000)
     // Getting the total cabinets from the DB
      cy.task( 'READFROMDB', {
        dbConfig: Cypress.config('DB'),
        sql: 'SELECT COUNT(DISTINCT cabinet_serial) AS Total_Cabinets FROM tenantjazz.tenant_inventory;'
      }).then((result) => {
        totalCabinets = result[0].total_cabinets;
        console.log("Total Cabinets:", totalCabinets);
      });
      //Getting the total site from the DB
      cy.task('READFROMDB', {
        dbConfig: Cypress.config('DB'),
        sql: 'SELECT COUNT(DISTINCT siteid) AS total_sites FROM tenantjazz.tenant_inventory;'
      }).then((result) => {
        totalSites = result[0].total_sites;
        console.log("Total Sites:", totalSites);
      });
     // Getting the live alert count from the DB
      cy.task( 'READFROMDB',
        {
          dbConfig : Cypress.config('DB'),
          sql : "SELECT COUNT(*) AS LiveAlertCount FROM tenantjazz.box_alert WHERE active = true;"
        }).then( (result) =>
        {
          LiveAlerts = result[0].livealertcount
          console.log("Live Alert" , LiveAlerts)
        })
     //  Getting the live security alert count
      cy.task( "READFROMDB",
        {
          dbConfig : Cypress.config('DB'),
          sql : "SELECT COUNT(*) AS securityalertcount FROM tenantjazz.box_alert WHERE active = true AND alert_category = 'SA';"
        }).then( (result) =>
        {
          SecurityAlerts = result[0].securityalertcount
          console.log('Security Alert' , SecurityAlerts)
        })
     // Getting the live environment alert count
      cy.task( "READFROMDB",
      {
        dbConfig : Cypress.config('DB'),
        sql : "SELECT COUNT(*) AS environment_alertcount FROM tenantjazz.box_alert WHERE active = true AND alert_category = 'EA';"
      }
      ).then ( (result) =>
      {
        env_livealert = result[0].environment_alertcount
        console.log("Environment Alert" , env_livealert);
      })
  
      // Use cy.wrap() to ensure Cypress waits for the variables to be assigned
      cy.then(() => {
        //cy.get("div.flex-col.flex > span:nth-of-type(2)").should("have.text", totalSites.toString())
       // First card
       cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(0).should("have.text", totalSites);
      //  Total cabinets
      // cy.get('.cardHomeSubText').eq(0).should("have.text",totalCabinets) ;
      // cy.get('.cardHomeSubText').eq(0).invoke('text') // Get the text content
      //   .then(text => {
      //           const cleanedText = text.trim(); // Remove leading/trailing whitespace
      //           expect(cleanedText).to.equal(totalCabinets); // Compare it with the expected value
      //           });


// // Second card
    // cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(1).should("have.text", LiveAlerts);
     cy.get(".cardHomeSubText").eq(3).invoke('text')
     .then( (text) =>
     {
         let CleanedAlertCount = text.trim();
         expect(CleanedAlertCount).to.equal(SecurityAlerts);


     })
     cy.get(".cardHomeSubText").eq(4).invoke('text')
     .then ( (text) =>
     {
       let CleanedEnv_Count = text.trim();
       expect(CleanedEnv_Count).to.equal(env_livealert)
     })


// // Third card
// cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(2).should("have.text", "0");
      

      

      
        // console.log("Total Cabinets (outside task):", totalCabinets);
        // console.log("Total Sites (outside task):", totalSites);
        

      });
    });
  });
  