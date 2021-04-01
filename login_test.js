var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Логин в приложении Litecart', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });

    test.it('Вводим логин и пароль, нажимаем кнопку', function() {
        driver.get('http://localhost/litecart/admin');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click()
    });

    test.after(function() {
        driver.quit();
    });
});