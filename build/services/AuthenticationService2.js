"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSalaries = exports.register = exports.login = void 0;
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const userDao = UserDao_1.default.getInstance();
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.m8jeh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `mongodb+srv://krinadankhara:Krina1010@cluster0.wpjsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// connect to the database
mongoose_1.default.connect(connectionString);
const login = (u, p) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userDao.findUserByCredentials(u, p);
        if (!user) {
            throw "Unknown user";
        }
        return user;
    }
    catch (e) {
        return e;
    }
});
exports.login = login;
const register = (u, p, e) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userDao.findUserByUsername(u);
        if (user) {
            throw 'User already exists';
        }
        const newUser = yield userDao.createUser({ username: u, password: p, email: e });
        return newUser;
    }
    catch (e) {
        return e;
    }
});
exports.register = register;
const initializeSalaries = (salary) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userDao.findAllUsers();
    const salaryPromises = users.map(user => userDao.updateUserSalaryByUsername(user.username, salary));
    const values = yield Promise.all(salaryPromises);
    return values;
});
exports.initializeSalaries = initializeSalaries;
(0, exports.register)('alice678', 'alice234', 'alice234@gmail.com');
(0, exports.login)('alice678', 'alice234');
// login('alice', 'alice123')
// userDao.findAllUsers()
//     .then(users => console.log(users));
