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
const SectionModel_1 = __importDefault(require("../mongoose/sections/SectionModel"));
class SectionDao {
    constructor() { }
    static getInstance() {
        return this.instance;
    }
    createSectionForCourse(cid, section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.create(Object.assign(Object.assign({}, section), { course: cid }));
        });
    }
    deleteSection(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.remove({ _id: sid });
        });
    }
    findSectionById(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.findById(sid);
        });
    }
    findSectionByIdDeep(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default
                .findById(sid)
                .populate("course")
                .exec();
        });
    }
    findAllSections() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.find();
        });
    }
    findAllSectionsDeep() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default
                .find()
                .populate("course")
                .exec();
        });
    }
    findAllSectionsForCourse(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.find({ course: cid });
        });
    }
    findAllSectionsForCourseDeep(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default
                .find({ course: cid })
                .populate("course")
                .exec();
        });
    }
    updateSection(sid, section) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SectionModel_1.default.updateOne({ _id: sid }, { $set: section });
        });
    }
}
exports.default = SectionDao;
SectionDao.instance = new SectionDao();
