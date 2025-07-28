describe("Drop-down",()=>
{
it.skip('Drop-down with select', ()=>
{

  cy.visit("https://www.zoho.com/commerce/free-demo.html")
  cy.get('#zcf_address_country')
  .select("Italy").should("have.value","Italy")


})

it.skip('Drop-down without select', ()=>
    {
    
      cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
      cy.get('#select2-billing_country-container').click()
      cy.get("input[role='combobox']").type('Italy').type("{enter}")
      cy.get('#select2-billing_country-container').should("have.text","Italy")
      
    
    
    })
it.skip('Drop-down with auto suggestion', ()=>
    {
    
      cy.visit("https://www.wikipedia.org/")
      // Get the locator for the drop-down
      cy.get('#searchInput').type('De')
      // Get the locator for the all the auto-suggested options
      cy.get(".suggestion-title").should('be.visible')
      .contains('Denmark').click()      
    
    
    })
it('Drop-down with Dynamic', ()=>
    {
      // Launching the page
      cy.visit("https://www.google.com/")
      // searching for the option
      cy.get('#APjFqb').type('cypress automation ')
      // Putting validation on the auto suggested count
     // cy.get("div.wM6W7d>span").should('have.length',13)
      // jQuery for searching for particular option
      cy.get("div.wM6W7d>span").each( ($el , index , $list)=>{
          if($el.text()=='cypress automation tool')
          {
            cy.wrap($el).click()
          }

      } )

    //  cy.get('#APjFqb').should("have.value","cypress automation tool")
      
    
    })



})