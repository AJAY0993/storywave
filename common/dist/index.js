"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Please provide a valid email" }),
    password: zod_1.z
        .string({ required_error: "Please provide password" })
        .min(8, { message: "Password Must be 8 chracters long" })
        .max(20, { message: "Password must not be more than 20 chracters" }),
    about: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Please provide a valid email" }),
    password: zod_1.z
        .string({ required_error: "Please provide password" })
        .min(8, { message: "Password Must be 8 chracters long" })
        .max(20, { message: "Password must not be more than 20 chracters" })
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Please provide title for the blog" }),
    content: zod_1.z
        .string({
        required_error: "Please provide content of the blog"
    })
        .min(10, "Blog is too short"),
    published: zod_1.z.boolean().optional()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Please provide title for the blog" })
        .optional(),
    content: zod_1.z
        .string({
        required_error: "Please provide content of the blog"
    })
        .min(10, "Blog is too short")
        .optional(),
    published: zod_1.z.boolean().optional()
});
