class CartPage {
    constructor(page) {
        this.page = page;

        // Cart items.
        this.cartItems = page.locator('[data-test="inventory-item"]');

        // Product name inside the cart.
        this.productNames = page.locator('[data-test="inventory-item-name"]');

        // Remove buttons.
        this.removeButtons = page.getByRole('button', {
            name: 'Remove',
        });

        // Button that opens checkout.
        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout',
        });
    }

    // Remove the first product from the cart.
    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    // Open the checkout flow.
    async openCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };