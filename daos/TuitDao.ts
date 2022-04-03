/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import Stats from "../models/tuits/Stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    findAllTuits = async (): Promise<Tuit[]> => {
        return TuitModel.find()
            .populate("postedBy");
    }

    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> => {
        return TuitModel.find({postedBy : uid})
            .populate("postedBy");
    }

    findTuitById = async (tid: string): Promise<any> => {
        return TuitModel.findById(tid)
            .populate("postedBy");
    }

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> => {
        return TuitModel.create({...tuit, postedBy: uid});
    }

    updateTuit = async (tid: string, tuit: Tuit):  Promise<any> => {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    updateLikes = async (tid: string, newStats: Stats): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});

    deleteTuit = async (tid: string): Promise<any> => {
            return TuitModel.deleteOne({_id: tid});
        }
}

