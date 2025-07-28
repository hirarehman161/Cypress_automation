

describe( ('suite name') , () =>
{
   it(('Verify title-postive') , () =>
    {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.title().should('eql','OrangeHRM')
    }
 )
 it(('Verify title-negitive') , () =>
    {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.title().should('eql','OrangeHRM123')
    }
 )

})
