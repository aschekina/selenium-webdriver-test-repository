var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/Chrome')
By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Open Google', function() {
    var driver;

    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .withCapabilities({ 'unexpectedAlertBehaviour': 'dismiss' })
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    test.it('Открыть страницу Google', function() {
        driver.get('https://google.com');
    });

    test.after(function() {
        driver.quit();
    });
});