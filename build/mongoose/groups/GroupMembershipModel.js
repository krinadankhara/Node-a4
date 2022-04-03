"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GroupMembershipSchema_1 = __importDefault(require("./GroupMembershipSchema"));
const GroupMembershipModel = mongoose_1.default.model('GroupMembershipModel', GroupMembershipSchema_1.default);
exports.default = GroupMembershipModel;
