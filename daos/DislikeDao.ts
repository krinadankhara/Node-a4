import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}


    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> => {
        return DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return DislikeModel.find({dislikedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        }).exec();
    }

    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> => {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    userRemovesDislikeTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});


}