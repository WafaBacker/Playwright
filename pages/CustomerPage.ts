import { Page, Locator, expect } from "@playwright/test";

export class CustomerPage {
    readonly addCustomerBtn!: Locator;

    constructor(public page: Page) {
        this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
    }

    // async clickAddCustomer() {
    //     await this.addCustomerBtn.click();
    // }
}