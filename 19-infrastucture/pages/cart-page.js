var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class CartPage {

    constructor(driver) {
        this.driver = driver;
    }

    async openCart() {
        await this.driver.findElement(By.css("#cart .link")).click();
    }

    async removeFromCart() {
        let count = await this.driver.findElements(By.css("li.shortcut"))
        count = count.length - 1
        await this.driver.findElement(By.xpath("//a[@href='#']//img")).click()
        let name = await this.driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
        await this.driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
        await this.driver.wait(until.elementLocated(By.xpath("//td[@class='item']")))
        this.driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
    }
    async removeLastProduct() {
        let name = await this.driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
        await this.driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
        this.driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
    }
}

exports.CartPage = CartPage;