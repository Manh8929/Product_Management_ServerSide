const express = require('express');
const app = express();
const port = 3000;
const route = require("./router/client/index.route");

route(app);

app.set('views', './views');
app.set('view engine', 'pug');



app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
});