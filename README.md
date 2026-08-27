# Autotests - SauceDemo E2E

End-to-end test automation project for the SauceDemo web application.

Target application:

```text
https://www.saucedemo.com/
```

## 🧰 Technology Stack

* JavaScript
* Node.js
* npm
* Playwright
* Playwright Test

Supported browsers:

* Chromium
* Firefox
* WebKit

---

## ⚙️ Prerequisites

Before running the project, install:

### Node.js

Check the installed version:

```bash
node --version
```

### npm

Check the installed version:

```bash
npm --version
```

### Project dependencies

Install dependencies from `package.json` and `package-lock.json`:

```bash
npm install
```

### Playwright browsers

Install Chromium, Firefox, and WebKit used by Playwright:

```bash
npx playwright install
```

After installation, the project is ready to run.

---

## 🗂️ Project Structure

```text
playwright-saucedemo-e2e/
│
├── tests/
│   ├── auth/
│   │   └── login.spec.js
│   ├── products/
│   │   └── products.spec.js
│   ├── cart/
│   │   └── cart.spec.js
│   └── checkout/
│       └── checkout.spec.js
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── components/
│   └── HeaderComponent.js
│
├── fixtures/
│   └── testFixtures.js
│
├── test-data/
│   ├── users.js
│   ├── products.js
│   └── checkout.js
│
├── auth/
│   └── auth.setup.js
│
├── playwright/
│   └── .auth/
│       └── user.json
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ✅ Test Coverage

### Authentication

Covered scenarios:

* Valid login
* Invalid username
* Invalid password
* Locked user
* Empty username
* Empty password
* Login page elements visibility

Test file:

```text
tests/auth/login.spec.js
```

### Products

Covered scenarios:

* Products page opens
* Add product to cart
* Remove product from Products page
* Sort products by price from low to high

Test file:

```text
tests/products/products.spec.js
```

### Cart

Covered scenarios:

* Product appears in cart
* Remove product from cart
* Cart badge validation

Test file:

```text
tests/cart/cart.spec.js
```

### Checkout

Covered scenarios:

* Successful checkout
* Required field validation
* Checkout summary and total validation

Test file:

```text
tests/checkout/checkout.spec.js
```

---

## 🧩 Test Automation Design Patterns

### Page Object Model

Page-specific locators and actions are stored in Page Objects:

```text
pages/LoginPage.js
pages/ProductsPage.js
pages/CartPage.js
pages/CheckoutPage.js
```

Example:

```js
await productsPage.addProductToCart(products.backpack);
```

Page Objects keep page-specific locators and actions outside test files.

---

### Component Object Model

Reusable UI parts shared between pages are stored as components.

Current component:

```text
components/HeaderComponent.js
```

It contains shared header functionality such as:

* cart link
* cart badge
* opening the cart

Example:

```js
await header.openCart();
```

---

### Fixtures

Custom Playwright fixtures are implemented in:

```text
fixtures/testFixtures.js
```

Fixtures create Page Objects and Components and provide them directly to tests.

Example:

```js
test('product appears in cart', async ({
  page,
  productsPage,
  cartPage,
  header,
}) => {
  // Test logic
});
```

This removes repeated object creation from test files.

---

### Test Data

Reusable test data is stored separately from test logic.

Files:

```text
test-data/users.js
test-data/products.js
test-data/checkout.js
```

Examples:

```js
standardUser.username
standardUser.password
products.backpack
checkoutData.firstName
```

---

### Authentication State

Authentication setup is implemented in:

```text
auth/auth.setup.js
```

The setup logs in with the standard SauceDemo user and saves authentication state to:

```text
playwright/.auth/user.json
```

Authentication projects and business projects are configured in:

```text
playwright.config.js
```

Login tests use the real UI login flow.

Business tests reuse the saved authentication state.

Flow:

```text
auth/auth.setup.js
        ↓
login
        ↓
save storage state
        ↓
playwright/.auth/user.json
        ↓
Products / Cart / Checkout tests
```

The authentication state directory is excluded from the repository through:

```text
.gitignore
```

---

### AAA — Arrange / Act / Assert

Tests follow the AAA structure:

```text
Arrange
Act
Assert
```

Example:

```js
// Arrange
await page.goto('/inventory.html');

// Act
await productsPage.addProductToCart(products.backpack);

// Assert
await expect(header.cartBadge).toHaveText('1');
```

---

## 🏷️ Test Suites

Tests are separated into two execution groups using Playwright tags:

```text
@smoke
@regression
```

`@smoke` is used for critical checks.

`@regression` is used for wider regression coverage.

### Run Smoke suite

```bash
npx playwright test -g @smoke
```

### Run Regression suite

```bash
npx playwright test -g @regression
```

### Run Smoke suite in Chromium

```bash
npx playwright test -g @smoke --project=chromium
```

### Run Regression suite in Firefox

```bash
npx playwright test -g @regression --project=firefox
```

### Run Smoke suite in headed mode

```bash
npx playwright test -g @smoke --project=chromium --headed
```

### Run all tagged functional tests

```bash
npx playwright test --grep "@smoke|@regression"
```

---

## ▶️ Running Tests

### Run all tests

Run the complete test suite with all configured projects:

```bash
npx playwright test
```

### Run one test file

```bash
npx playwright test tests/products/products.spec.js
```

### Run one test area

Authentication:

```bash
npx playwright test tests/auth
```

Products:

```bash
npx playwright test tests/products
```

Cart:

```bash
npx playwright test tests/cart
```

Checkout:

```bash
npx playwright test tests/checkout
```

### Run one specific test

Use `-g` with the test name:

```bash
npx playwright test tests/products/products.spec.js -g "user can add product to cart"
```

---

## 🌐 Browser Execution

### Run tests in Chromium

```bash
npx playwright test --project=chromium
```

### Run tests in Firefox

```bash
npx playwright test --project=firefox
```

### Run tests in WebKit

```bash
npx playwright test --project=webkit
```

### Run one specific test in one browser

```bash
npx playwright test tests/products/products.spec.js \
  -g "user can add product to cart" \
  --project=chromium
```

---

## 👀 Headed Mode

By default, Playwright runs browsers in headless mode.

Run tests with a visible browser:

```bash
npx playwright test --headed
```

Run one specific test in visible Chromium:

```bash
npx playwright test tests/products/products.spec.js \
  -g "user can add product to cart" \
  --project=chromium \
  --headed
```

---

## 🐞 Debugging

### Debug all tests

```bash
npx playwright test --debug
```

This opens Playwright Inspector.

### Debug one specific test

```bash
npx playwright test tests/products/products.spec.js \
  -g "user can add product to cart" \
  --project=chromium \
  --debug
```

### Run a test with trace enabled

```bash
npx playwright test tests/products/products.spec.js \
  -g "user can add product to cart" \
  --project=chromium \
  --trace on
```

### Open HTML report

```bash
npx playwright show-report
```

The HTML report contains:

* test results
* passed and failed tests
* execution time
* error information
* available test artifacts

---

## 📦 Failure Artifacts

The Playwright configuration keeps useful artifacts for failed tests:

* screenshots
* video
* trace
* error stack
* HTML report

`Generated test artifacts are excluded from the repository.`
