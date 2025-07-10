describe ( 'Alert Module flash Card', ()=>
{
    let LastHour;
    let LastHour_SA;
    let LastHour_EA;
    let LastDay;
    let LastDay_SA;
    let LastDay_EA;
    let Last7Day;
    let Last7Day_SA;
    let Last7Day_EA;
    
    before(  'Login' , ()=>
    {
        cy.login('T_Admin')

    });
  it('Flash Card', ()=>{
    cy.viewport(1280, 800);
    cy.contains('Alerts').click()
    cy.wait(10000)
    //---------------------------Getting the DB result in the variables----------------------------------------------//
    // Get the last hour total alerts
    cy.task('READFROMDB',
    {
      dbConfig : Cypress.config('DB'),
      sql : "SELECT COUNT(*) AS lasthour FROM tenantjazz.box_alert WHERE alert_ts >= NOW() - INTERVAL '1 hour';"

    }).then( (result) =>
    {
      LastHour = result[0].lasthour
      console.log('Last Hour', LastHour)
    })
    // Log dbconfig to check its contents, especially password.
   //console.log('Database Configuration:', Cypress.config('DB'));
   // Getting the last hour security alerts
    cy.task( 'READFROMDB', 
    { 
      dbConfig : Cypress.config('DB'),
      sql : "SELECT COUNT(*) as LasthourSA FROM tenantjazz.box_alert WHERE alert_ts >= NOW() - INTERVAL '1 hour' AND alert_category = 'SA'; "

    })
    .then ( (result)=>{
      LastHour_SA = result[0].lasthoursa
      console.log('Last Hour SA', LastHour_SA)


    })
    // Getting last hour Envi Alerts
    cy.task( 'READFROMDB', 
    { 
      dbConfig : Cypress.config('DB'),
      sql : "SELECT COUNT(*) as LasthourEA FROM tenantjazz.box_alert WHERE alert_ts >= NOW() - INTERVAL '1 hour' AND alert_category = 'EA'; "
    })
    .then ( (result)=>{
      LastHour_EA = result[0].lasthourea
      console.log('Last Hour SA', LastHour_EA)
    })
    //=======================================End of last hour================================================//
    // Getting the last day alerts
    cy.task ('READFROMDB', {
      dbConfig : Cypress.config('DB'),
      sql : "SELECT COUNT(*) AS lastday  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '1 day';"
      })
      .then ( (result)=>{
      LastDay = result[0].lastday
      console.log('Last Day', LastDay)
      })
      // Last Day Security Alerts
    cy.task ('READFROMDB', {
    dbConfig : Cypress.config('DB'),
    sql : "SELECT COUNT(*) AS lastdaysa  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '1 day'AND alert_category = 'SA';"
    }).then ( (result)=>{
    LastDay_SA = result[0].lastdaysa
    console.log('Last Day SA', LastDay_SA)
    })
    // Last Day Envi Alerts
    cy.task ('READFROMDB', {
    dbConfig : Cypress.config('DB'),
    sql : "SELECT COUNT(*) AS lastdayea  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '1 day' AND alert_category = 'EA';"
    }).then ( (result)=>{
    LastDay_EA = result[0].lastdayea
    console.log('Last Day EA', LastDay_EA)
    })
    //=============================================End of Last Day======================================================//
    // Getting the last 7 day alerts
    cy.task ('READFROMDB', {
      dbConfig : Cypress.config('DB'),
      sql : "SELECT COUNT(*) AS last7day  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '7 day';"
      })
      .then ( (result)=>{
      Last7Day = result[0].last7day
      console.log('Last 7 Day', Last7Day)
      })
      // Last Day Security Alerts
    cy.task ('READFROMDB', {
    dbConfig : Cypress.config('DB'),
    sql : "SELECT COUNT(*) AS last7daysa  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '7 day'AND alert_category = 'SA';"
    }).then ( (result)=>{
    Last7Day_SA = result[0].last7daysa
    console.log('Last 7 Day SA', Last7Day_SA)
    })
    // Last Day Envi Alerts
    cy.task ('READFROMDB', {
    dbConfig : Cypress.config('DB'),
    sql : "SELECT COUNT(*) AS last7dayea  FROM tenantjazz.box_alert WHERE alert_ts >= CURRENT_DATE - INTERVAL '7 day' AND alert_category = 'EA';"
    }).then ( (result)=>{
    Last7Day_EA = result[0].last7dayea
    console.log('Last Day EA', Last7Day_EA)
    })
    
   //------------------------------------------End of Query result---------------------------------------------//

    cy.wait(3000)
     //=====================================Getting the Envi and Security alerts Count===============================================//
    // Fetch Security Alerts
    cy.get('.col-span-11')
    .filter((index, el) => Cypress.$(el).find('p').first().text().trim() === 'Security Alerts')
    .each(($container, index) => {
      cy.wrap($container)
        .find('p')
        .eq(1)
        .invoke('text')
        .then((text) => {
          if (index === 0) expect(text.trim()).to.eq(LastHour_SA.toString());
          if (index === 1) expect(text.trim()).to.eq(LastDay_SA.toString());
          if (index === 2) expect(text.trim()).to.eq(Last7Day_SA.toString());
        });
    });

    // Fetch Envi Alerts
    cy.get('.col-span-11')
    .filter((index, el) => Cypress.$(el).find('p').first().text().trim() === 'Envi Alerts')
    .each(($container, index) => {
      cy.wrap($container)
        .find('p')
        .eq(1)
        .invoke('text')
        .then((text) => {
          if (index === 0) expect(text.trim()).to.eq(LastHour_EA.toString());
          if (index === 1) expect(text.trim()).to.eq(LastDay_EA.toString());
          if (index === 2) expect(text.trim()).to.eq(Last7Day_EA.toString());
        });
    });

    // Wrap the values to ensure Cypress waits for them to be assigned
    cy.wrap(null).then(() => {
    console.log('Final Security Alerts Counts:');
    console.log(`LastHour_SA: ${LastHour_SA}`);
    console.log(`LastDay_SA: ${LastDay_SA}`);
    console.log(`Last7Day_SA: ${Last7Day_SA}`);

    console.log('Final Envi Alerts Counts:');
    console.log(`LastHour_EA: ${LastHour_EA}`);
    console.log(`LastDay_EA: ${LastDay_EA}`);
    console.log(`Last7Day_EA: ${Last7Day_EA}`);
    });
    //====================================First Flash Card=========================================================//
    // First flash card(total Count) variable = Last Hour
    cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(0)
      .invoke('text') // Get the text from the element
      .then((text) => {
          expect(text.trim()).to.eq(LastHour.toString()); // Trim spaces and compare
      });

    // Security alert - Variable LastHour_SA


    
    //=====================================End===================================================//
   
    // Second Flash card
      cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(1)
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim();
        
        // Extract count (before '(')
        const count = trimmedText.split(' ')[0]; 
    
        // Extract percentage (inside brackets)
        const percentageMatch = trimmedText.match(/\(([^)]+)\)/);
        const percentage = percentageMatch ? percentageMatch[1] : null; // Extract the percentage value
    
        console.log("Extracted Count:", count);
        console.log("Extracted Percentage:", percentage);
    
        // Assertions
        expect(count).to.eq(LastDay.toString()); // Validate the count
        // If you have an expected percentage value, you can assert it like this:
        // expect(percentage).to.eq(expectedPercentage);
      });
    /*
  //======================================End ===================================================//  
  // third flash card
  cy.get("div.flex-col.flex > span:nth-of-type(2)").eq(2)
  .invoke('text')
  .then((text) => {
    const trimmedText = text.trim();
    
    // Extracting the count (before '(')
    const count = trimmedText.split(' ')[0]; 

    // Extracting the percentage (inside brackets)
    const percentageMatch = trimmedText.match(/\(([^)]+)\)/); // Regex to get text inside ( )
    const percentage = percentageMatch ? percentageMatch[1] : null; // Extract the percentage value

    console.log("Extracted Count:", count);
    console.log("Extracted Percentage:", percentage);

    // Now you can assert separately
    expect(count).to.eq(Last7Day.toString()); // Compare extracted count
    // If you want to validate the percentage, compare it with your expected percentage
    // Example: expect(percentage).to.eq(expectedPercentage);
   }); 
   
  */
    
  })
});


