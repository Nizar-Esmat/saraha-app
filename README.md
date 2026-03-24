# Saraha App

Anonymous messaging API built with Node.js, Express, and MongoDB.

## Features

- Register with email verification before login
- JWT-based login with token returned on success
- Send anonymous messages to any registered user
- View received messages or all messages (sent + received)
- Delete messages you received
- Freeze (soft-delete) your account — restored on next login
- Phone number stored encrypted, decrypted only on profile fetch

## Stack

- **Express v5** — REST API
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication tokens
- **Joi** — Request validation
- **bcryptjs** — Password hashing
- **CryptoJS** — Phone number encryption
- **Nodemailer** — Email verification

## Core Concepts Practiced

### Validation
Incoming request bodies are validated using **Joi** schemas before reaching any business logic (`src/middlewares/validation.middleware.js`).

### Authentication
After login, a **JWT** is issued. Protected routes use `auth.middleware.js` to verify the token and attach the user to `req.user`.

### Authorization
Ownership checks are done inside service functions — e.g. only the message receiver can delete it.

### Password Hashing
Passwords are hashed with **bcryptjs** before saving and compared on login (`src/utils/hash/`).

### Encryption
Phone numbers are encrypted with **CryptoJS AES** before storing and decrypted when fetching the profile (`src/utils/cryptoJS/`).

### Email Verification
On register, a signed JWT link is emailed to the user. Clicking it sets `isConfirmed = true` on the account.

### Error Handling
A global error handler (`src/utils/error/global-error.js`) catches all errors. Async routes are wrapped with `asyncHandler` to avoid repetitive try/catch.

### Centralized Messages
All response messages come from a single source (`src/utils/messages/index.js`) so strings are consistent and easy to update.

### Soft Delete
Freezing an account sets `isDeleted: true` instead of removing the document. The account is restored automatically on next login.

---

## Setup

```bash
npm install
# copy and fill in .env
docker compose up -d   # starts MongoDB on :27017
npm start              # starts server on :3000
```

**.env**
```
PORT=3000
MONGO_URI=mongodb://root:root@localhost:27017/saraha_app?authSource=admin
JWT_SECRET=your_secret
CryptoJSKey=your_key
EMAIL_USER=you@example.com
EMAIL_PASS=your_password
```

---

## API

| Method | Endpoint              | Auth   | Description              |
|--------|-----------------------|--------|--------------------------|
| POST   | `/auth/register`      | —      | Register                 |
| POST   | `/auth/login`         | —      | Login → returns JWT      |
| GET    | `/auth/verify/:token` | —      | Verify email             |
| GET    | `/user/`              | Bearer | Get my profile           |
| DELETE | `/user/freeze`        | Bearer | Freeze account           |
| POST   | `/massages/`          | —      | Send anonymous message   |
| GET    | `/massages/`          | Bearer | Get messages             |
| DELETE | `/massages/:id`       | Bearer | Delete a message         |
