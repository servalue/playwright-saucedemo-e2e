// This file contains custom test fixtures for Playwright tests.

const { test: base, expect } = require('@playwright/test');

const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { HeaderComponent } = require('../components/HeaderComponent');
const { CheckoutPage } = require('../pages/CheckoutPage');

// Extend the normal Playwright test.
// We add our own reusable fixtures.
const test = base.extend({
    // productsPage fixture
    productsPage: async ({ page }, use) => {
        // Create ProductsPage for the current browser page.
        const productsPage = new ProductsPage(page);

        // Give it to the test.
        await use(productsPage);
    },

    // cartPage fixture
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);

        await use(cartPage);
    },

    // header fixture
    headerComponent: async ({ page }, use) => {
        const header = new HeaderComponent(page);

        await use(header);
    },
    // checkoutPage fixture
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);

        await use(checkoutPage);
    },
});

// Export the extended test and expect for use in test files.
module.exports = {
    test,
    expect,
};