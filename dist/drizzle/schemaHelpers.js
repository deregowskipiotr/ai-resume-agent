"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedAt = exports.createdAt = exports.id = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.id = (0, pg_core_1.uuid)().primaryKey().defaultRandom();
exports.createdAt = (0, pg_core_1.timestamp)({ withTimezone: true }).notNull().defaultNow();
exports.updatedAt = (0, pg_core_1.timestamp)({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date());
