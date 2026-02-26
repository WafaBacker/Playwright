import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as envData from '../env-config.json';
import fs from 'fs';

const env = (process.env.TEST_ENV || 'beta') as keyof typeof envData;
const config = envData[env];

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginUrl = `${config.baseUrl}/rc-console/console/login`;
    
    await page.goto(loginUrl);

    // FIX: Force login if we see the username field, regardless of URL
    try {
        await loginPage.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
        console.log("Login page detected. Performing login...");
        await loginPage.login(config.user, config.pass, config.domain);
        await page.waitForURL(/.*analytics/, { timeout: 15000 });
    } catch (e) {
        console.log("Username field not found. Assuming already logged in or redirected.");
    }

    // Ensure the directory exists
    if (!fs.existsSync('.auth')) { fs.mkdirSync('.auth'); }

    await page.context().storageState({ path: '.auth/user.json' });
    console.log("Storage state saved successfully.");
});