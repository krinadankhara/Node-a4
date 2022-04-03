
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import Dislike from "../models/dislikes/Dislike";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";


export default class DislikeController implements DislikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController
                    .findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController
                    .findAllUsersThatDislikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController
                    .userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {}


    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
                .then((dislikes: Dislike[]) => res.json(dislikes));


    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            DislikeController.dislikeDao.findAllTuitsDislikedByUser(userId)
                .then((dislikes: Dislike[]) => {
                    const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                    const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                    res.json(tuitsFromDislikes);
                });
        } catch (e) {
            console.log(e);
        }
    }


    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const userAlreadyLikedTuit = await DislikeController.likeDao
                        .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await DislikeController.likeDao
                        .countHowManyLikedTuit(tid);
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                        .findUserDislikesTuit(userId, tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                        .countHowManyDislikedTuit(tid);

            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userRemovesDislikeTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            } else {
                await DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            }

            if (userAlreadyLikedTuit) {
                await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            }
            await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};