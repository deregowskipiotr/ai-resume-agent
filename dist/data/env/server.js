var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";
export const env = createEnv({
    server: {
        DB_PASSWORD: z.string().min(1),
        DB_HOST: z.string().min(1),
        DB_PORT: z.string().min(1),
        DB_USER: z.string().min(1),
        DB_NAME: z.string().min(1),
        ARCJET_KEY: z.string().min(1),
        CLERK_SECRET_KEY: z.string().min(1),
        HUME_API_KEY: z.string().min(1),
        HUME_SECRET_KEY: z.string().min(1),
        GEMINI_API_KEY: z.string().min(1),
    },
    createFinalSchema: (env) => {
        return z.object(env).transform((val) => {
            const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = val, rest = __rest(val, ["DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT", "DB_USER"]);
            return Object.assign(Object.assign({}, rest), { DATABASE_URL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` });
        });
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env,
});
