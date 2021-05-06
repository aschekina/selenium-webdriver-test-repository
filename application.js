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
    quit() {
        this.driver.quit();
    }
    addProduct() {
        this.mainPage.open();
        this.mainPage.firstProduct();
        this.productPage.addToCart();
    }
    removeProducts() {
        this.cartPage.openCart();
        this.cartPage.removeFromCart();
        this.cartPage.removeLastProduct();
    }
}

exports.Application = Application