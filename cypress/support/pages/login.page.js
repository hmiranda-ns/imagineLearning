export class LoginPage{
  getUsernameInput(){
    return cy.get('#user-name')
  }
  getPasswordInput(){
    return cy.get('#password')
  }
  getLoginButton(){
    return cy.get('#login-button')
  }
  fullLogin(user, password){
    this.getUsernameInput().type(user)
    this.getPasswordInput().type(password)
    this.getLoginButton().click()
  }
}