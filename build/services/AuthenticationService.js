"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveRaise = exports.initializeSalaries = exports.register = exports.login = void 0;
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const userDao = UserDao_1.default.getInstance();
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "giuseppi"; //process.env.DB_USERNAME;
const DB_PASSWORD = "supersecretpassword"; //process.env.DB_PASSWORD;
const HOST = "cluster0.m8jeh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `mongodb+srv://krinadankhara:Krina1010@cluster0.wpjsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// connect to the database
mongoose_1.default.connect(connectionString);
const login = (u, p) => userDao.findUserByCredentials(u, p)
    .then(user => {
    if (user) {
        return user;
    }
    else {
        throw "Unknown user";
    }
})
    .then(user => user)
    .catch(e => e);
exports.login = login;
const register = (u, p, e) => userDao.findUserByUsername(u)
    .then(user => {
    if (user) {
        throw 'User already exists';
    }
    else {
        return userDao.createUser({
            username: u, password: p, email: e
        });
    }
})
    .then(newUser => newUser)
    .catch(e => e);
exports.register = register;
const initializeSalaries = (salary) => {
    return userDao.findAllUsers()
        .then(users => {
        const sPromises = users.map(user => userDao.updateUserSalaryByUsername(user.username, salary));
        const resultPromise = Promise.all(sPromises);
        resultPromise
            .then(values => {
            return values;
        });
    });
};
exports.initializeSalaries = initializeSalaries;
const giveRaise = (raise) => {
    return userDao.findAllUsers()
        .then(users => {
        const salaryPromises = users.map(user => {
            // @ts-ignore
            const newSalary = user.salary * (1 + raise / 100);
            return userDao.updateUserSalaryByUsername(user.username, newSalary);
        });
        const resultPromise = Promise.all(salaryPromises);
        resultPromise
            .then(values => {
            return values;
        });
    });
};
exports.giveRaise = giveRaise;
// giveRaise(50)
//   .then(results => console.log(results));
//
// initializeSalaries(50000)
//   .then(results => console.log(results));
//
// register('alice008', 'alice234', 'alice234@gmail.com')
//   .then(user => console.log(user))
//
(0, exports.login)('alice008', 'alice234')
    .then(user => console.log(user));
// userDao.findAllUsers()
//   .then(users => console.log(users));
