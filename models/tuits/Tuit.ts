/**
 * @file Implements model to represent tuits.
 */
import User from "../users/User";
import Stats from "./Stats";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats: Stats
};