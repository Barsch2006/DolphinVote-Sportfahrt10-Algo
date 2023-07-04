import writer from './excel/writer';
import IUser, { VoteTime } from './types/user';
import {MongoClient, ObjectId} from 'mongodb';

async function main(time: string) {
    const client = new MongoClient("mongo://localhost:27017/");
    await client.connect();
    const db = client.db("dolphinVOTE");

    // shuffle
    let students: Array<IUser> = db.collection<IUser>("users").find({});
    students = shuffle(students);

    students.forEach((student: IUser, sindex: number) => {
       //! needs to be a for loop Not for Each
        student.votes?[time].forEach((choice: ObjectId) => {
        // get the project of the choice.
        // check if free
            // free --
            // student add project Id
        });

        if (!student.result[time]) {
            db.collection<IProject>("projects").find({})
            // todo find online Projects with free Planes
            // add the user
        }
    });
}

const times: VoteTime[] = [
    "Mi-Vormittag",
    "Mi-Nachmittag",
    "Do-Vormittag",
    "Do-Nachmittag"
]

times.forEach(async (time: VoteTime) => {
    await main(time);
});

function shuffle(a: Array<any>) {
    var j: any, x: any, i: any;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
