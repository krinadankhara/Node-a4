"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GroupMembershipSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    group: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'GroupModel' },
    addedToGroupOn: { type: Date, default: Date.now },
}, { collection: 'groups' });
exports.default = GroupMembershipSchema;
