
describe( 'Tab Handling',()=>{
 it("Approach 1",()=>{
    cy.visit("https://the-internet.herokuapp.com/windows") // parent Tab
    // Removing the target element so the cypress can open the Child window/ tab on the Parent window
    cy.get(".example >a").invoke("removeAttr",'target').
    click()

    // Asssertion to check the child window
    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

    cy.wait(5000)

    // To go back to the parent tab
    cy.go('back')
 })
 it.only("Approach 2",()=>{
    // limitation - Will not work if the domain are different
    cy.visit("https://the-internet.herokuapp.com/windows") // parent Tab

    // Capturing the link for the new window and storing it in the e variable-JQuery Function
    cy.get(".example >a").then( (e)=>
    {
      let url= e.prop('href')
      cy.visit(url)

    })

    // Asssertion to check the child window
    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

    cy.wait(5000)

    // To go back to the parent tab
    cy.go('back')
 })


})