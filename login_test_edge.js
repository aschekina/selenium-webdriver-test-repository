var webdriver = require('selenium-webdriver'),
    edge = require('selenium-webdriver/edge');
By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

var options = new edge.Options();
//options.setEdgeChromium(true);
//options.setChromeBinaryPath("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe");

test.describe('Логин в приложении Litecart через Edge', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('edge')
            .setEdgeOptions(options)
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