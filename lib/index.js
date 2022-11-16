var $6YcZ0$parceldiagnostic = require("@parcel/diagnostic");
var $6YcZ0$parcelplugin = require("@parcel/plugin");
var $6YcZ0$parcelutils = require("@parcel/utils");
var $6YcZ0$fs = require("fs");
var $6YcZ0$path = require("path");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $89bb7b0170494427$export$2e2bcd8739ae039);





var $89bb7b0170494427$export$2e2bcd8739ae039 = new (0, $6YcZ0$parcelplugin.Optimizer)({
    async loadConfig ({ config: config , options: options  }) {
        const userConfig = await config.getConfig([
            ".userscriptrc",
            ".userscriptrc.js"
        ], {
            packageKey: "@damoclarky/parcel-optimizer-userscript"
        });
        const pkg = await config.getConfig([
            "package.json"
        ], {
            packageKey: "@damoclarky/parcel-optimizer-userscript"
        });
        if (userConfig) {
            let isJavascript = $6YcZ0$path.extname(userConfig.filePath) === ".js";
            if (isJavascript) config.invalidateOnStartup();
        }
        const contents = userConfig?.contents ?? {};
        Object.assign(contents, {
            version: pkg?.contents?.version ?? "no-version"
        });
        return contents;
    },
    async optimize ({ config: config , contents: contents , map: map  }) {
        let code = await (0, $6YcZ0$parcelutils.blobToString)(contents);
        // if the userscriptMeta config exists, let's find and add it.
        try {
            if (config?.userscriptMeta) {
                const meta = (await (0, $6YcZ0$fs.promises).readFile(config.userscriptMeta)).toString("utf-8");
                const preparedMeta = meta.replace(/{{ version }}/g, config.version);
                code = `${preparedMeta}\n${code}`;
            } else throw new (0, ($parcel$interopDefault($6YcZ0$parceldiagnostic)))({
                diagnostic: {
                    message: "No userscript metadata path found!",
                    hints: [
                        "Make sure you create a .userscriptrc file and use it to specify your meta!", 
                    ]
                }
            });
        } catch  {
            throw new (0, ($parcel$interopDefault($6YcZ0$parceldiagnostic)))({
                diagnostic: {
                    message: "Specified userscript metadata path not found!",
                    hints: [
                        "Make sure the meta file specified in .userscriptrc exists!", 
                    ]
                }
            });
        }
        return {
            contents: code,
            map: map
        };
    }
});


//# sourceMappingURL=index.js.map
