import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */

export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit (tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
    userRemovesDislikeTuit (tid: string, uid: string): Promise<any>;
    findUserDislikesTuit (uid: string, tid: string): Promise<any>;
    countHowManyDislikedTuit (tid: string): Promise<any>;
};
