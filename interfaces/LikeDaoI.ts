import Like from "../models/likes/like";


export default interface LikeDaoI {
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    userLikesTuit (tid: string, uid: string): Promise<Like>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
    findUserLikesTuit (uid: string, tid: string): Promise<any>;
    countHowManyLikedTuit (tid: string): Promise<any>;
};
