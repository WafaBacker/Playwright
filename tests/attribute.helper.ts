import { Page } from '@playwright/test';
import { AttributePage } from '../pages/AttributePage';
import { NavComponent } from '../pages/NavComponent';

export const runAttributeTests = async (page: Page, test: any) => {
    const attributePage = new AttributePage(page);
    const nav = new NavComponent(page);

    // Generate the unique ID here
    const dynamicId = `${Date.now()}`;

    await test.step('Navigate to Attribute Screen', async () => {
        await nav.goToAttribute();
        await page.waitForURL(/.*attributes/);
    });


    await test.step('Click Add Department', async () => {

        await attributePage.clickAddDepartment();
    });

    await test.step('Create New Department', async () => {
        await page.waitForTimeout(3000);
        await attributePage.CreateNewDepartment("dep_"+dynamicId);
        console.log("Successfully created new Department!");
    });

     await test.step('Verify Department in Grid', async () => {
    await page.waitForTimeout(1000); 
    await attributePage.searchAndVerifyDepartment("dep_"+dynamicId);
    //await page.pause();

    });


};