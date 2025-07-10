

describe( 'Css Locator', () =>
{

  it ( 'csslocator', ( ) =>
  {
    cy.visit ("http://www.automationpractice.pl/index.php")
    cy.get("#search_query_top").type('T-shirt') // id and tag is optional
    cy.get("button[name='submit_search']").click() // attribute with a tag 
    cy.get(".lighter").contains("T-SHIRTS") // assertion with class
  }


  )

}





)