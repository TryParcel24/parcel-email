import { watch, writeFileSync } from "fs";
import liveServer from "live-server";
import path from "path";

import decache from "decache";

// let generator = require("./index");

const server = async () =>
  liveServer.start({
    port: 8070,
    host: "0.0.0.0",
    root: "./dev",
    wait: 1000,
    logLevel: 2,
    open: false,
  });

server();

const watcher = async () => {
  watch("./src", (event, filename) => {
    console.log(`${event}: ${filename}`);
    decache("./index");
    decache("./defaultValues");
    try {
      const generator = require("./index");
      const defaultValues = require("./defaultValues");
      writeFileSync(
        "./dev/genericEmail.html",
        generator.genericEmail(defaultValues.genericEmailDefaultValues)
      );
    } catch (err) {
      console.error(err);
    }
  });
};

watcher();
