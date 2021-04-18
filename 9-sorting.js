const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
let expect = require('expect')

suite(function(env) {
    describe('9 задание', function() {
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
        it('Проверка сортировки стран - по алфавиту', async function() {
            let rows = await driver.findElements(By.css(".dataTable  tr.row"))
            let countries = new Array();
            for (let i = 0; i < rows.length; i++) {
                let name = await driver.findElement(By.css("td > a")).getAttribute("textContent")
                if (name != '') {
                    countries.push(name);
                }
            }
            let countries_sorted = countries.sort()
            expect(isEqual(countries, countries_sorted)).toBe(true)
        })
        it('Проверка сортировки зон, если они есть', async function() {
            let rows = await driver.findElements(By.css(".dataTable  tr.row"))
            let zones = new Array();
            let zones_sorted = new Array();
            for (let i = 0; i < rows.length; i++) {
                let zonesq = await rows[i].findElement(By.css("tr.row > td:nth-of-type(6)")).getAttribute("textContent")
                zonesq = Number(zonesq)
                if (zonesq > 0) {
                    rows = await driver.findElements(By.css(".dataTable  tr.row"))
                    await rows[i].findElement(By.css("td:nth-of-type(5) > a")).click();
                    zone_list = await driver.findElements(By.css("#table-zones tr > td:nth-of-type(3)"))
                    for (let j = 0; j < zone_list.length - 1; j++) {
                        let name = await zone_list[j].getAttribute("textContent")
                        zones.push(name)
                    }
                    await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries')
                    rows = await driver.findElements(By.css(".dataTable  tr.row"))
                }
            }
            zones_sorted = zones.sort()
            expect(isEqual(zones, zones_sorted)).toBe(true)
        })
        it('Проверка сортировки зон в каждой стране', async function() {
            await driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones')
            let rows = await driver.findElements(By.css(".dataTable  tr.row"))
            let zones = new Array();
            let zones_sorted = new Array();
            for (let i = 0; i < rows.length; i++) {
                rows = await driver.findElements(By.css(".dataTable  tr.row"))
                await rows[i].findElement(By.css("td:nth-of-type(5) > a")).click();
                zone_list = await driver.findElements(By.css("select[name *= '[zone_code]'] > option[selected = 'selected']"))
                for (let j = 0; j < zone_list.length; j++) {
                    let name = await zone_list[j].getAttribute("textContent")
                    zones.push(name)
                }
                zones_sorted = zones.sort()
                expect(isEqual(zones, zones_sorted)).toBe(true)
                await driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones')
                zones = []
                zones_sorted = []
            }
        })
        after(() => driver && driver.quit())
    })
})