var target = require('./application.js'),
    test = require('selenium-webdriver/testing');

describe('Litecart', function() {
    var app;

    before(function() {
        app = new target.Application();
    });
    it('Добавление товара в корзину', async function() {
        app.addProduct()
    })
    it('Добавление добавление в корзину еще двух товаров', async function() {
        for (let i = 0; i < 2; i++) {
            app.addProduct()
        }
    })
    it('Удаление товаров из корзины', async function() {
        app.removeProducts()
    })
    after(function() {
        app.quit();
    });
})