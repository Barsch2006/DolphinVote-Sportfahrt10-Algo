import { ObjectId } from "mongodb";
import { VoteTime } from "./user";
export default interface IProject {
    _id: ObjectId;
    name: string;
    free_slots: number;
    time: VoteTime;
}
