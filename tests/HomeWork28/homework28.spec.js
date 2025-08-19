import { test, expect, request as apiRequest } from '@playwright/test'
import { LandingPage } from '../../poms';

test.describe('API Homework 28 tests', () => {
    test('Profile mocking tests', async ({page, context}) => {
        const landing = new LandingPage(page, context);
        await landing.open();
        const loginModal = await landing.clickSignIn();
        await loginModal.executeLogin(process.env.DEFAULT_USERNAME, process.env.DEFAULT_PASSWORD);

        await page.route('**/api/users/profile', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: "ok",
                    data: {
                        userId: 244766,
                        photoFilename: 'default-user.png',
                        name: 'User',
                        lastName: 'Mocked',
                    }
                })
            });
        });
        await page.locator('a.sidebar_btn.-profile').click();
        await expect(page.getByText ('User Mocked')).toBeVisible();
        page.pause();
    });

    test('Creating cars by api', async ({page, request}) => {
        const apiClient = await apiRequest.newContext();
        const respLogin = await apiClient.post('api/auth/signin/', {
            data: {
                email: process.env.DEFAULT_USERNAME,
                password: process.env.DEFAULT_PASSWORD,
                remember: false
            }
        });

        const responseCorrectCar = await apiClient.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 100
            },
        });
        console.log(await responseCorrectCar.json());
        expect(responseCorrectCar.status()).toBe(201);

        const body = await responseCorrectCar.json();
        expect(body.status).toBe('ok');
        expect(body.data).toHaveProperty('id');
        expect(body.data.carBrandId).toBe(1);
        expect(body.data.carModelId).toBe(1);
        expect(body.data.mileage).toBe(100);

        const responseIncorrectCar = await apiClient.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1
            },
        });

        expect(responseIncorrectCar.status()).toBe(400);



        const responseIncorrectCar2 = await apiClient.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: "one hundred"
            },
        });
        expect(responseIncorrectCar2.status()).toBe(400);
    });
});