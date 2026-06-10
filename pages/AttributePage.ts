import { Page, Locator, expect } from "@playwright/test";

export class AttributePage {

    readonly createDepartmentBtn!: Locator;
    readonly DepartName!: Locator;
    readonly DepartSaveBtn!: Locator;
    readonly searchInput!: Locator;

    constructor(public page: Page) {
        this.createDepartmentBtn = page.getByRole('button', { name: 'Add Department' });
        this.DepartName = page.getByRole('textbox', { name: 'Name Serialization' });
        this.DepartSaveBtn = page.getByRole('button', { name: 'Save' });
        this.searchInput = page.getByRole('textbox', { name: 'Search for department' });

    }

    async clickAddDepartment() {
        await expect(this.createDepartmentBtn).toBeVisible();
        await expect(this.createDepartmentBtn).toBeEnabled();
        await this.createDepartmentBtn.click();
    }

    async CreateNewDepartment(name: string) {
        await this.DepartName.click();
        await this.DepartName.fill(name);
        await this.DepartSaveBtn.click();
    }

    async searchAndVerifyDepartment(name: string){
        // console.log(`Searching for Item ID: ${id}`);
        // 1. Enter the name into the search box
        await this.page.waitForTimeout(1000);
        await this.searchInput.fill(name);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter'); //press enter to search
        await this.page.waitForLoadState('networkidle');
        const gridCellLocator = this.page.getByRole('gridcell', { name: name, exact: true }).filter({ hasText: name }).first();
        await expect(gridCellLocator).toBeVisible({ timeout: 10000 });
        console.log(`Successfully verified: Item ID ${name} is present inside #reportGrid.`);

    }




}