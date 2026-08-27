class LoginPage {

  constructor(page) {
    // Save the Playwright page object inside this class.
    this.page = page;

    // Locators for elements on the login page.
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Open the login page.
  async open() {
    await this.page.goto('/');
  }

  // This method performs the complete login action.
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// This makes LoginPage available to other JavaScript files.
module.exports = { LoginPage };