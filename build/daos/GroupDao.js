"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGroupsForUser = exports.findUsersInGroup = exports.removeUserFromGroup = exports.addUserToGroup = exports.deleteGroup = exports.createGroup = exports.findGroupByName = exports.findGroupById = exports.findAllGroups = void 0;
const GroupModel_1 = __importDefault(require("../mongoose/groups/GroupModel"));
const GroupMembershipModel_1 = __importDefault(require("../mongoose/groups/GroupMembershipModel"));
const findAllGroups = () => GroupModel_1.default.find();
exports.findAllGroups = findAllGroups;
const findGroupById = (gid) => GroupModel_1.default.findById(gid);
exports.findGroupById = findGroupById;
const findGroupByName = (name) => GroupModel_1.default.findOne({ name });
exports.findGroupByName = findGroupByName;
const createGroup = (group) => GroupModel_1.default.create(group);
exports.createGroup = createGroup;
const deleteGroup = (gid) => GroupModel_1.default.deleteOne({ _id: gid });
exports.deleteGroup = deleteGroup;
const addUserToGroup = (uid, gid) => GroupMembershipModel_1.default.create({ user: uid, group: gid });
exports.addUserToGroup = addUserToGroup;
const removeUserFromGroup = (uid, gid) => GroupMembershipModel_1.default.deleteOne({ user: uid, group: gid });
exports.removeUserFromGroup = removeUserFromGroup;
const findUsersInGroup = (gid) => GroupMembershipModel_1.default.find({ group: gid })
    .populate('user')
    .exec();
exports.findUsersInGroup = findUsersInGroup;
const findGroupsForUser = (uid) => GroupMembershipModel_1.default.find({ user: uid })
    .populate('group')
    .exec();
exports.findGroupsForUser = findGroupsForUser;
