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
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.baseURL = 'http://localhost:4000/api';
//axios.defaults.baseURL = 'https://software-node.herokuapp.com/api';
//axios.defaults.baseURL = 'https://cs5500-01-sp22.herokuapp.com/api';
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.get('/users'); });
const findUserById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get(`/users/${uid}`);
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.post('/users', user); });
const updateUser = (uid, user) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.put(`/users/${uid}`, user); });
const deleteUser = (uid) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.delete(`/users/${uid}`); });
// deleteUser('6206b4ff02c280db0f2e62b5')
//   .then(response => console.log(response.data));
// updateUser('6206b4ff02c280db0f2e62b5',
//   {username: 'john', password: 'doe', email: 'joe@somebody.com'})
//   .then(response => console.log(response.data));
// createUser({username: 'john', password: 'doe', email: 'joe@nobody.com'})
//   .then(response => console.log(response.data));
// findUserById('61fe91c82902a4a7c81c4dd9')
//     .then(response => console.log(response.data));
// findAllUsers()
//     .then(response => console.log(response.data))
