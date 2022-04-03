"use strict";
/**
 * @file Implements mongoose schema for courses
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef Course Represents online courses
 * @property {string} title The course's title
 * @property {number} credits How many credits
 * @property {string} syllabus Course's syllabus
 * @property {ObjectId[]} sections Array of Section IDs
 */
const CourseSchema = new mongoose_1.default.Schema({
    title: String,
    credits: Number,
    syllabus: String,
    sections: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "SectionModel"
        }]
}, { collection: "courses" });
exports.default = CourseSchema;
