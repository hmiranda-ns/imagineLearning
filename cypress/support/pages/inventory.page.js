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

  getInventoryItemPrice(item){
    return cy.contains('.inventory_item', item).find('.inventory_item_price')
  }

  getAllInventoryItemPrices(){
    let unsortedPrice = []
      let sortedPrice = []
      let num = 0
      let str = ''
      cy.get('.inventory_list > .inventory_item').within(() => {
        cy.get('.inventory_item_price').invoke('text').each((elem) => {
          str = elem.text()
          num = parseFloat(str.replace("$", ""))
          unsortedPrice.push(elem)
        })
      })
      cy.log('get all prices')
      cy.log(unsortedPrice)
      return unsortedPrice
  }

  selectProductSort(sort){
    let option = sort == 'high to low' ? 'hilo' : 'lohi';
    return cy.get('.product_sort_container').select(option)
  }

  assertInventoryPricesSorted(sort){
   let option = sort == 'high to low' ? false : true;
   let sorted = []
   let unsorted = []

    cy.get(".inventory_item_price").then(($els) => {
      let texts = Array.from($els, el => el.innerText)

      texts.forEach((str) => {
        unsorted.push(parseFloat(str.replace("$", "")))
      })
      unsorted.pop()
      sorted = unsorted

      if(option){
        sorted.sort( (a,b) => a-b )
      }
      else{
        sorted.sort( (a,b) => b-a )
      }

      expect(unsorted).to.eq(sorted)
    })
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