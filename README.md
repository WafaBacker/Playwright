Console Portal UI Automation (Playwright)
This project contains the automated regression suite for the Console Portal. It follows the Page Object Model (POM) pattern to ensure high maintainability and handles complex asynchronous UI behaviors like dynamic modals and network-dependent transitions.

📂 Project Architecture
/pages: Page Object classes containing locators and atomic actions (e.g., ItemPage.ts, LoginPage.ts).

/tests:

master.spec.ts: The end-to-end "Business Journey" runner.

item.spec.ts: Isolated logic for the Items module.

env-config.json: Centralized environment variables (Base URLs, Credentials).

🚀 Setup and Installation
Install Dependencies:

Bash
npm install
Install Playwright Browsers:

Bash
npx playwright install
🛠 Running the Tests
Execute Full Journey (Headed)
To watch the tests run in the browser:

Bash
npx playwright test tests/master.spec.ts --headed
Run in Debug Mode
To step through the code and inspect locators live:

Bash
npx playwright test tests/master.spec.ts --debug

📊 Reporting and Debugging
If a test fails, Playwright generates a trace file. To view exactly what happened:

Open the report: npx playwright show-report

Review the Trace Viewer to see snapshots before and after every click.
