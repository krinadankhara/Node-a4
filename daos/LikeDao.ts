/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        }).exec();
    }
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.create({tuit: tid, likedBy: uid});
    }
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}