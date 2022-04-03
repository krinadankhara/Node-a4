"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao = __importStar(require("../daos/GroupDao"));
const GroupController = (app) => {
    const findAllGroups = (req, res) => dao.findAllGroups()
        .then(groups => res.json(groups));
    const findGroupById = (req, res) => dao.findGroupById(req.params.gid)
        .then(group => res.json(group));
    const findGroupByName = (req, res) => dao.findGroupByName(req.params.name)
        .then(group => res.json(group));
    const createGroup = (req, res) => dao.createGroup(req.body)
        .then(group => res.json(group));
    const deleteGroup = (req, res) => dao.deleteGroup(req.params.gid)
        .then(status => res.json(status));
    const addUserToGroup = (req, res) => dao.addUserToGroup(req.params.uid, req.params.gid)
        .then(membership => res.json(membership));
    const removeUserFromGroup = (req, res) => dao.removeUserFromGroup(req.params.uid, req.params.gid)
        .then(status => res.json(status));
    const findUsersInGroup = (req, res) => dao.findUsersInGroup(req.params.gid)
        .then(users => res.json(users));
    const findGroupsForUser = (req, res) => dao.findGroupsForUser(req.params.uid)
        .then(groups => res.json(groups));
    app.get('/api/groups', findAllGroups);
    app.get('/api/groups/:gid', findGroupById);
    app.get('/api/groups/name/:name', findGroupByName);
    app.post('/api/groups', createGroup);
    app.delete('/api/groups/:gid', deleteGroup);
    app.post('/users/:uid/groups/:gid', addUserToGroup);
    app.delete('/users/:uid/groups/:gid', removeUserFromGroup);
};
exports.default = GroupController;
