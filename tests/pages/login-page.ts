import { Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker/locale/en';

export class LoginPage {
    readonly loginPage: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;

    public constructor(page: Page) {
        this.loginPage = page;
        this.usernameInput = page.getByTestId('login-popup-username-input');
        this.passwordInput = page.getByTestId('login-popup-password-input');
        this.continueButton = page.getByTestId('login-popup-continue-button');
    }

    async login() {
        await this.usernameInput.fill(faker.internet.email());
        await this.passwordInput.fill(faker.internet.password());
        await this.continueButton.click();
    }
}
