## 🔥 Time to integrate

1. first get out of `telware-frontend` directory by typing `cd ..`

```sh
# folder structure
root
├── telware-frontend
```

2. Now, clone the backend repository.

```sh
git clone <backend-repo-url>
```

3. Now, get the `.env` file and place it in the backend folder.

```
root
├── telware-frontend
├── telware-backend
    ├── .env
```

4. now go to the backend directory and run the following commands.

```sh
cd telware-backend
./run.sh
```

> [!TIP]
> Go make some coffee, it will take some time to install the dependencies.

5. Now, go to the frontend directory and change your `API_URL`

```sh
VITE_BACKEND_API=http://localhost:3000/api/v1/
VITE_ENV=testing
VITE_REACT_APP_SITE_KEY=secret
VITE_SITE_SECRET=secret
VITE_GITHUB_CLIENT_ID=secret
VITE_GOOGLE_CLIENT_ID=secret
VITE_PORT=5174
```

6. Now, run the frontend server.

```sh
npm run dev
```

> [!IMPORTANT]
> It's important here to use the `http://localhost:5174` as the backend will allow this url only.
