"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewRelations = exports.InterviewTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schemaHelpers_1 = require("../schemaHelpers");
const jobInfo_1 = require("./jobInfo");
const drizzle_orm_1 = require("drizzle-orm");
exports.InterviewTable = (0, pg_core_1.pgTable)("interviews", {
    id: schemaHelpers_1.id,
    jobInfoId: (0, pg_core_1.uuid)()
        .references(() => jobInfo_1.JobInfoTable.id, { onDelete: "cascade" })
        .notNull(),
    duration: (0, pg_core_1.varchar)().notNull(),
    humeChatId: (0, pg_core_1.varchar)(),
    feedback: (0, pg_core_1.varchar)(),
    createdAt: schemaHelpers_1.createdAt,
    updatedAt: schemaHelpers_1.updatedAt,
});
exports.interviewRelations = (0, drizzle_orm_1.relations)(exports.InterviewTable, ({ one }) => ({
    jobInfo: one(jobInfo_1.JobInfoTable, {
        fields: [exports.InterviewTable.jobInfoId],
        references: [jobInfo_1.JobInfoTable.id],
    }),
}));
