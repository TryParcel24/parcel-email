import { watch, writeFileSync } from "fs";
import liveServer from "live-server";

liveServer.start({
  port: 8070,
  host: "0.0.0.0",
  root: "./dev",
  wait: 1000,
  logLevel: 2,
  open: false,
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watch("./src", async (event, filename) => {
  console.log(`${event}: ${filename ?? "?"}`);
  try {
    const generator = await import(`./src/index.js?_t=${Date.now()}`);
    const defaultValues = await import(
      `./src/defaultValues.js?_t=${Date.now()}`
    );

    writeFileSync(
      "./dev/genericEmail.html",
      generator.genericEmail(defaultValues.genericEmailDefaultValues)
    );
    writeFileSync(
      "./dev/localizedGenericEmail.html",
      generator.localizedGenericEmail(
        defaultValues.localizedGenericEmailDefaultValues
      )
    );
  } catch (err) {
    console.error(err);
  }
});
