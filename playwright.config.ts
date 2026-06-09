import { defineConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Fixes the __dirname error for ES Modules on Mac
const envConfigPath = path.resolve(process.cwd(), 'env-config.json');
const envData = JSON.parse(fs.readFileSync(envConfigPath, 'utf-8'));

const env = (process.env.TEST_ENV || 'beta') as string;
const config = envData[env];

export default defineConfig({
  reporter: [['html', { open: 'never' }]], 
  preserveOutput: 'never',
  testDir: './tests',
  workers: 1, 
  timeout: 90000,
  use: {
    actionTimeout: 15000, 
    navigationTimeout: 30000,
    baseURL: config ? config.baseUrl : 'https://beta-portal.example.com', 
    headless: false, 
    viewport: { width: 1280, height: 720 },
  },
});