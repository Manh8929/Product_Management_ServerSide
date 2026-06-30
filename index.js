const express = require('express');
const methodOverride = require('method-override')
// const bodyParser = require('body-parser')
const flash = require('express-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const database = require("./config/database")
require("dotenv").config();
const systemConfig = require("./config/system")
const routeAdmin = require("./router/admin/index.route");
const route = require("./router/client/index.route");


database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })); 
// app.use(bodyParser.urlencoded({extended: false}))


app.set('views', './views');
app.set('view engine', 'pug');

//flash
app.use(cookieParser('EGDKAHSJHDGASJKHDKJASHDJHSAD'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end flash

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'));

route(app);
routeAdmin(app);



app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
});