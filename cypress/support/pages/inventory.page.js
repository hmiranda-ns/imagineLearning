export class InventoryPage{

  backpackCartButton = '#add-to-cart-sauce-labs-backpack'
  bikeLightCartButton = '#add-to-cart-sauce-labs-bike-light'
  boltTShirtCartButton = '#add-to-cart-sauce-labs-bolt-t-shirt'
  jacketCartButton = '#add-to-cart-sauce-labs-fleece-jacket'
  onesieCartButton = '#add-to-cart-sauce-labs-onesie'
  redTShirtCartButton = '#add-to-cart-test.allthethings()-t-shirt-(red)'
  invPrice = []
  details = []

  getInventoryItemList(){
    return cy.get('.inventory_list')
  }
  getAllInventoryItemPrices(){
    let unsortedPrice = []
      let sortedPrice = []
      let num = 0
      let str = ''
      cy.get('.inventory_list > .inventory_item').within(() => {
        cy.get('.inventory_item_price').each((elem) => {
          // str = elem.text()
          // num = parseFloat(str.replace("$", ""))
          unsortedPrice.push(elem)
        })
      })
      return unsortedPrice
  }

  assertInventoryPricesSorted(inventoryPrices){
    inventoryPrices.forEach((element, index) => {
      if(element < inventoryPrices[index + 1]) {
        return false
      }
    })
    return true
  }

  getInventoryItemLinks(){
    cy.get('.inventory_item_name').parent().each((elem) => {
      this.details.push(elem.text())
      cy.get(`a[contains]]`)
    })
    return this.details
  }

  addItemToCart(item){
    let option = ""
    switch(item){
      case 'Sauce Labs Backpack': 
        option = this.backpackCartButton
        break
      case 'Sauce Labs Bike Light': 
        option = this.bikeLightCartButton
        break
      case 'Sauce Labs Bolt T-Shirt': 
        option = this.boltTShirtCartButton
        break
      case 'Sauce Labs Fleece Jacket': 
        option = this.jacketCartButton
        break
      case 'Sauce Labs Onesie': 
        option = this.onesieCartButton
        break
      case 'Test.allTheThings() T-Shirt (Red)': 
        option = this.redTShirtCartButton
        break
      default: 
        option = this.backpackCartButton
    }
    return cy.get(option).click()
  }
  getCartButton(){
    return cy.get('.shopping_cart_link')
  }
}