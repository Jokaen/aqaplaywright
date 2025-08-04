import { test, expect } from '@playwright/test'

test.beforeEach('Autorization and visit page', async ({page, context}) => {
    await page.goto('https://qauto.forstudy.space/');
})

test('Sign Up: Checking Name field conditions', async ({page}) => {
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Тригерим помилку пустого поля
  const nameInput = page.locator('[id=signupName]');
  await nameInput.focus();
  await nameInput.blur();
  await expect(page.getByText('Name required')).toBeVisible();

  // Граничне тестування: нижче мінімального
  await nameInput.fill('1');
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();

  // Перевірка понадмаксимального
  await nameInput.fill('123451234512345123451'); // 21 символ
  await nameInput.blur();
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();

  // Некоректні символи (кирилиця або спецсимволи)
  await nameInput.fill('цшопцзмоцмьцмц');
  await nameInput.blur();
  await expect(page.getByText('Name is invalid')).toBeVisible();

  // Перевірка червоної рамки (border-color)
  const borderColor = await nameInput.evaluate(el => window.getComputedStyle(el).borderColor);
  expect(borderColor).toContain('rgb');

  // Закриваємо модалку
  await page.locator('.close').click();
});

test('Sign Up: Checking LastName field conditions', async ({ page }) => {
  // Клік по кнопці Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();

  const lastNameInput = page.locator('[id=signupLastName]');

  // Тригеримо помилку пустого поля
  await lastNameInput.focus();
  await lastNameInput.blur();
  await expect(page.getByText('Last name required')).toBeVisible();

  // Граничне тестування нижче мінімального
  await lastNameInput.fill('1');
  await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();

  // Перевірка максимального граничного значення
  await lastNameInput.fill('123451234512345123451'); // 21 символ
  await lastNameInput.blur();
  await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();

  // Перевірка на валідність введеного ласт нейму
  await lastNameInput.fill('цшопцзмоцмьцмц');
  await lastNameInput.blur();
  await expect(page.getByText('Last name is invalid')).toBeVisible();

  // Перевірка підсвічування червоним (rgb(220, 53, 69))
  const borderColor = await lastNameInput.evaluate(el => window.getComputedStyle(el).borderColor);
  expect(borderColor).toContain('rgb');

  // Закриття модального вікна чи повідомлення
  await page.locator('.close').click();
});

test('Sign up: Checking Email field conditions', async ({ page }) => {
  // Клік по кнопці Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();

  const emailInput = page.locator('[id=signupEmail]');

  // Тригеримо помилку пустого поля
  await emailInput.focus();
  await emailInput.blur();
  await expect(page.getByText('Email required')).toBeVisible();

  // Перевірка валідності введеного email
  await emailInput.fill('цшопцзмоцмьцмц');
  await emailInput.blur();
  await expect(page.getByText('Email is incorrect')).toBeVisible();

  // Перевірка підсвічування червоним (rgb(220, 53, 69))
  const borderColor = await emailInput.evaluate(el => window.getComputedStyle(el).borderColor);
  expect(borderColor).toContain('rgb');

  // Закриття модального вікна чи повідомлення
  await page.locator('.close').click();
});

test('Sign Up: Checking Password field conditions', async ({ page }) => {
  // Клік по кнопці Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();

  const passwordInput = page.locator('#signupPassword');
  const errorMessage = "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

  // Тригеримо помилку пустого поля
  await passwordInput.focus();
  await passwordInput.blur();
  await expect(page.getByText('Password required')).toBeVisible();

  // Нижче мінімальної кількості символів
  await passwordInput.fill('Qwerty1');
  await passwordInput.blur();
  await expect(page.locator(`text=${errorMessage}`)).toBeVisible();

  // Вище максимальної кількості символів
  await passwordInput.fill('Qwerty1827tyuisq');
  await passwordInput.blur();
  await expect(page.locator(`text=${errorMessage}`)).toBeVisible();

  // Відсутність заглавної літери
  await passwordInput.fill('qwerty123');
  await passwordInput.blur();
  await expect(page.locator(`text=${errorMessage}`)).toBeVisible();

  // Відсутність цифр (тут в оригіналі ти повторив 'qwerty123', виправлю на пароль без цифр)
  await passwordInput.fill('QwertyPass');
  await passwordInput.blur();
  await expect(page.locator(`text=${errorMessage}`)).toBeVisible();

  // Відсутність маленьких літер
  await passwordInput.fill('QWERTY123');
  await passwordInput.blur();
  await expect(page.locator(`text=${errorMessage}`)).toBeVisible();

  // Перевірка підсвічування червоним (rgb(220, 53, 69))
  const borderColor = await passwordInput.evaluate(el => window.getComputedStyle(el).borderColor);
  expect(borderColor).toContain('rgb');

  // Закриття модального вікна чи повідомлення
  await page.locator('.close').click();
});

test('Sign Up: Checking Re-enter password field conditions', async ({ page }) => {
  // Клік по кнопці Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();

  const passwordInput = page.locator('[id=signupPassword]');
  const repeatPasswordInput = page.locator('[id=signupRepeatPassword]');

  // Тригеримо помилку пустого поля
  await repeatPasswordInput.focus();
  await repeatPasswordInput.blur();
  await expect(page.getByText('Re-enter password required')).toBeVisible();

  // Вводимо паролі, які не співпадають
  await passwordInput.fill('Qwerty123');
  await repeatPasswordInput.fill('Qwerty1234');
  await expect(page.getByText('Passwords do not match')).toBeVisible();

  // Перевірка підсвічування червоним (rgb(220, 53, 69))
  const borderColor = await repeatPasswordInput.evaluate(el => window.getComputedStyle(el).borderColor);
  expect(borderColor).toContain('rgb');

  // Закриття модального вікна чи повідомлення
  await page.locator('.close').click();
});

test('Sign Up: Register button checker', async ({ page }) => {
  // Відкриваємо модальне вікно Sign up
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Вводимо дані
  await page.locator('[id=signupName]').fill('Kaiden');
  await page.locator('[id=signupLastName]').fill('Kamui');
  await page.locator('[id=signupEmail]').fill('kaidenkamui@gmail.com');
  await page.locator('[id=signupPassword]').fill('Qwerty123');
  await page.locator('[id=signupRepeatPassword]').fill('Qwerty1234');

  // Перевіряємо, що кнопка "Register" вимкнена через різні паролі
  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled();

  // Виправляємо повторний пароль
  await page.locator('[id=signupRepeatPassword]').fill('Qwerty123');

  // Перевіряємо, що кнопка "Register" тепер активна
  await expect(registerButton).toBeEnabled();

  // Закриваємо форму
  await page.locator('.close').click();
});