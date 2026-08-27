const { test, expect } = require('../../fixtures/testFixtures');
// Import reusable product test data.
const { products } = require('../../test-data/products');

// Run before every test in this file.
test.beforeEach(async ({ page }) => {
    // Open the Products page using saved authentication state.
    await page.goto('/inventory.html');
});

test('products page opens',
    {
        tag: '@smoke',
    },
    async ({
        page,
        productsPage
    }) => {
        // Arrange

        // Act

        // Assert
        // Check that the Products title is visible.
        await expect(productsPage.productsTitle).toBeVisible();

        // Also check that we are on the inventory page.
        await expect(page).toHaveURL(/inventory.html/);
    });

test('user can add product to cart',
    {
        tag: '@smoke',
    },
    async ({
        productsPage,
        headerComponent,
    }) => {
        // Arrange

        // Act
        // Add the first product to the cart.
        await productsPage.addProductToCart(products.backpack);

        // Assert
        // Find the same product that we added.
        const backpackItem = productsPage.getProductItem(products.backpack);

        // Check that this product now has a Remove button.
        await expect(
            backpackItem.getByRole('button', { name: 'Remove' })
        ).toBeVisible();

        // Check that the cart contains one product.
        await expect(headerComponent.cartBadge).toHaveText('1');
    });

test('user can remove product from products page',
    {
        tag: '@smoke',
    },
    async ({
        productsPage,
        headerComponent,
    }) => {
        // Arrange
        await productsPage.addProductToCart(products.backpack);
        await expect(headerComponent.cartBadge).toHaveText('1');

        // Act
        // Remove the product from the products page.
        await productsPage.removeProductFromCart(products.backpack);

        // Assert
        const backpackItem = productsPage.getProductItem(products.backpack);

        // Backpack should have Add to cart again.
        await expect(
            backpackItem.getByRole('button', { name: 'Add to cart' })
        ).toBeVisible();
        // After removing the product, icon count should be 0 and the cart badge should not be visible.
        await expect(headerComponent.cartBadge).not.toBeVisible();
    });

test('products can be sorted by price low to high',
    {
        tag: '@regression',
    },
    async ({
        productsPage
    }) => {
        // Arrange

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