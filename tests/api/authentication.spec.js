import { test, expect } from '@playwright/test';
import Auth from '../../src/utils/auth.js';

const baseURL = 'https://demoqa.com';

test.describe.serial('API Tests - Authentication @api', () => {
  const userName = `User_${Date.now()}`;
  const password = Auth.generatePassword();
  let userID = '';
  let token = '';

  test('Should successfully create a new user via API @api-create-user', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log('User created:', responseBody);
    expect(responseBody).toHaveProperty('userID');
    userID = responseBody.userID;
  });

  test('Should successfully generate a token for authentication via API @api-generate-token', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Token generated:', responseBody);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
    expect(responseBody.status).toBe('Success');
    token = responseBody.token;
  });

  test('Should fail to create user with existing username @api-create-user-negative', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(406);
    const responseBody = await response.json();
    console.log('Duplicate user error:', responseBody);
    expect(responseBody).toHaveProperty('message', 'User exists!');
  });

  test('Should fail to generate a token with incorrect password @api-token-negative', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password: 'Wrongpasw' },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Invalid credentials response:', responseBody);
    expect(responseBody.token).toBeNull();
    expect(responseBody.expires).toBeNull();
    expect(responseBody.status).toBe('Failed');
    expect(responseBody.result).toBe('User authorization failed.');
  });

  test('Should return user authorization status @api-authorized', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/Authorized`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Authorization status:', responseBody);
    expect(responseBody).toBeTruthy();
  });

  test('Should successfully retrieve user information via API @api-get-user', async ({ request }) => {
    const response = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('User information:', responseBody);
    expect(responseBody).toHaveProperty('userId', userID);
    expect(responseBody).toHaveProperty('username', userName);
  });

  test('Should authenticate and verify user via authorized endpoint @api-authorized', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/Authorized`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('User authorization verified via API:', responseBody);
    expect(responseBody).toBeTruthy();
  });
});
