import IProject from './types/project';
import IUser, { VoteTime } from './types/user';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

async function main() {
    try {
        const client = new MongoClient(
            "mongodb://sportfahrt:sportfahrt-klasse-10-datenbank-passwort-hochsicher-hoch-pi@127.0.0.1:27017/?authSource=admin"
        );
        await client.connect();
        const db = client.db("dolphinVOTE");

        // shuffle
        let students: IUser[] = await db.collection<IUser>("users").find({}).toArray();
        students = shuffle(students);

        for (let index: number = 0; index < students.length; index++) {
            let student: IUser = students[index];
            // check if student has voted
            if (!student.votes) {
                console.log(`Student ${student.name} has no votes`);
                continue;
            } else {
                Object.keys(student.votes).forEach(async (voteTime: string) => {
                    student.votes![voteTime].forEach(async (vote: ObjectId[]) => {
                        // check if vote has 3 choices and is a string[]
                        if (Array.isArray(vote) && vote.length === 3) {
                            for (let timeindex: number = 0; timeindex < vote.length; timeindex++) {
                                // find the project in the database
                                let project: IProject | null = await db
                                    .collection<IProject>("projects")
                                    .findOne({ _id: vote[timeindex] });
                                if (project) {
                                    if (project.free_slots > 0) {
                                        // add student to project
                                        await db
                                            .collection("projects")
                                            .updateOne(
                                                { _id: project._id },
                                                { $push: { students: student.name } }
                                            );
                                        // add project to student
                                        await db
                                            .collection("users")
                                            .updateOne(
                                                { _id: student._id },
                                                { $push: { projects: vote[timeindex] } }
                                            );
                                        // decrease free slots
                                        await db
                                            .collection("projects")
                                            .updateOne(
                                                { _id: project._id },
                                                { $inc: { free_slots: -1 } }
                                            );
                                    }
                                } else {
                                    console.log(`Project ${vote[timeindex]} not found`);
                                }
                            }
                        } else {
                            console.log(
                                `Student ${student.name} had no valid vote for ${voteTime}`
                            );
                        }
                    });
                });
            }
        }

        // get all students with no projects
        let studentsWithNoProjects: IUser[] = await db
            .collection<IUser>("users")
            .find({ results: { $exists: false } })
            .toArray();

        // put them in the projects with the most free slots
        let projects: IProject[] = await db
            .collection<IProject>("projects")
            .find({})
            .sort({ free_slots: 1 })
            .toArray();

        for (let index: number = 0; index < studentsWithNoProjects.length; index++) {
            let student: IUser = studentsWithNoProjects[index];
            for (let timeindex: number = 0; timeindex < times.length; timeindex++) {
                let project = projects[timeindex];
                if (project.free_slots > 0) {
                    // add student to project
                    await db
                        .collection("projects")
                        .updateOne(
                            { _id: project._id },
                            { $push: { students: student.name } }
                        );
                    // add project to student
                    await db
                        .collection("users")
                        .updateOne(
                            { _id: student._id },
                            { $push: { results: project._id } }
                        );
                    // decrease free slots
                    await db
                        .collection("projects")
                        .updateOne(
                            { _id: project._id },
                            { $inc: { free_slots: -1 } }
                        );
                    break;
                }
            }
        }

        for (let time of times) {
            projects = await getStudentsWithProjectResult(
                time,
                db.collection("projects")
            );

            console.log(students)

            // write a xlsx file with the results
            // add a sheet for each project and write the students name in it
            for (let index: number = 0; index < projects.length; index++) {
                let project: IProject = projects[index];
                // fs create folder if not exists
                if (!existsSync(`./out/${time}/`)) {
                    mkdirSync(`./out/${time}`);
                }
                let voted_students = await db
                    .collection<IUser>("users")
                    .find({ projects: { [time]: project._id } })
                    .toArray();
                console.log(voted_students.length);
                voted_students.forEach((student: IUser) => {
                    if (!existsSync(`./out/${time}/${project.name}.txt`)) {
                        writeFileSync(`./out/${time}/${project.name}.txt`, student.name + "\n");
                    } else {
                        appendFileSync(
                            `./out/${time}/${project.name}.txt`,
                            student.name + "\n"
                        );
                    }
                });
            }
        }

        console.log("Done");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();


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

async function getStudentsWithProjectResult(time, collection: Collection) {
    try {
        const aggregationPipeline = [
            {
                $match: {
                    projects: {
                        [time]: { $exists: true },
                    },
                },
            },
        ];

        const studentsWithProjectResult = await collection.aggregate(aggregationPipeline).toArray() as IProject[];

        return studentsWithProjectResult;
    } catch (error) {
        console.error("Error occurred:", error);
        return [];
    }
}
