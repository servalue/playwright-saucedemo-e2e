class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Checkout form fields.
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

        // Checkout buttons.
        this.continueButton = page.getByRole('button', {
            name: 'Continue',
        });

        this.finishButton = page.getByRole('button', {
            name: 'Finish',
        });

        // Validation error message.
        this.errorMessage = page.locator('[data-test="error"]');

        // Checkout summary values.
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');

        // Final successful checkout message.
        this.completeHeader = page.locator(
            '[data-test="complete-header"]'
        );
    }

    // Fill customer information and continue to checkout overview.
    async fillCustomerInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);

        await this.continueButton.click();
    }

    // Finish the checkout process.
    async finishCheckout() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };