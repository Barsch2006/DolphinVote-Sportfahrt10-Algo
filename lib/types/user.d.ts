import { ObjectId } from "mongodb";
export type VoteTime = "Mi-Nachmittag" | "Do-Vormittag" | "Do-Nachmittag";
export default interface User {
    _id: ObjectId;
    code: string;
    name: string;
    device?: string;
    votes?: {
        [key in VoteTime]?: ObjectId[];
    };
    results?: {
        [key in VoteTime]?: ObjectId;
    };
}
