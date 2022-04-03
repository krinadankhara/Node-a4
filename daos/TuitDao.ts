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

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */

    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> => {
        return TuitModel.find()
            .populate("postedBy");
    }

    /**
     * Uses TuitModel to retrieve all tuit document from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */

    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> => {
        return TuitModel.find({postedBy : uid})
            .populate("postedBy");
    }

    /**
     * Uses TuitModel to retrieve all tuit document from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */

    findTuitById = async (tid: string): Promise<any> => {
        return TuitModel.findById(tid)
            .populate("postedBy");
    }

    /**
     * Inserts tuit instance into the database
     * @param {string} uid Represents id of user
     * @param {string} tuit Represents id of tuit
     * @returns Promise To be notified when tuit is inserted into the database
     */

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> => {
        return TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Updates tuit in the database.
     * @param {string} uid Primary key of user
     * @param {Tuit} tuit Tuit object containing properties and their values
     * @returns Promise To be notified when tuit is updated in the database
     */

    updateTuit = async (tid: string, tuit: Tuit):  Promise<any> => {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Updates likes in the database.
     * @param {Tuit} tuit Tuit object containing properties and their values
     * @returns Promise To be notified when tuit is updated in the database
     */

    updateLikes = async (tid: string, newStats: Stats): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});


    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> => {
            return TuitModel.deleteOne({_id: tid});
        }
}

