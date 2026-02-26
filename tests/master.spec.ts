import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { runItemTests } from './item.spec';
import { runCustomerTests } from './customer.spec';
import * as envData from '../env-config.json';

const env = (process.env.TEST_ENV || 'beta') as keyof typeof envData;
const config = envData[env];

test('Full Business Journey', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Login to Portal', async () => {
        await page.goto(`${config.baseUrl}/rc-console/console/login`);
        await loginPage.login(config.user, config.pass, config.domain);
        await page.waitForURL(/.*analytics/, { waitUntil: 'networkidle' });
    });

    // Executes Item steps in the SAME browser window
    await runItemTests(page);

    // Buffer for UI stability
    await page.waitForTimeout(3000);

    // Executes Customer steps in the SAME browser window
    await runCustomerTests(page);
});