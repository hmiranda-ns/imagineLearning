export class CartPage{
  getCheckoutButton(){
    return cy.get('#checkout')
  }
  getContinueButton(){
    return cy.get('#continue')
  }
  getFirstNameField(){
    return cy.get('#first-name')
  }
  getLastNameField(){
    return cy.get('#last-name')
  }
  getZipCodeField(){
    return cy.get('#postal-code')
  }
  fillInformationForm(firstName, lastName, zip){
    this.getFirstNameField().type(firstName)
    this.getLastNameField().type(lastName)
    this.getZipCodeField().type(zip)
  }
  getFinishButton(){
    return cy.get('#finish')
  }
  assertCheckoutComplete(){
    return cy.get('#contents_wrapper')
      .should('contain', 'THANK YOU FOR YOUR ORDER')
      .find('#back-to-products').should('exist')
  }
}