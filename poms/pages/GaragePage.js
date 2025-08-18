export class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarBtn = page.getByText('Add car');
  }

  async open() {
    await page.goto(process.env.BASE_URL + '/panel/garage');
    await this.addCarBtn.waitFor({ state: 'visible' });
  }

  async isVisible() {
    return this.addCarBtn.isVisible();
  }
}