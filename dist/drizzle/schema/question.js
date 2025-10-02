"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsRelations = exports.QuestionTable = exports.questionDifficultyEnum = exports.questionDifficulties = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schemaHelpers_1 = require("../schemaHelpers");
const drizzle_orm_1 = require("drizzle-orm");
const jobInfo_1 = require("./jobInfo");
exports.questionDifficulties = ["easy", "medium", "hard"];
exports.questionDifficultyEnum = (0, pg_core_1.pgEnum)("questions_question_difficulty", exports.questionDifficulties);
exports.QuestionTable = (0, pg_core_1.pgTable)("questions", {
    id: schemaHelpers_1.id,
    jobInfoId: (0, pg_core_1.uuid)()
        .references(() => jobInfo_1.JobInfoTable.id, { onDelete: "cascade" })
        .notNull(),
    text: (0, pg_core_1.varchar)().notNull(),
    difficulty: (0, exports.questionDifficultyEnum)().notNull(),
    createdAt: schemaHelpers_1.createdAt,
    updatedAt: schemaHelpers_1.updatedAt,
});
exports.questionsRelations = (0, drizzle_orm_1.relations)(exports.QuestionTable, ({ one }) => ({
    jobInfo: one(jobInfo_1.JobInfoTable, {
        fields: [exports.QuestionTable.jobInfoId],
        references: [jobInfo_1.JobInfoTable.id]
    })
}));
