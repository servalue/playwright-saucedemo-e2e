const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { HeaderComponent } = require('../../components/HeaderComponent');

test('products page opens', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();

    // Act
    // Login with a valid SauceDemo user.
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert
    // Check that the Products title is visible.
    await expect(productsPage.productsTitle).toBeVisible();

    // Also check that we are on the inventory page.
    await expect(page).toHaveURL(/inventory.html/);
});

test('user can add product to cart', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const headerComponent = new HeaderComponent(page);

    // Act
    // Login with a valid SauceDemo user.
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add the first product to the cart.
    await productsPage.addFirstProductToCart();

    // Assert
    // After adding the product, the button changes to "Remove".
    await expect(productsPage.removeButtons.first()).toBeVisible();
    // The cart badge should show "1" because one product was added.
    await expect(headerComponent.cartBadge).toHaveText('1');
});

test('user can remove product from products page', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const headerComponent = new HeaderComponent(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstProductToCart();
    await expect(headerComponent.cartBadge).toHaveText('1');

    // Act
    await productsPage.removeFirstProduct();

    // Assert
    // After removing the product, icon count should be 0 and the cart badge should not be visible.
    await expect(headerComponent.cartBadge).not.toBeVisible();
});

test('products can be sorted by price low to high', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // Act
    // click the sort dropdown and select "Price (low to high)".
    await productsPage.sortByPriceLowToHigh();

    // Assert
    // Get all price texts from the page.
    const priceTexts = await productsPage.productPrices.allTextContents();

    // Convert strings like "$29.99" into numbers like 29.99.
    const actualPrices = priceTexts.map((price) =>
        Number(price.replace('$', ''))
    );

    // Create a sorted copy of the same prices.
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    // Compare actual order with expected sorted order.
    expect(actualPrices).toEqual(expectedPrices);
});