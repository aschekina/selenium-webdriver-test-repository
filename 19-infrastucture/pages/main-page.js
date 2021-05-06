var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class MainPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get('http://localhost/litecart')
    }

    firstProduct() {
        this.driver.findElement(By.xpath("(//a[@class='link'])[2]")).click();
    }

}

exports.MainPage = MainPage;