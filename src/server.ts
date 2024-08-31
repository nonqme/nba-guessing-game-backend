import { build } from './index';

const start = async () => {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '127.0.0.1';
  const app = await build();
  try {
    await app.listen({ port: Number(port), host });
    console.log(`Server listening on http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
  }
};

start();
