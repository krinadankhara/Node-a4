"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/cs5500-test-123');
const SectionDao_1 = __importDefault(require("./SectionDao"));
const CourseDao_1 = __importDefault(require("./CourseDao"));
test('test course dao', () => {
});
const courseDao = CourseDao_1.default.getInstance();
const sectionDao = SectionDao_1.default.getInstance();
sectionDao.findAllSectionsDeep()
    .then(sections => console.log(sections));
// sectionDao.findAllSections()
//     .then(sections => console.log(sections));
// sectionDao.createSectionForCourse(
//     "61ec897218898f8a4c3ff7c8",
//     {name: 'section 01'})
// .then(section => console.log(section));
