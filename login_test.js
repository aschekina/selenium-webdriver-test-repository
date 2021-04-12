const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')

suite(function(env) {
    describe('Litecart', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 100000 })
                //driver.sleep(100000)
        })

        it('Авторизация', async function() {
            await driver.get('http://localhost/litecart/admin')
            await driver.findElement(By.name('username')).sendKeys('admin')
            await driver.findElement(By.name('password')).sendKeys('admin')
            await driver.findElement(By.name('login')).click()
        })
        it('Клики по списку', async function() {
            var mainList = await driver.findElements(By.css('li#app- a'))
            var len = mainList.length
            i = 0
            for (i; i < len; i++) {
                mainList = await driver.findElements(By.css('li#app- > a'))
                mainList[i].click()
                mainList = await driver.findElements(By.css('li#app- > a'))
                    // var sec = await driver.findElements(By.className('docs'))
                if (driver.findElement(By.className('docs'))) {
                    var secondaryList = await driver.findElements(By.css('ul.docs a'))
                    var len2 = secondaryList.length
                    for (j = 0; j < len2; j++) {
                        secondaryList = await driver.findElements(By.css('ul.docs a'))
                        secondaryList[j].click()
                        secondaryList = await driver.findElements(By.css('ul.docs a'))
                    }
                } else {
                    continue;
                }
                // await driver.get('http://localhost/litecart/admin')
                // mainList = await driver.findElements(By.css('li#app- > a'))
            }
        })
        after(() => driver && driver.quit())
    })
})