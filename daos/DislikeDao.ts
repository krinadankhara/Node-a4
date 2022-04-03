/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */

import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all dislike documents from dislikes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislikes are retrieved from the database
     */

    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> => {
        return DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    /**
     * Uses DislikeModel to retrieve all dislike documents from dislikes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when dislikes are retrieved from the database
     */

    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return DislikeModel.find({dislikedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        }).exec();
    }

    /**
     * Inserts dislike instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */

    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> => {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    /**
     * Removes dislike instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */

    userRemovesDislikeTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Retrieved a dislike instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is retrieved from the database
     */

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Count dislike instance for a tuit from the database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislikes are counted from the database
     */

    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
            DislikeModel.count({tuit: tid});


}
