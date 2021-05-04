const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
const expect = require('expect')

suite(function(env) {
    describe('17 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 1000 })
        })
        it('Авторизация', async function() {
            await driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1')
            await driver.findElement(By.name('username')).sendKeys('admin')
            await driver.findElement(By.name('password')).sendKeys('admin')
            await driver.findElement(By.name('login')).click()
        })
        it('Проверка логирования', async function() {
            let logs = new Array()
            let count = await driver.findElements(By.css(".dataTable tr.row"));
            for (let i = 3; i <= count.length + 1; i++) {
                let row = await driver.findElement(By.css(".dataTable .row:nth-child(" + i + ")"));
                let checkbox = await row.findElement(By.css("input")).getAttribute("name");
                if (checkbox.indexOf('products') > -1) {
                    await row.findElement(By.css("a")).click();
                    await driver.manage().logs().get("browser").then(function(logsEntries) {
                        logsEntries.forEach(function(l) {
                            logs.push(1)
                            console.log(l)
                        })
                    });
                    if (logs == 0) { console.log("Логов нет.") }
                    await driver.get("http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1");
                }
            }
        })
        after(() => driver && driver.quit())
    })
})