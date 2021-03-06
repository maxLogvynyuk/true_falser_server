import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import cors from 'cors';
import nodeCrone from 'node-cron';

import appRoutes from './server/src/routes/AppRoutes';
import httpLogger from './server/src/logger/httpLogger';
import generateStatistic from './server/src/utils/statistic/generateStatistic';

config.config();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(httpLogger);
}
const http = createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

nodeCrone.schedule(process.env.CRONE_TIME_VALUE,
  async function startGenerateLanguagesAnswersStatistic() {
    await generateStatistic();
}, {
  schedule: true,
  timezone: process.env.CRONE_TIME_ZONE,
});

app.use('/api', appRoutes);

// when a random route is inputed
app.get('*', (request, response) => response.status(200).send({
    message: 'Welcome to this API.',
}));

http.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
