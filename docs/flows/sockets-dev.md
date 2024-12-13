# Mock communication between 2 users

## 1. Run the Server

### Steps:

1. Navigate to the `socket-server` directory:

   ```bash
   cd ./app/socket-server
   ```

2. Install dependencies:
   ```bash
   npm i
   ```
3. Start the server:
   ```bash
   nodemon index.js
   ```

---

## 2. Configure the App

1. Navigate to the `app` directory:
   ```bash
   cd ./app
   ```
2. Add the following line to the `.env` file:
   ```
   VITE_SOCKET_BACKEND_API=http://localhost:4000
   ```

---

## 3. Run the Clients

### Client 1

1. Start the application:
   ```bash
   npm run dev
   ```
2. Log in with **User 1**:
   - **Email:** `johndoe@example.com`
   - **Password:** `1234`
3. **Note:** Ensure all `localStorage` data is cleared before logging in.

### Client 2

1. Start the application:
   ```bash
   npm run dev
   ```
2. Log in with **User 2**:
   - **Email:** `ay7aga@example.com`
   - **Password:** `1234`
3. **Note:** Ensure all `localStorage` data is cleared before logging in.
