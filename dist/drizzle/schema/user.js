"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.UserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schemaHelpers_1 = require("../schemaHelpers");
const drizzle_orm_1 = require("drizzle-orm");
const jobInfo_1 = require("./jobInfo");
exports.UserTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)().primaryKey(),
    name: (0, pg_core_1.varchar)().notNull(),
    email: (0, pg_core_1.varchar)().notNull().unique(),
    imageUrl: (0, pg_core_1.varchar)().notNull(),
    createdAt: schemaHelpers_1.createdAt,
    updatedAt: schemaHelpers_1.updatedAt,
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.UserTable, ({ many }) => ({
    jobInfos: many(jobInfo_1.JobInfoTable),
}));
