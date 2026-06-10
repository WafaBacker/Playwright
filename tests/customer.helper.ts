import { Page } from '@playwright/test';
import { CustomerPage } from '../pages/CustomerPage';
import { NavComponent } from '../pages/NavComponent';

export const runCustomerTests = async (page: Page, test: any) => {
    const customerPage = new CustomerPage(page);
    const nav = new NavComponent(page);

     // Generate the unique ID here
    const dynamicId = `AUTOTEST_${Date.now()}`;

    await test.step('Navigate to Customer Screen', async () => {
        await nav.goToCustomer();
        await page.waitForURL(/.*customer/);
    });


    await test.step('Click Add Customer', async () => {

        await customerPage.clickAddCustomer();
        await page.waitForURL(/.*customers\/customer/, { waitUntil: 'load', timeout: 20000 });
        console.log("Successfully loaded the Add New Customer form!");
        //await page.pause();
    });

    await test.step('Create New Customer', async () => {
        //await CustomerPage.custFirstName.waitFor({ state: 'visible' });
        await customerPage.fillCustomerDetails(`AutCust${dynamicId}`, `LName${dynamicId}`);
        await page.waitForURL(/.*customer/);

    });

    await test.step('Verify Customer in Grid', async () => {
    await page.waitForTimeout(1000); 
    await customerPage.searchAndVerifyCustomer(`AutCust${dynamicId}`);
    //await page.pause();

    });

};