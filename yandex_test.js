var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Open Yandex', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });

    test.it('should append query to title', function() {
        driver.get('https://yandex.ru');
    });

    test.after(function() {
        driver.quit();
    });
});