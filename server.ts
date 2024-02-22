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
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const generator: typeof import("./src/index.js") = await import(
      `./src/index.js?_t=${Date.now()}`
    );
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const defaultValues: typeof import("./src/defaultValues.js") = await import(
      `./src/defaultValues.js?_t=${Date.now()}`
    );

    writeFileSync(
      "./dev/genericEmail.html",
      generator.genericEmail(defaultValues.genericEmailDefaultValues),
    );
    writeFileSync(
      "./dev/localizedGenericEmail.html",
      generator.localizedGenericEmail(
        //
        defaultValues.localizedGenericEmailDefaultValues,
      ),
    );

    // v3
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const generator3: typeof import("./src/v3/index.js") = await import(
      `./src/v3/index.js?_t=${Date.now()}`
    );

    const parcelEmailGenerator = new generator3.GenericEmailGenerator({
      colors: {
        primary: defaultValues.defaultValues.colors.primary,
        secondary: defaultValues.defaultValues.colors.secondary,
        actionsFontColor: defaultValues.defaultValues.colors.actionsFontColor,
        contentBackground: defaultValues.defaultValues.colors.contentBackground,
        footerBackground: defaultValues.defaultValues.colors.footerBackground,
      },
      logo: {
        image: defaultValues.defaultValues.logo.image,
        href: defaultValues.defaultValues.logo.href,
      },
      socials: defaultValues.defaultValues.socials,
      address: "abcd",
      fonts: defaultValues.defaultValues.fonts,
    });

    writeFileSync(
      "./dev/v3.localizedGenericEmail.html",
      parcelEmailGenerator.render(
        defaultValues.localizedGenericEmailDefaultValues,
      ),
    );
  } catch (err) {
    console.error(err);
  }
});
