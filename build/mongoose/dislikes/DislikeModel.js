"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the dislikes collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const DislikeSchema_1 = __importDefault(require("./DislikeSchema"));
const DislikeModel = mongoose_1.default.model("DislikeModel", DislikeSchema_1.default);
exports.default = DislikeModel;
