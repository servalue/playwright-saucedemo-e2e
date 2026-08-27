class ProductsPage {
    constructor(page) {
        this.page = page;

        // Page title.
        this.productsTitle = page.getByText('Products');

        // Product action buttons.
        this.addToCartButtons = page.getByRole('button', {
            name: 'Add to cart',
        });

        this.removeButtons = page.getByRole('button', {
            name: 'Remove',
        });

        // All product prices on the page.
        this.productPrices = page.locator('[data-test="inventory-item-price"]');

        // Product sort dropdown.
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    // Add the first product from the list to the cart.
    async addFirstProductToCart() {
        await this.addToCartButtons.first().click();
    }

    // Add a specific product to the cart by its product name.
    async addProductToCart(productName) {
        // Find the product card that contains the required product name.
        const productItem = this.page
            .locator('[data-test="inventory-item"]')
            .filter({
                hasText: productName,
            });

        // Find the Add to cart button inside this product card.
        const addButton = productItem.getByRole('button', {
            name: 'Add to cart',
        });

        // Click the button for this specific product.
        await addButton.click();
    }

    // Remove a specific product from the cart by product name.
    async removeProductFromCart(productName) {
        // Find the required product card.
        const productItem = this.getProductItem(productName);

        // Find the Remove button only inside this product card.
        const removeButton = productItem.getByRole('button', {
            name: 'Remove',
        });

        // Remove this specific product.
        await removeButton.click();
    }

    // Return the product card for a specific product name.
    getProductItem(productName) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({
                hasText: productName,
            });
    }

    // // Remove the first added product.
    // async removeFirstProduct() {
    //     await this.removeButtons.first().click();
    // }

    // Sort products by price, low to high.
    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

}

module.exports = { ProductsPage };

