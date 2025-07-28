describe('Database Connection Test', () => {
    it('Verifies DB connection and prints query result for multiple queries', () => {
      // Define multiple queries you want to run
      const queries = [
        {
          sql: 'SELECT COUNT(DISTINCT cabinet_serial) AS Total_Cabinets FROM tenantjazz.tenant_inventory;',
          resultKey: 'total_cabinets', // Key to access the result for this query
          label: 'Total Cabinets' // Label for console log
        },
        {
          sql: 'SELECT COUNT(DISTINCT siteid) AS total_sites FROM tenantjazz.tenant_inventory;',
          resultKey: 'total_sites', // Key to access the result for this query
          label: 'Total Sites' // Label for console log
        }
      ];
  
      // Execute all queries in one task (multiple queries)
      cy.task('READFROMDB', {
        dbConfig: Cypress.config('DB'),  // Using the DB configuration from the Cypress config file
        queries: queries  // Pass the queries array
      }).then((results) => {
        // Loop through each query result and log it
        results.forEach((result, index) => {
          const value = result[0][queries[index].resultKey]; // Access result by key
          console.log(`${queries[index].label}:`, value); // Print the result
        });
      });
    });
  
    it('Verifies DB connection and prints query result for a single query', () => {
        // Define a single query you want to run
        const query = {
          sql: 'SELECT COUNT(DISTINCT cabinet_serial) AS Total_Cabinets FROM tenantjazz.tenant_inventory;',
          resultKey: 'total_cabinets', // Key to access the result for this query
          label: 'Total Cabinets' // Label for console log
        };
      
        // Execute a single query (you can pass the query directly, no need for an array)
        cy.task('READFROMDB', {
          dbConfig: Cypress.config('DB'),
          queries: query  // Pass the single query directly
        }).then((result) => {
          // Since it's a single query, we access the first result
          const value = result[0][0][query.resultKey]; // Access result by key from the first query's first row
          console.log(`${query.label}:`, value); // Print the result
        });
      });    
  });
  