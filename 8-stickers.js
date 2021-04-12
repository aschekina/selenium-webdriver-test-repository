const { eq, isEqual, isEqualWith } = require('lodash')
const { Browser, By, Key, until } = require('selenium-webdriver')
const { elementTextContains } = require('selenium-webdriver/lib/until')
const { ignore, suite } = require('selenium-webdriver/testing')

suite(function(env) {
    describe('Litecart', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 100000 })
        })
        it('8. Наличие стикеров у товаров', async function() {
            await driver.get('http://localhost/litecart')
            var images = await driver.findElements(By.className('image-wrapper'))
            var stickers = await driver.findElements(By.css("div[class *= 'sticker']"))
            for (var i = 0; i < images.length; i++) {
                stickers = await images[i].findElements(By.css("div[class *= 'sticker']"))
                isEqual(stickers.length, 1)
            }
        })
        after(() => driver && driver.quit())
    })
})