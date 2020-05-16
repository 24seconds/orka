import express from 'express';
import PORT from './config/constants';

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${PORT}`);
});
