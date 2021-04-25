const { Browser, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')
const { eq, isEqual, isEqualWith } = require('lodash')
const expect = require('expect')

let endings = ["mail.ru", "list.ru", "rambler.ru", "yandex.ru", "gmail.com"],
    symbols = "qwertyuiopasdfghjklzxcvbnm1234567890";

function rand(min, max) {
    return (min + Math.random() * (max - min + 1)) | 0
}

function getRandomStr(len) {
    let ret = ""
    for (let i = 0; i < len; i++)
        console.log(ret += symbols[rand(0, symbols.length - 1)]);
    return ret;
}

function getEmail() {
    let a = getRandomStr(rand(3, 5)),
        b = getRandomStr(rand(3, 5));
    return a + "." + b + "@" + endings[rand(0, endings.length - 1)];
}

suite(function(env) {
    describe('10 задание', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()
            driver.manage().setTimeouts({ implicit: 1000 })
        })
        it('Регистрация новой учётной записи', async function() {
            await driver.get('http://localhost/litecart')
            await driver.findElement(By.css("#box-account-login a")).click();
            await driver.findElement(By.name('firstname')).sendKeys('Bilbo')
            await driver.findElement(By.name('lastname')).sendKeys('Baggins')
            await driver.findElement(By.name('address1')).sendKeys('Bag End, 1 Bagshot Row')
            await driver.findElement(By.name('postcode')).sendKeys('12345')
            await driver.findElement(By.name('city')).sendKeys('Hobbiton')
            await driver.findElement(By.name('phone')).sendKeys('77777777777');
            await driver.findElement(By.css("span.select2-selection__arrow")).click()
            await driver.findElement(By.css("input.select2-search__field")).sendKeys('United States\n')
            await driver.findElement(By.xpath("//select[@name='zone_code']")).click()
            let zones = await driver.findElements(By.css("select[name=zone_code] option"))
            for (let i = 0; i < zones.length; i++) {
                let zone = await zones[i].getAttribute('innerText')
                if (zone == 'Colorado') {
                    zones[i].click()
                }
            }
            let email = getEmail()
            await driver.findElement(By.name('email')).sendKeys(email)
            await driver.findElement(By.name('password')).sendKeys('password123')
            await driver.findElement(By.name('confirmed_password')).sendKeys('password123')
            await driver.findElement(By.name('create_account')).click()
            await driver.findElement(By.css("div#box-account div.content li:last-child a")).click();
            await driver.findElement(By.name('email')).sendKeys(email)
            await driver.findElement(By.name('password')).sendKeys('password123')
            await driver.findElement(By.name('login')).click()
        })
        after(() => driver && driver.quit())
    })
})