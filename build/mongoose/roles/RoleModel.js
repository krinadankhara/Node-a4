"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoleSchema_1 = __importDefault(require("./RoleSchema"));
const RoleModel = mongoose_1.default.model("RoleModel", RoleSchema_1.default);
exports.default = RoleModel;
