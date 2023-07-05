import writer from './excel/writer';
import IUser, { VoteTime } from './types/user';
import {MongoClient} from 'mongodb';

async function main() {
    const client = new MongoClient("mongo://localhost:27017/");
    await client.connect();
    const db = client.db("dolphinVOTE");

    // shuffle
    let students: IUser[] = await db.collection<IUser>("users").find({}).toArray();
    students = shuffle(students);

    students.forEach((student: IUser, index: number) => {
        
    });
}

const times: VoteTime[] = [
    "Mi-Nachmittag",
    "Do-Vormittag",
    "Do-Nachmittag"
]

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
