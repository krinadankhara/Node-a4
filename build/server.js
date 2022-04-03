"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const CourseController_1 = __importDefault(require("./controllers/CourseController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const mongoose_1 = __importDefault(require("mongoose"));
const GroupController_1 = __importDefault(require("./controllers/GroupController"));
const cors = require("cors");
const session = require("express-session");
// build the connection string
require('dotenv').config();
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.9ylnd.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `mongodb+srv://krinadankhara:Krina1010@cluster0.wpjsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// connect to the database
mongoose_1.default.connect(connectionString);
const app = (0, express_1.default)();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
let sess = {
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
};
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}
app.use(session(sess));
app.use(express_1.default.json());
app.get('/', (req, res) => res.send('Welcome!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
// create RESTful Web service API
const courseController = new CourseController_1.default(app);
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
(0, SessionController_1.default)(app);
(0, AuthenticationController_1.default)(app);
(0, GroupController_1.default)(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
