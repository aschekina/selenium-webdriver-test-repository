var webdriver = require('selenium-webdriver'),
    main_page = require('./19-infrastucture/pages/main-page.js'),
    product_page = require('./19-infrastucture/pages/product-page'),
    cart_page = require('./19-infrastucture/pages/cart-page');

class Application {
    constructor() {
        this.driver = new webdriver.Builder()
            .forBrowser("firefox")
            .build();
        this.mainPage = new main_page.MainPage(this.driver);
        this.productPage = new product_page.ProductPage(this.driver);
        this.cartPage = new cart_page.CartPage(this.driver);
    }
    async addProduct() {
        await this.mainPage.open();
        await this.mainPage.firstProduct();
        await this.productPage.addToCart();
    }
    async removeProducts() {
        await this.cartPage.openCart();
        await this.cartPage.removeFromCart();
        await this.cartPage.removeLastProduct();
    }
    async quit() {
        await this.driver.quit();
    }
}

exports.Application = Application