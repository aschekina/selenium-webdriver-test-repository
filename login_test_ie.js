var webdriver = require('selenium-webdriver'),
    ie = require('selenium-webdriver/ie');
By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

var options = new ie.Options();
options.requireWindowFocus(true)

test.describe('Логин в приложении Litecart через IE', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('ie')
            .setIeOptions(options)
            .build();
    });

    test.it('Вводим логин и пароль, нажимаем кнопку', function() {
        driver.get('http://localhost/litecart/admin');
        driver.sleep(2000);
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click()
    });

    test.after(function() {
        driver.quit();
    });
});