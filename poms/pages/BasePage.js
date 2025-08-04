export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} url
   * @param {import('@playwright/test').BrowserContext} context
   */
  constructor(page, url = '', context = null) {
    this._page = page;
    this._url = url;
    this._context = context;
  }

  async open() {
    if (!this._url) throw new Error('No URL provided for page!');
    await this._page.goto(this._url);
  }
}