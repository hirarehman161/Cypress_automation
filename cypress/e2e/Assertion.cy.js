
describe('Assertion',()=>
{
   it('implicit assertion',()=>
  {
     
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // cy.url().should('include','orangehrmlive')
    // cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // cy.url().should('contain','orangehrm')

    // cy.url().should('include','orangehrmlive')
    // .should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // .should('contain','orangehrm')
    
    // cy.url().should('include','orangehrmlive')
    // .and('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    // .and('contain','orangehrm')

    // cy.title().should('include','Orange')
    // .and('eql','OrangeHRM')
    // .and('contain','HRM')

    // To check if the item/Logo exists
    //cy.get('.orangehrm-login-branding').should('be.visible')
  //  cy.get('.orangehrm-login-branding').should('be.visible')
   // .and('exist')

    // To check total number of links present in the webpage
   // cy.xpath('//a').should('have.length','4')
    cy.xpath("//a").should('have.length', 5)

   cy.get("input[placeholder='Username']").type('Admin')
   cy.get("input[placeholder='Username']").should('have.value','Admin')
   })
   
   
   it('Explicit assertion',()=>
    {
       
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
     cy.get("input[placeholder='Username']").type('Admin')
     cy.get("input[placeholder='Username']").should('have.value','Admin')
     cy.get("input[placeholder='Password']").type('admin123')
     cy.get("button[type='submit']").click()

     let ExpectedName = 'Fabian Treutel';
     cy.get('.oxd-userdropdown-name').then( (x)=>
     {
        let ActualName = x.text()

        //BDD
        expect(ExpectedName).to.be.equal(ActualName)
        expect(ExpectedName).to.not.equal(ActualName)

        //TDD 
        assert.equal(ExpectedName,ActualName)
        assert.notEqual(ExpectedName,ActualName)
     }
        
    )



     }) 
}

)