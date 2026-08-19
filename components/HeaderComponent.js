class HeaderComponent {
    constructor(page) {
        this.page = page;

        // Link that opens the shopping cart.
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');

        // Cart badge with number of products.
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    // Open the cart page.
    async openCart() {
        await this.cartLink.click();
    }
}

module.exports = { HeaderComponent };