describe( 'Cabinet Onboarding module' , ()=>
{
  it( 'On-boarding cabinet', ()=>
  {
    cy.login("NOC")
    cy.get('button:contains("Onboard Cabinet")').click()
    //cy.get('input[placeholder="Enter Box Sr No" ][type = "text"]').type('')
    //Safe toggle
//    cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(0).check()
//   // cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(0).uncheck()
//     //Secure toggle
//    cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(1).check()
//   // cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(1).uncheck()
//    //Envi toggle
//    cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(2).check()
//  //  cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(2).uncheck()
//    //lock toggle
//    cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(3).check()
//  //  cy.get('input[type="checkbox"].PrivateSwitchBase-input.MuiSwitch-input').eq(3).uncheck()


   // <input class="PrivateSwitchBase-input css-1m9pwf3" data-indeterminate="false" type="checkbox" name="security_sensors" xpath="1">
   cy.wait(6000)
//    cy.get("input[name='security_sensors']").should('exist').click()
//    cy.get("input[name='security_sensors']").should('be.checked')
//    cy.get("input[name='shooting_bold']").should('exist').click({force : true});
//    cy.get("input[name='door_switch']").should('exist').click({force : true});
//    cy.get("input[name='smart_switch']").should('exist').click({force : true});
//    cy.get("input[name='torch']").should('exist').click({force : true});
//    cy.get("input[name='vibration']").should('exist').click({force : true});
//    cy.get("input[name='filter_clogging']").should('exist').click({force : true});
//    cy.get("input[name='temperature']").should('exist').click({force : true});
//    cy.get("input[name='aircon_failure']").should('exist').click({force : true});
//    cy.get("input[name='flood']").should('exist').click({force : true});
//    cy.get("input[name='humidity']").should('exist').click({force : true});
//    cy.get("input[name='smoke']").should('exist').click({force : true});
//    cy.get("input[name='fan_failure']").should('exist').click({force : true});

// Cabinet Pictures


    cy.get('div.flex.items-center.flex-col').click({multiple : true});
    cy.get('input[type="file"]').attachFile('barcode.png');
    //assertion for the checking if the cabinet image is added
    cy.get("div.flex.w-\\[100\\%\\].justify-between.border-\\[1px\\]").should("exist");

    cy.get('div.flex.items-center.flex-col').eq(1).click();
    cy.get('input[type="file"]').eq(1).attachFile('profile.png');
    cy.get("div.flex.w-\\[100\\%\\].justify-between.border-\\[1px\\]")
    .eq(1) // Ensure it's the second one
    .should("exist");








 
 
   








  })

})