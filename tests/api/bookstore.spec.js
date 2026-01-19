import { test, expect } from '@playwright/test';
import Auth from '../../src/utils/auth.js';

const baseURL = 'https://demoqa.com';

test.describe.serial('API Tests - Book Store @api', () => {
  const userName = `User_${Date.now()}`;
  const password = Auth.generatePassword();
  let userID = '';
  let token = '';
  let bookISBNs = [];
  let bookTitles = [];

  test('Scenario 1: Should successfully create a new user via API @api-create-user', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log('User created:', responseBody);
    expect(responseBody).toHaveProperty('userID');
    userID = responseBody.userID;
  });

  test('Scenario 2: Should successfully generate a token for the user via API @api-generate-token', async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName, password },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Token generated:', responseBody);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).toBeTruthy();
    token = responseBody.token;
  });

  test('Scenario 3: Should retrieve available books and add them to collection via API @api-get-and-add-books', async ({
    request,
  }) => {
    const getResponse = await request.get(`${baseURL}/BookStore/v1/Books`);
    expect(getResponse.status()).toBe(200);
    const booksData = await getResponse.json();
    console.log(`Books retrieved: ${booksData.books.length} books available`);
    expect(booksData).toHaveProperty('books');
    expect(Array.isArray(booksData.books)).toBe(true);
    expect(booksData.books.length).toBeGreaterThan(0);

    const book = booksData.books[0];
    expect(book).toHaveProperty('isbn');
    expect(book).toHaveProperty('title');

    bookISBNs = booksData.books.slice(0, 2).map(book => book.isbn);
    bookTitles = booksData.books.slice(0, 2).map(book => book.title);

    const addResponse = await request.post(`${baseURL}/BookStore/v1/Books`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId: userID,
        collectionOfIsbns: bookISBNs.map(isbn => ({ isbn })),
      },
    });
    expect(addResponse.status()).toBe(201);
    const responseBody = await addResponse.json();
    console.log(`${bookISBNs.length} books added to collection for user: ${userID}`);
    expect(responseBody).toHaveProperty('books');
    expect(Array.isArray(responseBody.books)).toBe(true);
    expect(responseBody.books.length).toBe(bookISBNs.length);
  });

  test('Scenario 4: Should verify books are in user collection via API @api-verify-books', async ({ request }) => {
    const response = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(`Books in collection: ${responseBody.books.length}`);

    expect(responseBody.books.length).toBeGreaterThanOrEqual(bookISBNs.length);
  });

  test('Scenario 5: Should delete a book from collection via API @api-delete-book', async ({ request }) => {
    const bookISBNToDelete = bookISBNs[0];
    const response = await request.delete(`${baseURL}/BookStore/v1/Book`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId: userID,
        isbn: bookISBNToDelete,
      },
    });
    expect(response.status()).toBe(204);
    console.log(`ISBN ${bookISBNToDelete} with title ${bookTitles[0]} deleted from collection`);
  });

  test('Scenario 6: Should verify deletion by confirming book not in collection @api-verify-deletion', async ({
    request,
  }) => {
    const response = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(`Books remaining after deletion: ${responseBody.books.length}`);

    const deletedBookISBN = bookISBNs[0];
    const deletedBookExists = responseBody.books.some(book => book.isbn === deletedBookISBN);
    console.log(`Deleted book still in collection: ${deletedBookExists}`);
    console.log(`Deleted book ISBN: ${deletedBookISBN}`);

    expect(deletedBookExists).toBe(false);
    expect(responseBody.books.length).toBe(bookISBNs.length - 1);
  });

  test('Should retrieve user collection to verify final state @api-verify-delete', async ({ request }) => {
    const response = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(`Books remaining in collection: ${responseBody.books.length}`);
    expect(responseBody.books.length).toBe(bookISBNs.length - 1);
  });
});
