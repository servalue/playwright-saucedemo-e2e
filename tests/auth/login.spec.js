const { test, expect } = require('@playwright/test');

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