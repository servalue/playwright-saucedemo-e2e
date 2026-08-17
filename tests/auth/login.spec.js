const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

// "SauceDemo page opens" is the test name.
test('SauceDemo page opens', async ({page}) => {

  // page represents one browser tab.
  // goto() opens the given URL.
  // await waits until this action is completed.
  await page.goto('https://www.saucedemo.com/');

  // expect() creates an assertion.
  // An assertion checks the actual result against the expected result.
  // Here we expect the browser page title to be "Swag Labs".
  await expect(page).toHaveTitle('Swag Labs');
} );

test('login page elements are visible', async ({ page }) => {
  // Open SauceDemo.
  await page.goto('https://www.saucedemo.com/');

  // Find the username field by its placeholder text.
  const usernameInput = page.getByPlaceholder('Username');

  // Find the password field by its placeholder text.
  const passwordInput = page.getByPlaceholder('Password');

  // Find the Login button by its role and visible name.
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Check that all three elements are visible.
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();
});

test('standard user can login', async ({page}) => {
     // Arrange
  // Open the login page.
  await page.goto('https://www.saucedemo.com/');

   // Create LoginPage and give it the current browser page.
  const loginPage = new LoginPage(page);

  // Act
  // Enter valid credentials.
  await loginPage.login('standard_user', 'secret_sauce')

  // Assert
  // After successful login, SauceDemo should open the inventory page.
  await expect(page).toHaveURL(/inventory.html/);
});

test('invalid username cannot login', async ({ page }) => {
    // Arrange
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.login('wrong_user', 'secret_sauce');

  // Assert
  const errorMessage = page.getByText(
    'Epic sadface: Username and password do not match any user in this service'
  );

  await expect(errorMessage).toBeVisible();
});

test('invalid password cannot login', async ({ page }) => {
  // Arrange
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.login('standard_user', 'wrong_password');

  // Assert
  const errorMessage = page.getByText(
    'Epic sadface: Username and password do not match any user in this service'
  );

  await expect(errorMessage).toBeVisible();
});

test('locked user cannot login', async ({ page }) => {
// Arrange
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.login('locked_out_user', 'secret_sauce');

  // Assert
  const errorMessage = page.getByText(
    'Epic sadface: Sorry, this user has been locked out.'
  );

  await expect(errorMessage).toBeVisible();
});

test('empty username cannot login', async ({ page }) => {
// Arrange
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.login('', 'secret_sauce');

  // Assert
  const errorMessage = page.getByText(
    'Epic sadface: Username is required'
  );

  await expect(errorMessage).toBeVisible();
});

test('empty password cannot login', async ({ page }) => {
// Arrange
  await page.goto('https://www.saucedemo.com/');
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.login('standard_user', '');

  // Assert
  const errorMessage = page.getByText(
    'Epic sadface: Password is required'
  );

  await expect(errorMessage).toBeVisible();
});