"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoleSchema = new mongoose_1.default.Schema({
    role: { type: String, enum: ['ADMIN', 'USER', 'FACULTY', 'STUDENT'] },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: "roles" });
exports.default = RoleSchema;
