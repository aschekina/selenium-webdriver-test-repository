const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
let expect = require('expect')

suite(function(env) {
    describe('10 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 1000 })
        })
        it('На главной странице и на странице товара совпадает текст названия товара', async function() {
            await driver.get('http://localhost/litecart')
            let product = await driver.findElement(By.css("#box-campaigns .product a.link"))
            let productName = await product.findElement(By.css(".name")).getAttribute("textContent");

            await product.click();

            let productName2 = await driver.findElement(By.css("#box-product .title")).getAttribute("textContent");

            expect(isEqual(productName, productName2)).toBe(true)
        });
        it('На главной странице и на странице товара совпадают цены (обычная и акционная)', async function() {
            await driver.get('http://localhost/litecart')
            let product = await driver.findElement(By.css("#box-campaigns .product a.link"))
            let regularPrice = await product.findElement(By.css(".regular-price")).getAttribute("textContent");
            let campaignPrice = await product.findElement(By.css(".campaign-price")).getAttribute("textContent");

            await product.click();

            let regularPrice2 = await driver.findElement(By.css("#box-product .regular-price")).getAttribute("textContent");
            let campaignPrice2 = await driver.findElement(By.css("#box-product .campaign-price")).getAttribute("textContent");

            expect(isEqual(regularPrice, regularPrice2)).toBe(true)
            expect(isEqual(campaignPrice, campaignPrice2)).toBe(true)
        });
        it('Обычная цена зачёркнутая и серая', async function() {
            await driver.get('http://localhost/litecart')
            let product = await driver.findElement(By.css("#box-campaigns .product a.link"))
            let regularPriceColor = await product.findElement(By.css(".regular-price")).getCssValue("color")
            let regularPriceTag = await product.findElement(By.css(".regular-price")).getAttribute("tagName")
            let rgb = regularPriceColor
            rgb = rgb.split("(")
            rgb = rgb.splice(1, 1)
            rgb = String(rgb)
            rgb = rgb.split(", ")
            rgb = rgb.splice(0, 3)
            let [r, g, b] = rgb;

            await product.click();

            let regularPriceColor2 = await driver.findElement(By.css("#box-product .regular-price")).getCssValue("color")
            let regularPriceTag2 = await driver.findElement(By.css("#box-product .regular-price")).getAttribute("tagName")
            let rgb2 = regularPriceColor2
            rgb2 = rgb2.split("(")
            rgb2 = rgb2.splice(1, 1)
            rgb2 = String(rgb2)
            rgb2 = rgb2.split(", ")
            rgb2 = rgb2.splice(0, 3)
            let [r2, g2, b2] = rgb;

            expect(isEqualWith(r, g, b)).toBe(true)
            expect(isEqual(regularPriceTag, 'S')).toBe(true)
            expect(isEqualWith(r2, g2, b2)).toBe(true)
            expect(isEqual(regularPriceTag2, 'S')).toBe(true)
        });
        it('Акционная жирная и красная', async function() {
            await driver.get('http://localhost/litecart')
            let product = await driver.findElement(By.css("#box-campaigns .product a.link"))
            let campaignPriceColor = await product.findElement(By.css(".campaign-price")).getCssValue("color")
            let campaignPriceTag = await product.findElement(By.css(".campaign-price")).getAttribute("tagName")
            let rgb = campaignPriceColor
            rgb = rgb.split("(")
            rgb = rgb.splice(1, 1)
            rgb = String(rgb)
            rgb = rgb.split(", ")
            rgb = rgb.splice(0, 3)
            let [r, g, b] = rgb;
            if (b.indexOf(")") !== -1) {
                b = b.slice(0, -1);
            }

            await product.click();

            let campaignPriceColor2 = await driver.findElement(By.css("#box-product .campaign-price")).getCssValue("color")
            let campaignPriceTag2 = await driver.findElement(By.css("#box-product .campaign-price")).getAttribute("tagName")
            let rgb2 = campaignPriceColor2
            rgb2 = rgb2.split("(")
            rgb2 = rgb2.splice(1, 1)
            rgb2 = String(rgb2)
            rgb2 = rgb2.split(", ")
            rgb2 = rgb2.splice(0, 3)
            let [r2, g2, b2] = rgb;
            if (b2.indexOf(")") !== -1) {
                b2 = b2.slice(0, -1);
            }

            expect(isEqual(g, b)).toBe(true)
            expect(isEqual(campaignPriceTag, 'STRONG')).toBe(true)
            expect(isEqual(g2, b2)).toBe(true)
            expect(isEqual(campaignPriceTag2, 'STRONG')).toBe(true)
        });
        it('Акционная цена крупнее, чем обычная', async function() {
            await driver.get('http://localhost/litecart')
            let product = await driver.findElement(By.css("#box-campaigns .product a.link"))
            let regularPriceFontSize = await product.findElement(By.css(".regular-price")).getCssValue("font-size")
            regularPriceFontSize = regularPriceFontSize.slice(0, -2)
            regularPriceFontSize = Number(regularPriceFontSize)
            let campaignPriceFontSize = await product.findElement(By.css(".campaign-price")).getCssValue("font-size")
            campaignPriceFontSize = campaignPriceFontSize.slice(0, -2);
            campaignPriceFontSize = Number(campaignPriceFontSize)

            await product.click();

            let regularPriceFontSize2 = await driver.findElement(By.css(".regular-price")).getCssValue("font-size")
            regularPriceFontSize2 = regularPriceFontSize2.slice(0, -2)
            regularPriceFontSize2 = Number(regularPriceFontSize2)
            let campaignPriceFontSize2 = await driver.findElement(By.css(".campaign-price")).getCssValue("font-size")
            campaignPriceFontSize2 = campaignPriceFontSize2.slice(0, -2);
            campaignPriceFontSize2 = Number(campaignPriceFontSize2)

            expect(regularPriceFontSize < campaignPriceFontSize).toBe(true)
            expect(regularPriceFontSize2 < campaignPriceFontSize2).toBe(true)

        });
        after(() => driver && driver.quit())
    })
})