const express = require('express');
const database = require("./config/database")
require("dotenv").config();
const route = require("./router/client/index.route");
const routeAdmin = require("./router/admin/index.route");




const app = express();
const port = process.env.PORT;
database.connect();

route(app);
routeAdmin(app);

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));




app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
});