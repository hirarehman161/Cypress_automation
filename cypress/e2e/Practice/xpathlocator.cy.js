


describe( 'XpathLocator', ()=>
{
  it( 'find total no. of products' , ()=>
  {
/*cy.visit ('https://qa.cratus.softoo.co/login')

//cy.get('#\:r0\:').click();
cy.contains('Email').click().type('');
cy.contains('Password').click().type(''));
cy.contains('Login').click();*/


  
    cy.visit("http://www.automationpractice.pl/index.php")
    // get for only CSS locator , cy.xpath is for xpath 
    cy.xpath("//ul[@class='product_list grid row']/li'").should('have.length', 7)
  }


  )

}


)