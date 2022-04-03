"use strict";
/**
 * @file CourseController
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseDao_1 = __importDefault(require("../daos/CourseDao"));
/**
 * @class
 */
class CourseController {
    /**
     * @constructor
     * @param {Express} app Express instance to declare HTTP endpoints
     */
    constructor(app) {
        this.courseDao = CourseDao_1.default.getInstance();
        /**
         * Responds to request for all courses
         * @param {Request} req Responds to request URL /courses
         * @param {Response} res Used to respond with array of courses
         */
        this.findAllCourses = (req, res) => this.courseDao.findAllCourses()
            .then(courses => res.json(courses));
        /**
         * Responds to request for single course instance whose primary key is req.params.cid
         * encoded in URL pattern /courses/:cid
         * @param {Request} req Request for pattern URL /courses/:cid where cid is the primary key of the course we're looking for
         * @param {Response} res Responds with JSON representation of course whose primary key is cid
         */
        this.findCourseById = (req, res) => this.courseDao.findCourseById(req.params.cid)
            .then(course => res.json(course));
        this.findAllCoursesDeep = (req, res) => this.courseDao.findAllCoursesDeep()
            .then(courses => res.json(courses));
        this.findCourseByIdDeep = (req, res) => this.courseDao.findCourseByIdDeep(req.params.cid)
            .then(course => res.json(course));
        this.createCourse = (req, res) => this.courseDao.createCourse(req.body)
            .then(course => res.json(course));
        this.updateCourse = (req, res) => this.courseDao.updateCourse(req.params.cid, req.body)
            .then(status => res.send(status));
        this.deleteCourse = (req, res) => this.courseDao.deleteCourse(req.params.cid)
            .then(status => res.send(status));
        this.addSectionToCourse = (req, res) => this.courseDao
            .addSectionToCourse(req.params.cid, req.params.sid)
            .then(status => res.send(status));
        this.removeSectionFromCourse = (req, res) => this.courseDao
            .removeSectionFromCourse(req.params.cid, req.params.sid)
            .then(status => res.send(status));
        app.get("/courses", this.findAllCourses);
        app.get("/courses/:cid", this.findCourseById);
        app.post("/courses", this.createCourse);
        app.put("/courses/:cid", this.updateCourse);
        app.delete("/courses/:cid", this.deleteCourse);
        app.post("/courses/:cid/section/:sid", this.addSectionToCourse);
        app.delete("/courses/:cid/section/:sid", this.removeSectionFromCourse);
    }
}
exports.default = CourseController;
