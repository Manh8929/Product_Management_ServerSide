const express = require('express');
require("dotenv").config();
const route = require("./router/client/index.route");

const app = express();
const port = process.env.PORT;

route(app);

app.set('views', './views');
app.set('view engine', 'pug');



app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
});