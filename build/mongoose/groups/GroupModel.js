"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GroupSchema_1 = __importDefault(require("./GroupSchema"));
const GroupModel = mongoose_1.default.model('GroupModel', GroupSchema_1.default);
exports.default = GroupModel;
