export class ProductPage{
  getProductPrice(){
    return cy.get('.inventory_details_price')
  }

  assertInventoryProductPrice(item){
    cy.contains('.inventory_item', item).find('.inventory_item_price').then((price) => {
      cy.get(price).parents('.inventory_item_description').find('.inventory_item_name').click()
      // product.getProductPrice().should('have.text', price)
      this.getProductPrice().should('contain', price.text())
     })
  }
}