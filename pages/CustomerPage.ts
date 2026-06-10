import { Page, Locator, expect } from "@playwright/test";

export class CustomerPage {
    readonly addCustomerBtn!: Locator;
    readonly custFirstName!: Locator;
    readonly custLastName!: Locator;
    readonly custSaveBtn!: Locator;
    readonly searchBar!: Locator;

    constructor(public page: Page) {
        this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
        this.custFirstName = page.getByRole('textbox', { name: 'First Name* Company Name' });
        this.custLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.custSaveBtn =page.getByRole('button', { name: 'Save' });
        this.searchBar = page.getByRole('textbox', { name: 'Search for customer' });
    }

    async clickAddCustomer() {
        await expect(this.addCustomerBtn).toBeVisible();
        await expect(this.addCustomerBtn).toBeEnabled();
        await this.addCustomerBtn.click();
    }

     async fillCustomerDetails(custFName: string, custLName: string) {
        await this.custFirstName.fill(custFName);
        await this.custLastName.fill(custLName);
        await this.custSaveBtn.click()
    }
    async searchAndVerifyCustomer(custFName: string) {
        console.log(`Searching for Customer Name: ${custFName}`);
        await this.searchBar.fill(custFName);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter'); //press enter to search
        await this.page.waitForLoadState('networkidle');
        const gridCellLocator = this.page.getByRole('gridcell', { name: custFName }).filter({ hasText: custFName }).first();
        await expect(gridCellLocator).toBeVisible({ timeout: 10000 });
        console.log(`Successfully verified: Customer Name ${custFName} is present inside #reportGrid.`);

    }


}