"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobInfoRelations = exports.JobInfoTable = exports.experienceLevelEnum = exports.experienceLevels = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schemaHelpers_1 = require("../schemaHelpers");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
const question_1 = require("./question");
const interview_1 = require("./interview");
exports.experienceLevels = ["junior", "mid-level", "senior"];
exports.experienceLevelEnum = (0, pg_core_1.pgEnum)("job_infos_experience_level", exports.experienceLevels);
exports.JobInfoTable = (0, pg_core_1.pgTable)("job_info", {
    id: schemaHelpers_1.id,
    title: (0, pg_core_1.varchar)(),
    name: (0, pg_core_1.varchar)().notNull(),
    experienceLevel: (0, exports.experienceLevelEnum)().notNull(),
    description: (0, pg_core_1.varchar)().notNull(),
    userId: (0, pg_core_1.varchar)()
        .references(() => user_1.UserTable.id, { onDelete: "cascade" })
        .notNull(),
    createdAt: schemaHelpers_1.createdAt,
    updatedAt: schemaHelpers_1.updatedAt,
});
exports.jobInfoRelations = (0, drizzle_orm_1.relations)(exports.JobInfoTable, ({ one, many }) => ({
    user: one(user_1.UserTable, {
        fields: [exports.JobInfoTable.userId],
        references: [user_1.UserTable.id]
    }),
    questions: many(question_1.QuestionTable),
    interviews: many(interview_1.InterviewTable),
}));
