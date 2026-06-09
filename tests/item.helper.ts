import {  Page } from '@playwright/test';
import { ItemPage } from '../pages/ItemPage';
import { NavComponent } from '../pages/NavComponent';
import { LoginPage } from '../pages/LoginPage';
import * as envData from '../env-config.json';

// Define environment configuration
const env = (process.env.TEST_ENV || 'beta') as keyof typeof envData;
const config = envData[env];

export const runItemTests = async (page: Page, test: any) => {
    const itemPage = new ItemPage(page);
    const nav = new NavComponent(page);

    // Generate the unique ID here
    const dynamicId = `AUTOTEST_${Date.now()}`;

    await test.step('Navigate to Item Screen', async () => {
        await nav.goToItem();
        // Wait for the URL to change to ensure we are on the list page
        await page.waitForURL(/.*products/, { waitUntil: 'networkidle', timeout: 15000 });
    });

    await test.step('Validate Item Title', async () => {
        await itemPage.itemPageTitle.waitFor({ state: 'visible' });
        await itemPage.verifyBreadCrumbAndTitle();
    });

    await test.step('Navigate to Add Item Form', async () => {
        await itemPage.addItemBtn.waitFor({ state: 'visible' });
        await page.waitForTimeout(500); 
        await itemPage.clickAddItem();
        await page.waitForURL(/.*info/, { waitUntil: 'load', timeout: 20000 });
    });

    await test.step('Create New Item', async () => {
        await itemPage.itemIdField.waitFor({ state: 'visible' });
        await itemPage.fillItemDetails(dynamicId,"10","20",`Test_Item_${dynamicId}`);
    });
   await test.step('Verify Item in Grid', async () => {
    if (!page.url().includes('products')) {
        await page.getByRole('link', { name: 'Items' }).click();
        // Wait for the URL to settle before interacting with the search box
        await page.waitForURL(/.*products/);
    }
    
    // Give the grid a second to initialize its internal state
    await page.waitForTimeout(1000); 
    
    await itemPage.searchAndVerifyItem(dynamicId);
});
};
