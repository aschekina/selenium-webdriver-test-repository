const { Builder, By, Key, until } = require('selenium-webdriver')
const { ignore, suite } = require('selenium-webdriver/testing')

suite(function(env) {
    describe('Логин в приложении Litecart', function() {
        let driver

        before(async function() {
            driver = await env.builder().build()

        })

        it('Вводим логин и пароль, нажимаем кнопку', async function() {
            await driver.get('http://localhost/litecart/admin');
            await driver.findElement(By.name('username')).sendKeys('admin');
            await driver.findElement(By.name('password')).sendKeys('admin');
            await driver.findElement(By.name('login')).click()
        });

        after(() => driver && driver.quit())
    })
})