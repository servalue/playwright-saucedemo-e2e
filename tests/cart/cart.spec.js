const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { HeaderComponent } = require('../../components/HeaderComponent');

test('product appears in cart', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const headerComponent = new HeaderComponent(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstProductToCart();

    // Act
    await headerComponent.openCart();

    // Assert
    // After adding the product, the cart should have one item
    await expect(cartPage.cartItems).toHaveCount(1);
    // The product name should be visible in the cart
    await expect(cartPage.productNames.first()).toBeVisible();
});

test('user can remove product from cart', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const headerComponent = new HeaderComponent(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstProductToCart();
    await headerComponent.openCart();

    // Act
    await cartPage.removeFirstProduct();

    // Assert
    // After removing the product, the cart should be empty
    await expect(cartPage.cartItems).toHaveCount(0);
    // The cart badge should disappear when the cart is empty.
    await expect(headerComponent.cartBadge).not.toBeVisible();
});