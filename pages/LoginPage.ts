import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly companyCodeInput: Locator;
    readonly loginBtn: Locator;

    constructor(public page: Page) {
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.companyCodeInput = page.locator('#companyCode');
        this.loginBtn = page.locator('#loginSubmitButton');
    }

    async isAlreadyLoggedIn(): Promise<boolean> {
        // If we are already on dashboard, this URL will match
        return this.page.url().includes('analytics');
    }

    async login(user: string, pass: string, dom: string) {
        // Wait for the element specifically to avoid timeout issues
        await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.companyCodeInput.fill(dom);
        await this.loginBtn.click();
    }
}