import {expect, Locator, Page} from "@playwright/test";
import { ApplyPage } from "./apply-page";

export class LoanDetailsPage {
    readonly loanDetailsPage: Page;
    readonly fullName: Locator;
    readonly communicationLanguage: Locator;
    readonly finalContinueButton: Locator;
    readonly successPopUpButton: Locator;

    public constructor(page: Page) {
        this.loanDetailsPage = page;
        this.fullName = page.getByTestId('final-page-full-name');
        this.communicationLanguage = page.getByTestId('final-page-communication-language');
        this.finalContinueButton = page.getByTestId('final-page-continue-button');
        this.successPopUpButton = page.getByTestId('final-page-success-ok-button');
    }

    async verifyLoanDetailsPage() {
        await expect(this.fullName).toBeVisible();
        await expect(this.communicationLanguage).toBeVisible();
        await expect(this.finalContinueButton).toBeVisible();
    }

    async verifySuccessfullySubmittedLoan(applyPage: ApplyPage) {
        await this.finalContinueButton.click();
        await this.successPopUpButton.click();
        await expect (applyPage.amountField).toBeInViewport();
    }
}
