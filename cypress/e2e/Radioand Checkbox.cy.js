

describe('Check UI Element',()=>
{
it('Radio button',()=>
{
    cy.visit("https://testautomationpractice.blogspot.com/")
    // Visibility of radio buttons
    cy.get('#male').should('be.visible')
    cy.get('#female').should('be.visible')

    //Selecting of the radio buttons
    cy.get('#female').click().should("be.checked")
    cy.get('#male').should("not.be.checked")

    


})
    
it('Check-Box',()=>
    {
        cy.visit("https://testautomationpractice.blogspot.com/")
        // Checking check-box
        cy.get('#sunday').should('be.visible')
        cy.get('#monday').should('be.visible')
        cy.get('#tuesday').should('be.visible')
        cy.get('#wednesday').should('be.visible')
        cy.get('#thursday').should('be.visible')
        cy.get('#friday').should('be.visible')
        cy.get('#saturday').should('be.visible')
     
        
        //Selecting of the check box
        cy.get('#sunday').check().should("be.checked")

        //Unselecting check box
        cy.get('#sunday').uncheck().should("not.be.checked")

        // Selecting all the check boxes
        cy.get("input.form-check-input[type ='checkbox']").check().should("be.checked")
        cy.get("input.form-check-input[type ='checkbox']").uncheck().should("not.be.checked")

        //Selecting first check box
        cy.get("input.form-check-input[type ='checkbox']").first().check().should("be.checked")
       
        //Selecting last check box
        cy.get("input.form-check-input[type ='checkbox']").last().check().should("be.checked")
        
        
        
    
    
    })

})