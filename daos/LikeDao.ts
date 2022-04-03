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

    /**
     * Uses LikeModel to retrieve all user documents from likes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }

    /**
     * Uses LikeModel to retrieve all tuits documents from likes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        }).exec();
    }

    /**
     * Inserts like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.create({tuit: tid, likedBy: uid});
    }

    /**
     * Removes like instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }

    /**
     * Retrieved a like instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is retrieved from the database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    /**
     * Count like instance for a tuit from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the likes count retrieved from the database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}