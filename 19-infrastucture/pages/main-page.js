var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class MainPage {

    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('http://localhost/litecart')
    }

    async firstProduct() {
        await this.driver.findElement(By.xpath("(//a[@class='link'])[2]")).click();
    }

}

exports.MainPage = MainPage;