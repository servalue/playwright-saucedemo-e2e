const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

// Setup function to authenticate a standard user before running tests.
setup('authenticate standard user', async ({ page }) => {
    // Create the LoginPage.
    const loginPage = new LoginPage(page);

    // Open login page.
    await loginPage.open();

    // Login with the standard SauceDemo user.
    await loginPage.login('standard_user', 'secret_sauce');

    // Confirm that login succeeded.
    await expect(page).toHaveURL(/inventory.html/);

    // Save the authenticated browser state.
    await page.context().storageState({
        path: 'playwright/.auth/user.json',
    });
});