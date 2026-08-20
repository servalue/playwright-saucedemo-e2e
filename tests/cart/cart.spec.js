const { test, expect } = require('../../fixtures/testFixtures');

test('product appears in cart', async ({
    page,
    productsPage,
    cartPage,
    headerComponent
}) => {
    // Arrange

    // Authentication state is already loaded.
    await page.goto('/inventory.html');

    await productsPage.addFirstProductToCart();

    // Act
    await headerComponent.openCart();

    // Assert
    // After adding the product, the cart should have one item
    await expect(cartPage.cartItems).toHaveCount(1);
    // The product name should be visible in the cart
    await expect(cartPage.productNames.first()).toBeVisible();
});

test('user can remove product from cart', async ({
    page,
    productsPage,
    cartPage,
    headerComponent
}) => {
    // Arrange

    // Authentication state is already loaded.
    await page.goto('/inventory.html');

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