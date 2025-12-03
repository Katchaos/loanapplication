import { test } from '@playwright/test';
import { ApplyPage } from "../pages/apply-page";

let applyPage: ApplyPage;

test.beforeEach(async ({ page: page }) => {
  applyPage = new ApplyPage(page);
  await applyPage.open();
})

test('verify app fields are in place', async ({ page }) => {
  const applyPage = new ApplyPage(page);
  await applyPage.verifyAllElementsAreVisible();
});

test('verify apply for loan button scrolls back to top', async ({ page }) => {
  const applyPage = new ApplyPage(page);
  await applyPage.verifyApplyForLoanScrollsBackToTop();
});

test('verify validation error for amount field', async ({ page }) => {
  const applyPage = new ApplyPage(page);
  await applyPage.verifyAmountFieldValidation();
});
