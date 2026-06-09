import {  Page } from '@playwright/test';
import { CustomerPage } from '../pages/CustomerPage';
import { NavComponent } from '../pages/NavComponent';

export const runCustomerTests = async (page: Page, test:any) => {
    const customerPage = new CustomerPage(page);
    const nav = new NavComponent(page);

    await test.step('Navigate to Customer Screen', async () => {
        await nav.goToCustomer();
        // await page.waitForURL(/.*customer/);
    });
}

//     await test.step('Click Add Customer', async () => {
//         await customerPage.clickAddCustomer();
//     });
// };