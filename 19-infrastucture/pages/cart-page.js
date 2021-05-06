var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class CartPage {

    constructor(driver) {
        this.driver = driver;
    }

    openCart() {
        this.driver.findElement(By.css("#cart .link")).click();
    }

    removeFromCart() {
        let count = this.driver.findElements(By.css("li.shortcut"))
        count = count.length - 1
        this.driver.findElement(By.xpath("//a[@href='#']//img")).click()
        let name = this.driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
        this.driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
        this.driver.wait(until.elementLocated(By.xpath("//td[@class='item']")))
        this.driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
    }
    removeLastProduct() {
        let name = this.driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
        this.driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
        this.driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
    }
}

exports.CartPage = CartPage;