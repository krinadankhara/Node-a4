"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = __importDefault(require("../mongoose/courses/CourseModel"));
const SectionDao_1 = __importDefault(require("./SectionDao"));
const mongoose_1 = __importDefault(require("mongoose"));
class CourseDao {
    constructor() {
        this.sectionDao = SectionDao_1.default.getInstance();
    }
    static getInstance() { return this.courseDao; }
    findAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.find();
        });
    }
    findCourseById(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.findById(cid);
        });
    }
    createCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.create(course);
        });
    }
    deleteCourse(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.deleteOne({ _id: cid });
        });
    }
    deleteCourseByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.deleteOne({ title: title });
        });
    }
    updateCourse(cid, course) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default.updateOne({ _id: cid }, { $set: course });
        });
    }
    findAllCoursesDeep() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default
                .find()
                .populate("sections")
                .exec();
        });
    }
    findCourseByIdDeep(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CourseModel_1.default
                .findById(cid)
                .populate("sections")
                .exec();
        });
    }
    addSectionToCourse(cid, sid) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = yield this.sectionDao.findSectionById(sid);
            yield this.sectionDao
                .updateSection(sid, Object.assign(Object.assign({}, section), { course: new mongoose_1.default.Types.ObjectId(cid) }));
            const course = yield this.findCourseById(cid);
            return CourseModel_1.default.updateOne({ _id: cid }, { $push: { sections: new mongoose_1.default.Types.ObjectId(sid) } });
            // course.sections.push(new mongoose.Types.ObjectId(sid));
            // return await this.updateCourse(cid, course);
        });
    }
    removeSectionFromCourse(cid, sid) {
        return Promise.resolve(undefined);
    }
}
exports.default = CourseDao;
CourseDao.courseDao = new CourseDao();
