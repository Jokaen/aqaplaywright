import { BaseModal } from './BaseModal';

export class LoginModal extends BaseModal {

  selectors = {
    ...this.selectors,
    emailInput: this._page.locator('[id="signinEmail"]'),
    passwordInput: this._page.locator('[id="signinPassword"]'),
  };

  async typeEmail(email){
    await this.selectors.emailInput.fill(email);
  }

  async typePassword(email){
    await this.selectors.passwordInput.fill(email);
  }

  async executeLogin(email, password){
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickSubmitButton();
  }
}