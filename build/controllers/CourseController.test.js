"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseController_1 = __importDefault(require("../controllers/CourseController"));
const CourseDao_1 = __importDefault(require("../daos/CourseDao"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const courseController = new CourseController_1.default(app);
const courseDao = CourseDao_1.default.getInstance();
describe('findAllCourses Controller', () => {
    jest.mock('axios');
    test('findAllCourses Controller', () => {
        const courseResponse = [
            { title: 'cs5500' },
            { title: 'cs5610' },
        ];
        // axios.get.mockResolvedValue(courseResponse);
        //
        // return courseController.findAllCourses().then(data => expect(data).toEqual(users));
    });
});
