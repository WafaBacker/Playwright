import { defineConfig } from '@playwright/test'; // THIS WAS MISSING
import * as envData from './env-config.json';

const env = (process.env.TEST_ENV || 'beta') as keyof typeof envData;
const config = envData[env];

export default defineConfig({
  reporter: [['html', { open: 'never' }]], 
  preserveOutput: 'never',
  
  testDir: './tests',
  workers: 1, 
  timeout: 90000,
  use: {
     actionTimeout: 15000, // 15 seconds for individual clicks/fills
    navigationTimeout: 30000,
    baseURL: config.baseUrl,
    headless: false, // Ensure you can see it
    viewport: { width: 1280, height: 720 },
  },

});