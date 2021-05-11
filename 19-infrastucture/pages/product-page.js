var webdriver = require('selenium-webdriver');
// var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build()

var By = webdriver.By,
    until = webdriver.until;

class ProductPage {

    constructor(driver) {
        this.driver = driver;
    }

    async addToCart() {
        let expected_quantity = await this.driver.findElement(By.xpath("//span[@class='quantity']")).getAttribute("textContent")
        let size_select = await this.driver.findElements(By.xpath("//strong[text()='Size']"))
        if (size_select.length > 0) {
            await this.driver.findElement(By.name("options[Size]")).click()
            let sizes = await this.driver.findElements(By.css("div#box-product>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(5)>form>table>tbody>tr>td>select option"))
            for (let i = 0; i < sizes.length; i++) {
                let size = await sizes[i].getAttribute('textContent')
                if (size == 'Small') {
                    await sizes[i].click()
                }
            }
        }
        await this.driver.findElement(By.name("add_cart_product")).click()
        expected_quantity = Number(expected_quantity) + 1
        await this.driver.wait(until.elementTextContains(this.driver.wait(until.elementLocated(By.className("quantity"))), String(expected_quantity)), 6000)
        await this.driver.findElement(By.css('div#logotype-wrapper>a>img')).click()
    }

}

exports.ProductPage = ProductPage;