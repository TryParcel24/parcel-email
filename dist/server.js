"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const live_server_1 = __importDefault(require("live-server"));
const decache_1 = __importDefault(require("decache"));
// let generator = require("./index");
const server = async () => live_server_1.default.start({
    port: 8070,
    host: "0.0.0.0",
    root: "./dev",
    wait: 1000,
    logLevel: 2,
    open: false,
});
server();
const watcher = async () => {
    (0, fs_1.watch)("./src", (event, filename) => {
        console.log(`${event}: ${filename}`);
        (0, decache_1.default)("./index");
        (0, decache_1.default)("./defaultValues");
        try {
            const generator = require("./index");
            const defaultValues = require("./defaultValues");
            (0, fs_1.writeFileSync)("./dev/genericEmail.html", generator.genericEmail(defaultValues.genericEmailDefaultValues));
        }
        catch (err) {
            console.error(err);
        }
    });
};
watcher();
//# sourceMappingURL=server.js.map