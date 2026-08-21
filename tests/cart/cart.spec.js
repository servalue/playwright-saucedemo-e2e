const { test, expect } = require('../../fixtures/testFixtures');
// Import reusable product test data.
const { products } = require('../../test-data/products');

test('product appears in cart', async ({
    page,
    productsPage,
    cartPage,
    headerComponent
}) => {
    // Arrange

    // Authentication state is already loaded.
    await page.goto('/inventory.html');

    await productsPage.addProductToCart(products.backpack);

    // Act
    await headerComponent.openCart();

    // Assert
    // After adding the product, the cart should have one item
    await expect(cartPage.cartItems).toHaveCount(1);
    // The product name should be visible in the cart
    await expect(cartPage.productNames).toContainText(products.backpack);
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

    // Add a product to the cart and open the cart page.
    await productsPage.addProductToCart(products.backpack);
    await headerComponent.openCart();

    // Confirm the exact product is present.
    await expect(cartPage.productNames).toContainText(products.backpack);

    // Act
    await cartPage.removeFirstProduct();

    // Assert
    // After removing the product, the cart should be empty
    await expect(cartPage.cartItems).toHaveCount(0);
    // The cart badge should disappear when the cart is empty.
    await expect(headerComponent.cartBadge).not.toBeVisible();
});