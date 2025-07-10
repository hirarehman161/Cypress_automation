describe('iframe',()=>
{
  it('Approach-3 by using the iframe plugin',()=>
{
  cy.visit('https://the-internet.herokuapp.com/iframe')
  //cy.get("path[d='M17.3 8.2L13.4 12l3.9 3.8a1 1 0 01-1.5 1.5L12 13.4l-3.8 3.9a1 1 0 01-1.5-1.5l3.9-3.8-3.9-3.8a1 1 0 011.5-1.5l3.8 3.9 3.8-3.9a1 1 0 011.5 1.5z']").click()
  cy.frameLoaded("#mce_0_ifr");

})




})