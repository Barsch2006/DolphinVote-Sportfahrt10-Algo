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
        student.votes?[time].forEach((choice: ObjectId) => {
        
        });

        if (!student.result[time]) {
            
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
