# Helpdesk client

React and Vite frontend for the helpdesk ticket API.

## Run locally

Start the Laravel API from `helpdesk-api` in one terminal:

```sh
php artisan migrate
php artisan serve
```

Start the client from `helpdesk-client` in another terminal:

```sh
npm install
npm run dev
```

The Vite development server forwards `/api` requests to
`http://127.0.0.1:8000`, so the ticket list and ticket form use the Laravel API
instead of Vite's own server. If Laravel is running on another host or port,
set `VITE_API_PROXY_TARGET` in the client environment to the API server origin
(for example, `http://127.0.0.1:8080`) and restart Vite.

The API request base can also be overridden with `VITE_API_URL` when the client
is deployed or when requests should bypass the development proxy.
