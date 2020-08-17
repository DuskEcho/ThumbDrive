const express = require("express");
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);


//rest and routing controllers
const landingPageController = require('./controllers/landingPageController.js');
const authController = require('./controllers/authController.js');
const userRestController = require('./controllers/userRestController.js');
const authRestController = require('./controllers/authRestController.js');
const jabRestController = require('./controllers/jabRestController.js');
const notificationRestController = require('./controllers/notificationRestController.js');
const userPageController = require('./controllers/userPageController.js');
const readingRestController = require('./controllers/readingRestController.js');
//configurations
const thumbdriveUtil = require('./util.js');
const app = express();
const ONE_DAY_IN_SECONDS = 86400000;
app.set('view engine', 'ejs');
app.set('port',  process.env.PORT || "8080");
app.set('ip',  process.env.IP || "0.0.0.0");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(sslRedirect());
app.use(session({
    cookie: { maxAge: ONE_DAY_IN_SECONDS },
    store: new MemoryStore({
        checkPeriod: ONE_DAY_IN_SECONDS
    }),
    rolling: true,
    key: 'thumbdriveSession',
    secret: process.env.THUMBDRIVE_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));


//page routes
app.get("/google.html", (req, res) => {res.render("google");}); // awaiting google confirmation page
app.get("/", landingPageController.renderLanding);
app.get("/user", userPageController.renderLanding);
app.get("/home", landingPageController.renderLanding);
app.get("/landing", landingPageController.renderLanding);
app.get("/login", authController.loginNavigation);


//api routes
app.post("/api/dereferenceToken",
    authController.authorizeMaster,
    authRestController.getEmailFromToken);
app.post("/api/dereferenceSession",
    authController.authorizeMaster,
    authRestController.getEmailFromCookie);
app.post("/api/tokenToEmail",
    authController.authorizeMaster,
    authController.tokenToEmail);
app.post("/api/getAllUsers",
    authController.authorizeMaster,
    userRestController.getAllUsers);
app.post("/api/getUser",
    authController.authorizeMaster,
    userRestController.getUser);
app.post("/api/createJab",
     authController.authorizeUser,
    jabRestController.createJab);
app.post("/api/getMyJabs",
       authController.authorizeUser,
    jabRestController.getMyJabs);
app.post("/api/getJabsByUser",
       authController.authorizeMaster,
    jabRestController.getJabsByUser);
app.post("/api/createReading",
     authController.authorizeUser,
    readingRestController.createReading);
app.post("/api/getReadingsByUser",
       authController.authorizeMaster,
    readingRestController.getReadingsByUser);
app.post("/api/getMyReadings",
       authController.authorizeUser,
    readingRestController.getMyReadings);
app.post("/api/tokenToEmail",
    authController.authorizeMaster,
    authController.tokenToEmail);
app.post("/api/tokenToEmail",
    authController.authorizeMaster,
    authController.tokenToEmail);
app.post("/api/notifyAdmin",
    authController.authorizeMaster,
    notificationRestController.notifyAdmin);
app.post("/api/logEvent",
    authController.authorizeMaster,
    notificationRestController.notifyEvents);

(async function() {
})();

app.listen(app.get('port'), app.get('ip'),()=>{console.log(`Express Server is Running at ${app.get('ip')} on port ${app.get('port')}`);});
