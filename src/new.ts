import parser from './mongo/parser';
import writer from './excel/writer';
import IUser, { VoteTime } from './types/user';
import {MongoClient, ObjectId} from 'mongodb';

async function main(time: string) {
    const client = new MongoClient("mongo://localhost:27017/");
    await client.connect();
    const db = client.db("dolphinVOTE");

    const { projects, votes } = await parser(db, {
        projectsCollection: "projects",
        votesCollection: "users",
    });

    // shuffle
    let students: Array<IUser> = votes;
    students = shuffle(students);

    students.forEach((student: IUser, sindex: number) => {
        let studentChoices: ObjectId[] = student.votes?[time]

        studentChoices.forEach((choice: ObjectId, cindex: number) => {

        });

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