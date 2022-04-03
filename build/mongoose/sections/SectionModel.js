"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SectionSchema_1 = __importDefault(require("./SectionSchema"));
const SectionModel = mongoose_1.default.model("SectionModel", SectionSchema_1.default);
exports.default = SectionModel;
