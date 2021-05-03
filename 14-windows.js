const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
const expect = require('expect')

function remove(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

suite(function(env) {
    describe('14 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 1000 })
        })
        it('Авторизация', async function() {
            await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries')
            await driver.findElement(By.name('username')).sendKeys('admin')
            await driver.findElement(By.name('password')).sendKeys('admin')
            await driver.findElement(By.name('login')).click()
        })
        it('Проверка открытия новых окон', async function() {
            await driver.findElement(By.className("button")).click()
            let mainWindow = await driver.getWindowHandle()
            let elinks = await driver.findElements(By.xpath("//i[@class='fa fa-external-link']"))
            for (let i = 0; i < elinks.length; i++) {
                await elinks[i].click()
                let newWindows = await driver.getAllWindowHandles()
                remove(newWindows, mainWindow);
                let newWindow = String(newWindows)
                await driver.switchTo().window(newWindow)
                await driver.close()
                await driver.switchTo().window(mainWindow)
            }
        })
        after(() => driver && driver.quit())
    })
})