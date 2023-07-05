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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var client, db_1, students, _loop_1, index, studentsWithNoProjects, projects, index, student, timeindex, project, times_1, times_1_1, time, projects_2, _d, projects_1, projects_1_1, project, studentsInProject, path, e_1_1, e_2_1, error_1;
        var e_2, _e, _f;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 32, , 33]);
                    client = new mongodb_1.MongoClient("mongodb://sportfahrt:sportfahrt-klasse-10-datenbank-passwort-hochsicher-hoch-pi@127.0.0.1:27017/?authSource=admin");
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _g.sent();
                    db_1 = client.db("dolphinVOTE");
                    return [4 /*yield*/, db_1.collection("users").find({}).toArray()];
                case 2:
                    students = _g.sent();
                    students = shuffle(students);
                    _loop_1 = function (index) {
                        var student = students[index];
                        // check if student has voted
                        if (!student.votes) {
                            console.log("Student ".concat(student.name, " has no votes"));
                            return "continue";
                        }
                        else {
                            Object.keys(student.votes).forEach(function (voteTime) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    student.votes[voteTime].forEach(function (vote) { return __awaiter(_this, void 0, void 0, function () {
                                        var timeindex, project;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(Array.isArray(vote) && vote.length === 3)) return [3 /*break*/, 10];
                                                    timeindex = 0;
                                                    _a.label = 1;
                                                case 1:
                                                    if (!(timeindex < vote.length)) return [3 /*break*/, 9];
                                                    return [4 /*yield*/, db_1
                                                            .collection("projects")
                                                            .findOne({ _id: vote[timeindex] })];
                                                case 2:
                                                    project = _a.sent();
                                                    if (!project) return [3 /*break*/, 7];
                                                    if (!(project.free_slots > 0)) return [3 /*break*/, 6];
                                                    // add student to project
                                                    return [4 /*yield*/, db_1
                                                            .collection("projects")
                                                            .updateOne({ _id: project._id }, { $push: { students: student.name } })];
                                                case 3:
                                                    // add student to project
                                                    _a.sent();
                                                    // add project to student
                                                    return [4 /*yield*/, db_1
                                                            .collection("users")
                                                            .updateOne({ _id: student._id }, { $push: { projects: vote[timeindex] } })];
                                                case 4:
                                                    // add project to student
                                                    _a.sent();
                                                    // decrease free slots
                                                    return [4 /*yield*/, db_1
                                                            .collection("projects")
                                                            .updateOne({ _id: project._id }, { $inc: { free_slots: -1 } })];
                                                case 5:
                                                    // decrease free slots
                                                    _a.sent();
                                                    _a.label = 6;
                                                case 6: return [3 /*break*/, 8];
                                                case 7:
                                                    console.log("Project ".concat(vote[timeindex], " not found"));
                                                    _a.label = 8;
                                                case 8:
                                                    timeindex++;
                                                    return [3 /*break*/, 1];
                                                case 9: return [3 /*break*/, 11];
                                                case 10:
                                                    console.log("Student ".concat(student.name, " had no valid vote for ").concat(voteTime));
                                                    _a.label = 11;
                                                case 11: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                    };
                    for (index = 0; index < students.length; index++) {
                        _loop_1(index);
                    }
                    return [4 /*yield*/, db_1
                            .collection("users")
                            .find({ results: { $exists: false } })
                            .toArray()];
                case 3:
                    studentsWithNoProjects = _g.sent();
                    return [4 /*yield*/, db_1
                            .collection("projects")
                            .find({})
                            .sort({ free_slots: 1 })
                            .toArray()];
                case 4:
                    projects = _g.sent();
                    index = 0;
                    _g.label = 5;
                case 5:
                    if (!(index < studentsWithNoProjects.length)) return [3 /*break*/, 12];
                    student = studentsWithNoProjects[index];
                    timeindex = 0;
                    _g.label = 6;
                case 6:
                    if (!(timeindex < times.length)) return [3 /*break*/, 11];
                    project = projects[timeindex];
                    if (!(project.free_slots > 0)) return [3 /*break*/, 10];
                    // add student to project
                    return [4 /*yield*/, db_1
                            .collection("projects")
                            .updateOne({ _id: project._id }, { $push: { students: student.name } })];
                case 7:
                    // add student to project
                    _g.sent();
                    // add project to student
                    return [4 /*yield*/, db_1
                            .collection("users")
                            .updateOne({ _id: student._id }, { $push: { results: project._id } })];
                case 8:
                    // add project to student
                    _g.sent();
                    // decrease free slots
                    return [4 /*yield*/, db_1
                            .collection("projects")
                            .updateOne({ _id: project._id }, { $inc: { free_slots: -1 } })];
                case 9:
                    // decrease free slots
                    _g.sent();
                    return [3 /*break*/, 11];
                case 10:
                    timeindex++;
                    return [3 /*break*/, 6];
                case 11:
                    index++;
                    return [3 /*break*/, 5];
                case 12:
                    _g.trys.push([12, 29, 30, 31]);
                    times_1 = __values(times), times_1_1 = times_1.next();
                    _g.label = 13;
                case 13:
                    if (!!times_1_1.done) return [3 /*break*/, 28];
                    time = times_1_1.value;
                    return [4 /*yield*/, db_1.collection("projects").find({}).toArray()];
                case 14:
                    projects_2 = _g.sent();
                    _g.label = 15;
                case 15:
                    _g.trys.push([15, 21, 22, 27]);
                    _d = true, projects_1 = (e_1 = void 0, __asyncValues(projects_2));
                    _g.label = 16;
                case 16: return [4 /*yield*/, projects_1.next()];
                case 17:
                    if (!(projects_1_1 = _g.sent(), _a = projects_1_1.done, !_a)) return [3 /*break*/, 20];
                    _c = projects_1_1.value;
                    _d = false;
                    project = _c;
                    return [4 /*yield*/, db_1.collection("users").find((_f = {}, _f["results.[".concat(project.time, "]")] = project._id, _f)).toArray()];
                case 18:
                    studentsInProject = _g.sent();
                    path = "./results/".concat(project.time, "-").concat(project.name, ".txt");
                    if (!(0, fs_1.existsSync)('./results')) {
                        (0, fs_1.mkdirSync)("./results");
                    }
                    (0, fs_1.writeFileSync)(path, studentsInProject.map(function (student) { return student.name; }).join("\n"));
                    _g.label = 19;
                case 19:
                    _d = true;
                    return [3 /*break*/, 16];
                case 20: return [3 /*break*/, 27];
                case 21:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 27];
                case 22:
                    _g.trys.push([22, , 25, 26]);
                    if (!(!_d && !_a && (_b = projects_1.return))) return [3 /*break*/, 24];
                    return [4 /*yield*/, _b.call(projects_1)];
                case 23:
                    _g.sent();
                    _g.label = 24;
                case 24: return [3 /*break*/, 26];
                case 25:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 26: return [7 /*endfinally*/];
                case 27:
                    times_1_1 = times_1.next();
                    return [3 /*break*/, 13];
                case 28: return [3 /*break*/, 31];
                case 29:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 31];
                case 30:
                    try {
                        if (times_1_1 && !times_1_1.done && (_e = times_1.return)) _e.call(times_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 31:
                    console.log("Done");
                    return [3 /*break*/, 33];
                case 32:
                    error_1 = _g.sent();
                    console.error("An error occurred:", error_1);
                    return [3 /*break*/, 33];
                case 33: return [2 /*return*/];
            }
        });
    });
}
var times = [
    "Mi-Nachmittag",
    "Do-Vormittag",
    "Do-Nachmittag"
];
main();
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
        var aggregationPipeline, studentsWithProjectResult, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    aggregationPipeline = [
                        {
                            $match: {
                                projects: (_a = {},
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
                    error_2 = _b.sent();
                    console.error("Error occurred:", error_2);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
