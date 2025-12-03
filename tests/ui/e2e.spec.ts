import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/login-page";
import { ApplyPage } from "../pages/apply-page";
import { LoanDetailsPage } from "../pages/loan-details-page";

let applyPage: ApplyPage;

test.beforeEach(async ({ page }) => {
    applyPage = new ApplyPage(page);
    await applyPage.open();
})

test('apply for loan e2e', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const applyPage = new ApplyPage(page);
    const loanDetailsPage = new LoanDetailsPage(page);
    await applyPage.applyNow();
    await expect (loginPage.continueButton).toBeDisabled();
    await loginPage.login();
    await loanDetailsPage.verifyLoanDetailsPage();
    await loanDetailsPage.verifySuccessfullySubmittedLoan(applyPage);
});
