var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');
By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

var options = new chrome.Options();
options.setChromeBinaryPath("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe")
options.addArguments(["start-maximized"]);

test.describe('Логин в приложении Litecart через Chrome', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    test.it('Вводим логин и пароль, нажимаем кнопку', function() {
        driver.get('http://localhost/litecart/admin');
        //driver.sleep(2000);
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click()
    });

    test.after(function() {
        driver.quit();
    });
});