const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
const expect = require('expect')

suite(function(env) {
    describe('12 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
        })
        it('Добавление товара в корзину', async function() {
            await driver.get('http://localhost/litecart')
            await driver.findElement(By.xpath("(//a[@class='link'])[2]")).click()
            let expected_quantity = await driver.findElement(By.xpath("//span[@class='quantity']")).getAttribute("textContent")
            let size_select = await driver.findElements(By.xpath("//strong[text()='Size']"))
            if (size_select.length > 0) {
                await driver.findElement(By.name("options[Size]")).click()
                let sizes = await driver.findElements(By.css("div#box-product>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(5)>form>table>tbody>tr>td>select option"))
                for (let i = 0; i < sizes.length; i++) {
                    let size = await sizes[i].getAttribute('textContent')
                    if (size == 'Small') {
                        sizes[i].click()
                    }
                }
            }
            await driver.findElement(By.name("add_cart_product")).click()
            expected_quantity = Number(expected_quantity) + 1
            await driver.wait(until.elementTextContains(driver.wait(until.elementLocated(By.className("quantity"))), String(expected_quantity)), 6000)
            await driver.findElement(By.css('div#logotype-wrapper>a>img')).click()
        })
        it('Добавление добавление в корзину еще двух товаров', async function() {
            for (let i = 0; i < 2; i++) {
                await driver.findElement(By.xpath("(//a[@class='link'])[2]")).click()
                expected_quantity = await driver.findElement(By.xpath("//span[@class='quantity']")).getAttribute("textContent")
                let size_select = await driver.findElements(By.xpath("//strong[text()='Size']"))
                if (size_select.length > 0) {
                    await driver.findElement(By.name("options[Size]")).click()
                    let sizes = await driver.findElements(By.css("div#box-product>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(5)>form>table>tbody>tr>td>select option"))
                    for (let j = 0; j < sizes.length; j++) {
                        let size = await sizes[j].getAttribute('textContent')
                        if (size == 'Small') {
                            sizes[j].click()
                        }
                    }
                }
                await driver.findElement(By.name("add_cart_product")).click()
                expected_quantity = Number(expected_quantity) + 1
                real_quantity = By.xpath("//span[@class='quantity']");
                await driver.wait(until.elementTextContains(driver.wait(until.elementLocated(By.className("quantity"))), String(expected_quantity)), 6000)
                await driver.findElement(By.css('div#logotype-wrapper>a>img')).click()
            }
        })
        it('Удаление товаров из корзины', async function() {
            await driver.findElement(By.css("#cart .link")).click();
            let count = await driver.findElements(By.css("li.shortcut"))
            count = count.length - 1
            for (let i = 0; i < count; i++) {
                await driver.findElement(By.xpath("//a[@href='#']//img")).click()
                let name = await driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
                await driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
                await driver.wait(until.elementLocated(By.xpath("//td[@class='item']")))
                driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
            }
            let name = await driver.findElement(By.xpath("//form[@accept-charset='UTF-8']//strong")).getAttribute("textContent")
            await driver.findElement(By.xpath("//button[@name='remove_cart_item']")).click()
            driver.wait((until.stalenessOf(By.xpath("//td[text()='" + name + "']"))), 6000)
        })
        after(() => driver && driver.quit())
    })
})