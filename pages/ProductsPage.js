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

    // Remove the first added product.
    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    // Sort products by price, low to high.
    async sortByPriceLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
    }

}

module.exports = { ProductsPage };

