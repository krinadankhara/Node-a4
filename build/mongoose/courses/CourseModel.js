"use strict";
/**
 * @file Implements mongoose model to CRUD
 * documents in the courses collection
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema_1 = __importDefault(require("./CourseSchema"));
const CourseModel = mongoose_1.default.model("CourseModel", CourseSchema_1.default);
exports.default = CourseModel;
