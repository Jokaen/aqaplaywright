import { test as base, expect } from '@playwright/test';
import { GaragePage } from '../poms/pages/GaragePage.js';

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/user.json' });
    const page = await context.newPage();

    await page.goto(process.env.BASE_URL + '/panel/garage');

    const garagePage = new GaragePage(page);
    await garagePage.addCarBtn.waitFor({ state: 'visible' });

    await use(garagePage);

    await context.close();
  },
});

export { expect };
