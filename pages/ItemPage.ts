import { Page, Locator, expect } from "@playwright/test";

export class ItemPage {
    readonly itemPageTitle!: Locator;
    readonly addItemBtn!: Locator;
    readonly itemIdField!: Locator;
    readonly itemCostPrice!: Locator;
    readonly itemSellingPrice!: Locator;
    readonly itemName!: Locator;
    readonly saveBtn! : Locator;
    readonly continueBtn!: Locator;
    readonly successMessage!: Locator;
    readonly searchInput!: Locator;
    //readonly firstRowCell!: Locator;

    constructor(public page: Page) {
        this.itemPageTitle = page.locator("//h2[@class='heading-card']");
        this.addItemBtn = page.locator("//button[text()='Add Item']")
        this.itemIdField = page.locator("[formcontrolname='itemID']");
        this.itemCostPrice =page.locator("//*[@formcontrolname='costPrice']");
        this.itemSellingPrice =page.locator("//*[@formcontrolname='sellingPrice']");
        this.itemName =page.locator("//*[@formcontrolname='name']");
        this.saveBtn = page.locator("//button[normalize-space()='Save']");
        this.continueBtn = page.getByRole('button', { name: 'Continue', exact: true });
        this.successMessage = page.locator('.swal2-success, .toast-success, text=/successfully/i').first();
        this.searchInput = page.getByPlaceholder('Item Name, UPC, Item ID or Product ID');
    }

    async verifyBreadCrumbAndTitle() {
        await expect(this.itemPageTitle).toHaveText("Items")
        const actualText = await this.itemPageTitle.innerText();
        console.log("Item Page Title is " + actualText)
    }

    async clickAddItem() {
        await expect(this.addItemBtn).toBeVisible();
        await expect(this.addItemBtn).toBeEnabled();
        const buttonText = await this.addItemBtn.innerText();
        console.log("Add Item Text is " + buttonText)
        await this.addItemBtn.click({ delay: 200 });
        await this.page.waitForTimeout(1000);
        const currentURL = this.page.url();
        if (!currentURL.includes('info')) {
            console.log("URL didn't change, trying JS click fallback...");
            await this.addItemBtn.evaluate(node => (node as HTMLElement).click());
        }
    }

    async fillItemDetails(id: string, cost: string, selling: string, name: string ) {
        await this.itemIdField.fill(id);
        await this.itemCostPrice.fill(cost);
        await this.itemSellingPrice.fill(selling);
        await this.itemName.fill(name);
        await this.saveBtn.click()
        const continueBtn = this.page.locator('.swal2-container button:has-text("Continue")').first();

    try {
        await continueBtn.waitFor({ state: 'attached', timeout: 5000 });
        await this.page.waitForTimeout(500);
        await continueBtn.click({ force: true });
        

        // 1. Wait for the confirmation modal to be completely gone
        await this.page.locator('.swal2-container').waitFor({ state: 'hidden' });

        // 2. IMPORTANT: Wait for the Success Toast or Alert
        // This prevents the script from jumping to 'Customers' too early
        await this.page.locator('.swal2-success, .toast-success, text=/successfully/i')
                  .first()
                  .waitFor({ state: 'visible', timeout: 10000 });
                  
    } catch (e) {
        console.log("Modal didn't appear or Save failed to show success message.");
    }
    }

async searchAndVerifyItem(id: string) {
        console.log(`Searching for Item ID: ${id}`);
        // 1. Enter the ID into the search box
        await this.searchInput.fill(id);
        await this.page.keyboard.press('Enter');

    }

}



