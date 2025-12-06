import {expect, Locator, Page} from "@playwright/test";

export class ApplyPage {
    readonly applyPage: Page;
    readonly url: string;
    readonly amountField: Locator;
    readonly amountSlider: Locator;
    readonly periodField: Locator;
    readonly periodSlider: Locator;
    readonly applyButton: Locator;
    readonly applyForLoanButton1: Locator;
    readonly applyForLoanButton2: Locator;
    readonly calculatorError: Locator;

    public constructor(page: Page) {
        this.applyPage = page;
        this.url = "https://loan-app.tallinn-learning.ee/small-loan";
        this.amountField = page.getByTestId('id-small-loan-calculator-field-amount')
        this.amountSlider = page.getByTestId('id-small-loan-calculator-field-amount-slider');
        this.periodField = page.getByTestId('ib-small-loan-calculator-field-period');
        this.periodSlider = page.getByTestId('ib-small-loan-calculator-field-period-slider');
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply');
        this.applyForLoanButton1 = page.getByTestId('id-image-element-button-image-1');
        this.applyForLoanButton2 = page.getByTestId('id-image-element-button-image-2');
        this.calculatorError = page.getByTestId('id-small-loan-calculator-field-error');
    }

    async open() {
        await this.applyPage.goto(this.url)
    }

    async applyNow() {
        await this.applyButton.click();
    }

    async verifyAllElementsAreVisible() {
        await expect(this.amountField).toBeVisible();
        await expect(this.amountSlider).toBeVisible();
        await expect(this.periodField).toBeVisible();
        await expect(this.periodSlider).toBeVisible();
        await expect(this.applyButton).toBeVisible();
    }

    async verifyApplyForLoanScrollsBackToTop() {
        const buttons = [this.applyForLoanButton1, this.applyForLoanButton2];

        for (const button of buttons) {
            await button.scrollIntoViewIfNeeded();
            await button.click();
            await expect(this.amountField).toBeInViewport();
        }
    }

    async verifyAmountFieldValidation() {
        await this.amountField.fill('0');
        await expect(this.calculatorError).toBeVisible();
        await this.amountField.fill('500');
        await expect(this.calculatorError).toBeHidden();
    }
}
