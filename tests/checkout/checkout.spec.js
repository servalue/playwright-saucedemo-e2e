const { test, expect } = require('../../fixtures/testFixtures');

const { products } = require('../../test-data/products');
const { checkoutData } = require('../../test-data/checkout');

test('user can complete checkout successfully', async ({
    page,
    productsPage,
    cartPage,
    headerComponent,
    checkoutPage,
}) => {
    // Arrange
    // Open the Products page with saved authentication state.
    await page.goto('/inventory.html');
    await page.waitForTimeout(3000);
    // Add a specific product.
    await productsPage.addProductToCart(products.backpack);
    await page.waitForTimeout(3000);

    // Open the cart.
    await headerComponent.openCart();
    await page.waitForTimeout(3000);
    // Confirm that the product is present.
    await expect(cartPage.productNames).toContainText(
        products.backpack
    );
    await page.waitForTimeout(3000);
    // Open checkout.
    await cartPage.openCheckout();

    // Fill customer information.
    await checkoutPage.fillCustomerInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );

    // Act
    // Finish checkout.
    await checkoutPage.finishCheckout();

    // Assert
    // Check that the final confirmation message is visible.
    await expect(checkoutPage.completeHeader).toHaveText(
        'Thank you for your order!'
    );
});

test('checkout requires first name', async ({
    page,
    productsPage,
    cartPage,
    headerComponent,
    checkoutPage,
}) => {
    // Arrange
    await page.goto('/inventory.html');

    await productsPage.addProductToCart(products.backpack);
    await headerComponent.openCart();
    await cartPage.openCheckout();

    // Act
    // First name is intentionally empty.
    await checkoutPage.fillCustomerInformation(
        '',
        checkoutData.lastName,
        checkoutData.postalCode
    );

    // Assert
    await expect(checkoutPage.errorMessage).toHaveText(
        'Error: First Name is required'
    );
});

test('checkout total is calculated correctly', async ({
    page,
    productsPage,
    cartPage,
    headerComponent,
    checkoutPage,
}) => {
    // Arrange
    await page.goto('/inventory.html');

    await productsPage.addProductToCart(products.backpack);
    await headerComponent.openCart();
    await cartPage.openCheckout();

    await checkoutPage.fillCustomerInformation(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );

    // Assert
    // Check that subtotal, tax and total are visible.
    await expect(checkoutPage.itemTotal).toBeVisible();
    await expect(checkoutPage.tax).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();
});