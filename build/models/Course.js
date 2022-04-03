"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor() {
        // private title: string = '';
        // private syllabus: string = '';
        // private credits: number = 0;
        // private sections: Types.ObjectId[] = [];
        //
        // public setTitle(title: string) : void {
        //     this.title = title;
        // }
        // public getTitle() : string {
        //     return this.title;
        // }
        this._title = '';
        this._syllabus = '';
        this._credits = 0;
        this._sections = [];
    }
    get sections() {
        return this._sections;
    }
    set sections(value) {
        this._sections = value;
    }
    get credits() {
        return this._credits;
    }
    set credits(value) {
        this._credits = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get syllabus() {
        return this._syllabus;
    }
    set syllabus(value) {
        this._syllabus = value;
    }
}
exports.default = Course;
