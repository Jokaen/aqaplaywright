import { BasePage } from './BasePage';
import { SignUpModal } from '../modals';

export class LandingPage extends BasePage {
  constructor(page, context) {
    super(page, '/', context);
  }

  selectors = {
    signUpButton: this._page.getByRole('button', { name: 'Sign up' }),
  };

  async clickSignUp() {
    await this.selectors.signUpButton.click();
    return new SignUpModal(this._page, this._context);
  }
}