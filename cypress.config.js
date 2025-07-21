// const { defineConfig } = require("cypress");
// const pg = require("pg")

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       on("task",{
//         READFROMDB: async ({ dbConfig, sql }) => {
//           const client = new pg.Pool(dbConfig);
//           try {
//             const result = await client.query(sql);
//             await client.end(); // Close connection
//             return result.rows; // Return only the rows
            
//           } catch (error) {
//             console.error("Database query error:", error);
//             throw error; // Let Cypress know the test failed
//           }
//         }
        
//       })
      
      
//     },
    
//     DB :{
//       user : "cratus",
//       host :"52.22.89.189",
//       //database:"cratus_qa",
//       database:"cratus",
//       password:"Cratus@Softoo",
//       port:"5432"

//     },
    
//   },
// });

//============================================//
// const { defineConfig } = require("cypress");
// const pg = require("pg");  // Importing PostgreSQL client

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // Define custom tasks for Cypress
//       on("task", {
//         // Define the READFROMDB task
//         READFROMDB: async ({ dbConfig, queries }) => {
//           const client = new pg.Pool(dbConfig); // Create a new Pool object for DB connection

//           try {
//             // Ensure queries is always an array (in case a single query is passed)
//             const queryArray = Array.isArray(queries) ? queries : [queries];

//             // Execute each query from the array of queries
//             const results = await Promise.all(
//               queryArray.map((query) => client.query(query.sql)) // Running all SQL queries
//             );
            
//             await client.end(); // Close the connection after all queries have run

//             // Return the results of all queries (an array of results)
//             return results.map((result) => result.rows);  // We just return the rows (data) from DB
//           } catch (error) {
//             console.error("Database query error:", error);  // Log any errors
//             throw error; // Let Cypress know if something went wrong
//           }
//         }
//       });
//     },
//     // Database configuration (This is your existing config)
//     DB: {
//       user: "cratus",
//       host: "52.22.89.189",
//       database: "cratus_qa",
//       password: "Cratus@Softoo",
//       port: "5432"
//     },
//   },
// });

//=================================//
// const { defineConfig } = require("cypress");
// const pg = require("pg");
// const Imap = require('imap');
// const { simpleParser } = require('mailparser');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       on("task", {
//         READFROMDB: async ({ dbConfig, sql }) => {
//           const client = new pg.Pool(dbConfig);
//           try {
//             const result = await client.query(sql);
//             await client.end();
//             return result.rows;
//           } catch (error) {
//             console.error("Database query error:", error);
//             throw error;
//           }
//         },

//         getEmailsViaIMAP: (searchCriteria = ['UNSEEN']) => {
//           return new Promise((resolve, reject) => {
//             const imap = new Imap({
//               user: config.env.GMAIL_USER,
//               password: config.env.GMAIL_APP_PASSWORD,
//               host: 'imap.gmail.com',
//               port: 993,
//               tls: true,
//               tlsOptions: { rejectUnauthorized: false }
//             });

//             imap.once('ready', () => {
//               imap.openBox('INBOX', false, (err, box) => {
//                 if (err) {
//                   console.error('IMAP openBox error:', err);
//                   reject(err);
//                   return;
//                 }

//                 imap.search(searchCriteria, (err, results) => {
//                   if (err) {
//                     console.error('IMAP search error:', err);
//                     reject(err);
//                     return;
//                   }

//                   if (!results || results.length === 0) {
//                     console.log('No emails found');
//                     resolve([]);
//                     return;
//                   }

//                   const emails = [];
//                   const fetch = imap.fetch(results, { bodies: '' });

//                   fetch.on('message', (msg) => {
//                     msg.on('body', (stream) => {
//                       simpleParser(stream, (err, parsed) => {
//                         if (err) {
//                           console.error('Email parsing error:', err);
//                           reject(err);
//                           return;
//                         }
//                         emails.push({
//                           subject: parsed.subject,
//                           from: parsed.from ? parsed.from.text : '',
//                           to: parsed.to ? parsed.to.text : '',
//                           date: parsed.date,
//                           text: parsed.text,
//                           html: parsed.html
//                         });
//                       });
//                     });
//                   });

//                   fetch.once('end', () => {
//                     imap.end();
//                     resolve(emails);
//                   });

//                   fetch.once('error', (err) => {
//                     console.error('IMAP fetch error:', err);
//                     imap.end();
//                     reject(err);
//                   });
//                 });
//               });
//             });

//             imap.once('error', (err) => {
//               console.error('IMAP connection error:', err);
//               reject(err);
//             });

//             imap.connect();
//           });
//         },

//         getLatestEmailBySubject: async (subject) => {
//           return new Promise((resolve, reject) => {
//             const imap = new Imap({
//               user: config.env.GMAIL_USER,
//               password: config.env.GMAIL_APP_PASSWORD,
//               host: 'imap.gmail.com',
//               port: 993,
//               tls: true,
//               tlsOptions: { rejectUnauthorized: false }
//             });

//             imap.once('ready', () => {
//               imap.openBox('INBOX', false, (err, box) => {
//                 if (err) {
//                   reject(err);
//                   return;
//                 }

//                 const searchCriteria = subject ? ['SUBJECT', subject] : ['ALL'];
//                 imap.search(searchCriteria, (err, results) => {
//                   if (err) {
//                     reject(err);
//                     return;
//                   }

//                   if (!results || results.length === 0) {
//                     resolve(null);
//                     return;
//                   }

//                   // Get the latest email (last in results)
//                   const latestEmailId = results[results.length - 1];
//                   const fetch = imap.fetch([latestEmailId], { bodies: '' });

//                   fetch.on('message', (msg) => {
//                     msg.on('body', (stream) => {
//                       simpleParser(stream, (err, parsed) => {
//                         if (err) {
//                           reject(err);
//                           return;
//                         }
//                         imap.end();
//                         resolve({
//                           subject: parsed.subject,
//                           from: parsed.from ? parsed.from.text : '',
//                           to: parsed.to ? parsed.to.text : '',
//                           date: parsed.date,
//                           text: parsed.text,
//                           html: parsed.html
//                         });
//                       });
//                     });
//                   });

//                   fetch.once('error', (err) => {
//                     imap.end();
//                     reject(err);
//                   });
//                 });
//               });
//             });

//             imap.once('error', (err) => {
//               reject(err);
//             });

//             imap.connect();
//           });
//         }
//       });
//     },
    
//     DB: {
//       user: "cratus",
//       host: "52.22.89.189",
//       database: "cratus",
//       password: "Cratus@Softoo",
//       port: "5432"
//     }
//   }
// });
//====================//
const { defineConfig } = require("cypress");
const pg = require("pg");
const Imap = require('imap');
const { simpleParser } = require('mailparser');

module.exports = defineConfig({
  e2e: {
    taskTimeout: 120000,
    setupNodeEvents(on, config) {
      // Merge environment variables from cypress.env.json and process.env
      const dbConfig = {
        user: String(config.env.DB_USER || process.env.DB_USER),
        host: String(config.env.DB_HOST || process.env.DB_HOST),
        database: String(config.env.DB_NAME || process.env.DB_NAME),
        password: String(config.env.DB_PASS || process.env.DB_PASS),
        port: Number(config.env.DB_PORT || process.env.DB_PORT || 5432)
      };

      // Verify database configuration
      console.log('Database Configuration:', {
        ...dbConfig,
        password: dbConfig.password ? '*****' : 'MISSING' // Hide actual password
      });

      on("task", {
        // Database query task
        READFROMDB: async ({ sql }) => {
          const client = new pg.Pool(dbConfig);
          try {
            const result = await client.query(sql);
            return result.rows;
          } catch (error) {
            console.error("Database query error:", error);
            throw error;
          } finally {
            await client.end();
          }
        },

        // Email tasks
        getEmailsViaIMAP: (searchCriteria = ['UNSEEN']) => {
          return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              console.error('IMAP operation timed out after 45 seconds');
              reject(new Error('IMAP operation timed out'));
            }, 45000);
            
            const imap = new Imap({
              user: config.env.GMAIL_USER,
              password: config.env.GMAIL_APP_PASSWORD,
              host: 'imap.gmail.com',
              port: 993,
              tls: true,
              tlsOptions: { rejectUnauthorized: false },
              connTimeout: 60000,
              authTimeout: 5000,
              keepalive: false
            });

            const cleanup = () => {
              clearTimeout(timeoutId);
              if (imap.state !== 'disconnected') {
                imap.end();
              }
            };

            imap.once('ready', () => {
              console.log('IMAP connection ready');
              imap.openBox('INBOX', true, (err, box) => {
                if (err) {
                  console.error('IMAP openBox error:', err);
                  cleanup();
                  reject(err);
                  return;
                }
                
                console.log(`Searching for emails with criteria: ${JSON.stringify(searchCriteria)}`);
                imap.search(searchCriteria, (err, results) => {
                  if (err) {
                    console.error('IMAP search error:', err);
                    cleanup();
                    reject(err);
                    return;
                  }

                  if (!results || results.length === 0) {
                    console.log('No emails found');
                    cleanup();
                    resolve([]);
                    return;
                  }

                  console.log(`Found ${results.length} emails`);
                  const emails = [];
                  let processedCount = 0;
                  
                  const emailsToFetch = results.slice(-10);
                  
                  const fetch = imap.fetch(emailsToFetch, { 
                    bodies: '',
                    struct: true
                  });
                  
                  fetch.on('message', (msg) => {
                    msg.on('body', (stream) => {
                      simpleParser(stream, (err, parsed) => {
                        if (err) {
                          console.error('Email parsing error:', err);
                          processedCount++;
                          if (processedCount === emailsToFetch.length) {
                            cleanup();
                            resolve(emails);
                          }
                          return;
                        }
                        
                        emails.push({
                          subject: parsed.subject,
                          from: parsed.from ? parsed.from.text : '',
                          to: parsed.to ? parsed.to.text : '',
                          date: parsed.date,
                          text: parsed.text,
                          html: parsed.html
                        });
                        
                        processedCount++;
                        if (processedCount === emailsToFetch.length) {
                          cleanup();
                          resolve(emails);
                        }
                      });
                    });
                  });
                  
                  fetch.once('error', (err) => {
                    console.error('IMAP fetch error:', err);
                    cleanup();
                    reject(err);
                  });
                });
              });
            });

            imap.once('error', (err) => {
              console.error('IMAP connection error:', err);
              cleanup();
              reject(err);
            });

            imap.once('end', () => {
              console.log('IMAP connection ended');
              clearTimeout(timeoutId);
            });

            console.log('Connecting to IMAP...');
            imap.connect();
          });
        }
      });

      // Return the updated config object
      return config;
    }
  }
});



