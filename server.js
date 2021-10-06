const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const userRouter = require('./routes/user.routes.js');
app.use('/api/users', userRouter);

const watchlistRouter = require('./routes/watchlist.routes.js');
app.use('/api/watchlists', watchlistRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
