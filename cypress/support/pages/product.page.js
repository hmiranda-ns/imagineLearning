export class ProductPage{
  getProductPrice(){
    return cy.get('.inventory_details_price')
  }
}