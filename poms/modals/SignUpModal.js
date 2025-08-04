import { BaseModal } from './BaseModal';
import { expect } from '@playwright/test';

export class SignUpModal extends BaseModal {
  selectors = {
    ...this.selectors,
    nameInput: this._page.locator('[id=signupName]'),
    lastNameInput: this._page.locator('[id=signupLastName]'),
    emailInput: this._page.locator('[id=signupEmail]'),
    passwordInput: this._page.locator('[id=signupPassword]'),
    repeatPasswordInput: this._page.locator('[id=signupRepeatPassword]'),
    registerButton: this._page.getByRole('button', { name: 'Register' }),
    validationError: (text) => this._page.getByText(text),
  };

  async fillName(value) {
    await this.selectors.nameInput.fill(value);
  }

  async fillLastName(value) {
    await this.selectors.lastNameInput.fill(value);
  }

  async fillEmail(value) {
    await this.selectors.emailInput.fill(value);
  }

  async fillPassword(value) {
    await this.selectors.passwordInput.fill(value);
  }

  async fillRepeatPassword(value) {
    await this.selectors.repeatPasswordInput.fill(value);
  }

  async isErrorVisible(errorText) {
    await expect(this.selectors.validationError(errorText)).toBeVisible();
  }

  async triggerBlur(input) {
    await input.focus();
    await input.blur();
  }

  async getBorderColor(input) {
    return await input.evaluate(el => window.getComputedStyle(el).borderColor);
  }
}