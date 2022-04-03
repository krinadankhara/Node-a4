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
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
class DislikeController {
    constructor() {
        this.findAllUsersThatDislikedTuit = (req, res) => DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then((dislikes) => res.json(dislikes));
        this.findAllTuitsDislikedByUser = (req, res) => {
            const uid = req.params.uid;
            // @ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
                    .then((dislikes) => {
                    const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                    const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                    res.json(tuitsFromDislikes);
                });
            }
            catch (e) {
                console.log(e);
            }
        };
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            // @ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                const userAlreadyLikedTuit = yield DislikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                const howManyLikedTuit = yield DislikeController.likeDao
                    .countHowManyLikedTuit(tid);
                const userAlreadyDislikedTuit = yield DislikeController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                const howManyDislikedTuit = yield DislikeController.dislikeDao
                    .countHowManyDislikedTuit(tid);
                let tuit = yield DislikeController.tuitDao.findTuitById(tid);
                if (userAlreadyDislikedTuit) {
                    yield DislikeController.dislikeDao.userRemovesDislikeTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                else {
                    yield DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                if (userAlreadyLikedTuit) {
                    yield DislikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                yield DislikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
exports.default = DislikeController;
DislikeController.likeDao = LikeDao_1.default.getInstance();
DislikeController.dislikeDao = DislikeDao_1.default.getInstance();
DislikeController.tuitDao = TuitDao_1.default.getInstance();
DislikeController.dislikeController = null;
DislikeController.getInstance = (app) => {
    if (DislikeController.dislikeController === null) {
        DislikeController.dislikeController = new DislikeController();
        app.get("/api/users/:uid/dislikes", DislikeController.dislikeController
            .findAllTuitsDislikedByUser);
        app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController
            .findAllUsersThatDislikedTuit);
        app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController
            .userTogglesTuitDislikes);
    }
    return DislikeController.dislikeController;
};
;
