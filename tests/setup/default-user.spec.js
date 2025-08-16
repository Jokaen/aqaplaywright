import { test as base } from '@playwright/test';
import { LandingPage } from '../../poms';

base('Save storage state for qauto', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const landing = new LandingPage(page, context);
  await landing.open();

  const loginModal = await landing.clickSignIn();
  await loginModal.executeLogin(process.env.DEFAULT_USERNAME, process.env.DEFAULT_PASSWORD);
  await page.waitForLoadState('networkidle');

  await context.storageState({ path: '.auth/user.json' });
  await context.close();
});
