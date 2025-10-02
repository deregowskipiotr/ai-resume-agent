"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// manualInsertUser.ts
const db_1 = require("../features/users/db");
async function manualInsert() {
    const testUser = {
        id: "user_33Vm1w84OsXboi6KGFJbZpiC2Oa",
        name: "Test User",
        email: "test@example.com",
        imageUrl: "https://example.com/default-avatar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    try {
        await (0, db_1.upsertUser)(testUser);
        console.log("Manually inserted test user:", testUser.id);
    }
    catch (error) {
        console.error("Error inserting test user:", error);
    }
}
manualInsert();
