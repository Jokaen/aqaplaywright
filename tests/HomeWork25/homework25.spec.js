import { test, expect } from '@playwright/test'
import { LandingPage } from '../../poms';

test.describe('Sign up validation', () => {
  let modal;

  test.beforeEach(async ({ page, context }) => {
    const landing = new LandingPage(page, context);
    await landing.open();
    modal = await landing.clickSignUp();
  });

  test('Name validation', async () => {
    await modal.triggerBlur(modal.selectors.nameInput);
    await modal.isErrorVisible('Name required');

    await modal.fillName('1');
    await modal.triggerBlur(modal.selectors.nameInput);
    await modal.isErrorVisible('Name has to be from 2 to 20 characters long');

    await modal.fillName('цшопцзмоцмьцмц');
    await modal.triggerBlur(modal.selectors.nameInput);
    await modal.isErrorVisible('Name is invalid');

    const borderColor = await modal.getBorderColor(modal.selectors.nameInput);
    expect(borderColor).toContain('rgb');

    await modal.clickCloseButton();
  });

  test('Last Name validation', async () => {
    await modal.triggerBlur(modal.selectors.lastNameInput);
    await modal.isErrorVisible('Last name required');

    await modal.fillLastName('1');
    await modal.triggerBlur(modal.selectors.lastNameInput);
    await modal.isErrorVisible('Last name has to be from 2 to 20 characters long');

    await modal.fillLastName('яяяяяяяяяяяяяяяяяяяяяяяяяяяяяя');
    await modal.triggerBlur(modal.selectors.lastNameInput);
    await modal.isErrorVisible('Last name is invalid');

    const borderColor = await modal.getBorderColor(modal.selectors.lastNameInput);
    expect(borderColor).toContain('rgb');

    await modal.clickCloseButton();
  });

  test('Email validation', async () => {
    await modal.triggerBlur(modal.selectors.emailInput);
    await modal.isErrorVisible('Email required');

    await modal.fillEmail('invalid-email');
    await modal.triggerBlur(modal.selectors.emailInput);
    await modal.isErrorVisible('Email is incorrect');

    const borderColor = await modal.getBorderColor(modal.selectors.emailInput);
    expect(borderColor).toContain('rgb');

    await modal.clickCloseButton();
  });

  test('Password validation', async () => {
    await modal.triggerBlur(modal.selectors.passwordInput);
    await modal.isErrorVisible('Password required');

    await modal.fillPassword('123');
    await modal.triggerBlur(modal.selectors.passwordInput);
    await modal.isErrorVisible('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

    const borderColor = await modal.getBorderColor(modal.selectors.passwordInput);
    expect(borderColor).toContain('rgb');

    await modal.clickCloseButton();
  });

  test('Re-enter password field validation', async () => {
    const passwordInput = modal.selectors.passwordInput;
    const repeatPasswordInput = modal.selectors.repeatPasswordInput;

    await modal.triggerBlur(repeatPasswordInput);
    await modal.isErrorVisible('Re-enter password required');

    await modal.fillPassword('Qwerty123');
    await modal.fillRepeatPassword('Qwerty1234');
    await modal.isErrorVisible('Passwords do not match');

    const borderColor = await modal.getBorderColor(repeatPasswordInput);
    expect(borderColor).toContain('rgb');

    await modal.clickCloseButton();
   });

   test('Register button state logic', async () => {
    await modal.fillName('Kaiden');
    await modal.fillLastName('Kamui');
    await modal.fillEmail('kaidenkamui@gmail.com');
    await modal.fillPassword('Qwerty123');
    await modal.fillRepeatPassword('Qwerty1234');

    await expect(modal.selectors.registerButton).toBeDisabled();
    await modal.fillRepeatPassword('Qwerty123');
    await expect(modal.selectors.registerButton).toBeEnabled();
    await modal.clickCloseButton();
    });
});