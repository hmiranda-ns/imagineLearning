import { LoginPage } from '../support/pages/login.page'
import { InventoryPage } from '../support/pages/inventory.page'
import { CartPage } from '../support/pages/cart.page'
import { ProductPage } from '../support/pages/product.page'
 
context("Purchase test", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();
  const product = new ProductPage()

  beforeEach(function (){
    cy.fixture('users').then((users) => {
      this.users = users
    })  
    cy.fixture('inventoryItems').then((items) => {
      this.items = items
    })
  })

  describe("Sauce labs", () => {
    beforeEach(function () {
      cy.visit('')
      login.fullLogin(this.users.standard.username, this.users.standard.password)
    })

    it('Items names contains "Sauce Labs"', function() {
      inventory.getInventoryItemList().should('contain', this.items.brand)
    })

    it('Confirm price is the same on inventory and product page', function() {
      let item = this.items.backpack.name
      let price = ''
      cy.contains('.inventory_item', item).within(() =>{
        price = cy.get('.inventory_item_price').invoke('text')
      })
      
      cy.log(price)

      // inventory.getInventoryItemLink(item).click()
      // product.getProductPrice().should('have.text', price)
    })

    it.only('Elements are sorted out by price', function(){
      let prices = []

      prices = inventory.getAllInventoryItemPrices()
      cy.log(prices)

      inventory.assertInventoryPricesSorted(prices)
      
    })

    it('Add product to cart and complete checkout', function(){
      let item = this.items.jacket.name
      inventory.addItemToCart(item)
      inventory.getCartButton().click()
      cy.contains(item)
      cart.getCheckoutButton().click()
      cart.fillInformationForm(this.users.standard.firstName, this.users.standard.lastName, this.users.standard.zipCode)
      cart.getContinueButton().click()
      cy.contains(item)
      cart.getFinishButton().click()
      cart.assertCheckoutComplete()
    })
  })
})