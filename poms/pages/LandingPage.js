import { BasePage } from './BasePage';
import { SignUpModal } from '../modals';
import { LoginModal } from '../modals';

export class LandingPage extends BasePage {
  constructor(page, context) {
    super(page, '/', context);
  }

  selectors = {
    signUpButton: this._page.getByRole('button', { name: 'Sign up' }),
    signInButton: this._page.locator('button', { hasText: 'Sign In' }),
  };

  async clickSignUp() {
    await this.selectors.signUpButton.click();
    return new SignUpModal(this._page, this._context);
  }

  async clickSignIn() {
    await this.selectors.signInButton.click();
    return new LoginModal(this._page, this._context);
  }
}