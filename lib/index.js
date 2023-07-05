"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var fs_1 = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, students, _loop_1, index, studentsWithNoProjects, projects, index, student, timeindex, project, _loop_2, times_1, times_1_1, time, e_1_1;
        var e_1, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new mongodb_1.MongoClient("mongodb://sportfahrt:sportfahrt-klasse-10-datenbank-passwort-hochsicher-hoch-pi@127.0.0.1:27017/?authSource=admin");
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _b.sent();
                    db = client.db("dolphinVOTE");
                    return [4 /*yield*/, db.collection("users").find({}).toArray()];
                case 2:
                    students = _b.sent();
                    students = shuffle(students);
                    _loop_1 = function (index) {
                        var student = students[index];
                        // check if student has voted
                        if (!student.votes) {
                            return "continue";
                        }
                        else {
                            Object.keys(student.votes).forEach(function (voteTime) {
                                student.votes[voteTime].forEach(function (vote) { return __awaiter(_this, void 0, void 0, function () {
                                    var timeindex, project;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(vote.length === 3 && Array.isArray(vote))) return [3 /*break*/, 5];
                                                timeindex = 0;
                                                _a.label = 1;
                                            case 1:
                                                if (!(timeindex < vote.length)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, db.collection("projects").findOne({ _id: vote[timeindex] })];
                                            case 2:
                                                project = _a.sent();
                                                if (project) {
                                                    if (project.free_slots > 0) {
                                                        // add student to project
                                                        db.collection("projects").updateOne({ name: project.name }, { $push: { students: student.name } });
                                                        // add project to student
                                                        db.collection("users").updateOne({ name: student.name }, { $push: { projects: vote[timeindex] } });
                                                        // decrease free slots
                                                        db.collection("projects").updateOne({ name: vote }, { $inc: { freeSlots: -1 } });
                                                    }
                                                }
                                                else {
                                                    console.log("Project ".concat(vote[timeindex], " not found"));
                                                }
                                                _a.label = 3;
                                            case 3:
                                                timeindex++;
                                                return [3 /*break*/, 1];
                                            case 4: return [3 /*break*/, 6];
                                            case 5:
                                                console.log("Student ".concat(student.name, " had no valid vote for ").concat(voteTime));
                                                _a.label = 6;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            });
                        }
                    };
                    for (index = 0; index < students.length; index++) {
                        _loop_1(index);
                    }
                    return [4 /*yield*/, db.collection("users").find({ projects: { $exists: false } }).toArray()];
                case 3:
                    studentsWithNoProjects = _b.sent();
                    return [4 /*yield*/, db.collection("projects").find({}).toArray()];
                case 4:
                    projects = _b.sent();
                    projects = projects.sort(function (a, b) {
                        return a.free_slots - b.free_slots;
                    });
                    for (index = 0; index < studentsWithNoProjects.length; index++) {
                        student = studentsWithNoProjects[index];
                        for (timeindex = 0; timeindex < times.length; timeindex++) {
                            project = projects[timeindex];
                            if (project.free_slots > 0) {
                                // add student to project
                                db.collection("projects").updateOne({ name: project.name }, { $push: { students: student.name } });
                                // add project to student
                                db.collection("users").updateOne({ name: student.name }, { $push: { projects: project._id } });
                                // decrease free slots
                                db.collection("projects").updateOne({ name: project.name }, { $inc: { freeSlots: -1 } });
                                break;
                            }
                        }
                    }
                    _loop_2 = function (time) {
                        var _loop_3, index;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, getStudentsWithProjectResult(time, db.collection("projects"))];
                                case 1:
                                    projects = _c.sent();
                                    _loop_3 = function (index) {
                                        var project, voteted_students;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    project = projects[index];
                                                    // fs create folder if not exists
                                                    if (!(0, fs_1.existsSync)("./out/".concat(time))) {
                                                        (0, fs_1.mkdirSync)("./out/".concat(time));
                                                    }
                                                    return [4 /*yield*/, db.collection("users").find({ results: JSON.parse("{ \"".concat(time, "\": \"").concat(project._id, "\" }")) }).toArray()];
                                                case 1:
                                                    voteted_students = _d.sent();
                                                    console.log(voteted_students.length);
                                                    voteted_students.forEach(function (student) {
                                                        if (!(0, fs_1.existsSync)("./out/".concat(time, "/").concat(project.name, ".txt"))) {
                                                            (0, fs_1.writeFileSync)("./out/".concat(time, "/").concat(project.name, ".txt"), student.name + "\n");
                                                        }
                                                        else {
                                                            (0, fs_1.appendFileSync)("./out/".concat(time, "/").concat(project.name, ".txt"), student.name + "\n");
                                                        }
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    index = 0;
                                    _c.label = 2;
                                case 2:
                                    if (!(index < projects.length)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_3(index)];
                                case 3:
                                    _c.sent();
                                    _c.label = 4;
                                case 4:
                                    index++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 10, 11, 12]);
                    times_1 = __values(times), times_1_1 = times_1.next();
                    _b.label = 6;
                case 6:
                    if (!!times_1_1.done) return [3 /*break*/, 9];
                    time = times_1_1.value;
                    return [5 /*yield**/, _loop_2(time)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    times_1_1 = times_1.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (times_1_1 && !times_1_1.done && (_a = times_1.return)) _a.call(times_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 12:
                    console.log("Done");
                    return [2 /*return*/];
            }
        });
    });
}
main();
var times = [
    "Mi-Nachmittag",
    "Do-Vormittag",
    "Do-Nachmittag"
];
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function getStudentsWithProjectResult(time, collection) {
    return __awaiter(this, void 0, void 0, function () {
        var aggregationPipeline, studentsWithProjectResult, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    aggregationPipeline = [
                        {
                            $match: {
                                results: (_a = {},
                                    _a[time] = { $exists: true },
                                    _a),
                            },
                        },
                    ];
                    return [4 /*yield*/, collection.aggregate(aggregationPipeline).toArray()];
                case 1:
                    studentsWithProjectResult = _b.sent();
                    return [2 /*return*/, studentsWithProjectResult];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error occurred:", error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
