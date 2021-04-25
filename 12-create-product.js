const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
const expect = require('expect')
resolve = require('path').resolve

suite(function(env) {
    describe('11 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 1000 })
        })
        it('Авторизация', async function() {
            await driver.get('http://localhost/litecart/admin')
            await driver.findElement(By.name('username')).sendKeys('admin')
            await driver.findElement(By.name('password')).sendKeys('admin')
            await driver.findElement(By.name('login')).click()
        })
        it('Добавление товара', async function() {
            await driver.findElement(By.xpath("//span[text()='Catalog']")).click()
            await driver.findElement(By.xpath("//a[text()=' Add New Category']/following-sibling::a")).click()
            await driver.findElement(By.xpath("//input[@name='status']")).click()
            await driver.findElement(By.name("name[en]")).sendKeys("MY DUCK")
            await driver.findElement(By.name("code")).sendKeys("123")
            await driver.findElement(By.xpath("//input[@data-name='Rubber Ducks']")).click()
            let categories = await driver.findElements(By.css("select[name=default_category_id] option"))
            for (let i = 0; i < categories.length; i++) {
                let category = await categories[i].getAttribute('textContent')
                if (category == 'Rubber Ducks') {
                    categories[i].click()
                }
            }
            await driver.findElement(By.xpath("(//input[@name='product_groups[]'])[3]")).click()
            await driver.findElement(By.name("quantity")).clear()
            await driver.findElement(By.name("quantity")).sendKeys("2")
            let filePath = resolve('./1511_hr.png')
            await driver.findElement(By.css('input[type=file]')).sendKeys(filePath);
            await driver.findElement(By.name('date_valid_from')).click()
            await driver.findElement(By.name('date_valid_from')).sendKeys('2021-04-20')
            await driver.findElement(By.name('date_valid_to')).sendKeys('2022-04-20')
            await driver.findElement(By.xpath("//a[@href='#tab-information']")).click()
            let manufacturers = await driver.findElements(By.css('select[name=manufacturer_id] option'))
            for (let i = 0; i < manufacturers.length; i++) {
                let manufacturer = await manufacturers[i].getAttribute('value')
                if (manufacturer == '1') {
                    manufacturers[i].click()
                }
            }
            await driver.findElement(By.name("keywords")).sendKeys("rubber_duck, king")
            await driver.findElement(By.name("short_description[en]")).sendKeys("the king of rubber ducks")
            await driver.findElement(By.name("short_description[en]")).sendKeys("the king of rubber ducks")
            await driver.findElement(By.className("trumbowyg-editor")).sendKeys("the king of rubber ducks (or a queen)")
            await driver.findElement(By.name("head_title[en]")).sendKeys("rubber duck royalty")
            await driver.findElement(By.name("meta_description[en]")).sendKeys("rubber duck in a crown")
            await driver.findElement(By.xpath("//a[@href='#tab-prices']")).click()
            await driver.findElement(By.name("purchase_price")).clear()
            await driver.findElement(By.name("purchase_price")).sendKeys("80")
            let currencies = await driver.findElements(By.css("select[name=purchase_price_currency_code] option"))
            for (let i = 0; i < currencies.length; i++) {
                let currency = await currencies[i].getAttribute('value')
                if (currency == 'EUR') {
                    currencies[i].click()
                }
            }
            await driver.findElement(By.name("prices[USD]")).sendKeys("100")
            await driver.findElement(By.name("prices[EUR]")).sendKeys("110")
            await driver.findElement(By.name("gross_prices[USD]")).clear()
            await driver.findElement(By.name("gross_prices[USD]")).sendKeys("120")
            await driver.findElement(By.name("gross_prices[EUR]")).clear()
            await driver.findElement(By.name("gross_prices[EUR]")).sendKeys("130")
            await driver.findElement(By.name("save")).click()
            let check = await driver.findElements(By.linkText("MY DUCK!"))

            expect(check.length != 0).toBe(true)
        })
        after(() => driver && driver.quit())
    })
})