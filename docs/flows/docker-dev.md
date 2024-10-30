# Running dev with docker

1. Run docker compose up

```sh
docker-compose up
```

2. in a new terminal attach to the container.

```sh
docker exec -it telware-frontend-frontend-1 sh
```

3. Run your test here

```sh
npm run test
npm run test:watch
npm run test:coverage
```
