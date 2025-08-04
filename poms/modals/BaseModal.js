export class BaseModal {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').BrowserContext} context
   */
  constructor(page, context = null) {
    this._page = page;
    this._context = context;
    this.selectors = {
      modalContent: this._page.locator('[class="modal-content"]'),
      modalHeader: this._page.locator('[class="modal-header"]'),
      closeButton: this._page.locator('[class="modal-content"] [aria-label="Close"]'),
      submitButton: this._page.locator('[class="modal-content"] [class$="primary"]'),
    };
  }

  async isModalVisible() {
    await expect(this.selectors.modalContent).toBeVisible();
  }

  async clickCloseButton() {
    await this.selectors.closeButton.click();
  }

  async clickSubmitButton() {
    await this.selectors.submitButton.click();
  }
}