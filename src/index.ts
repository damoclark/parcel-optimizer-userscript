/**
 * Source code written by AKP Tools (akp-tools@akpwebdesign.com)
 */
import ThrowableDiagnostic from "@parcel/diagnostic";
import {Optimizer} from '@parcel/plugin';
import {blobToString} from '@parcel/utils';
import {PackageJSON} from '@parcel/types';

import {promises as fs} from 'fs' ;
import * as path from 'path';

interface PluginOptions {
	userscriptMeta?: string;
	version?: string;
}

export default (new Optimizer<PluginOptions>({
	async loadConfig({config, options}) {
		const userConfig = await config.getConfig<PluginOptions>(
			['.userscriptrc', '.userscriptrc.js'],
			{packageKey: '@damoclarky/parcel-optimizer-userscript'}
		);

		const pkg = await config.getConfig<PackageJSON>(
			['package.json'],
			{packageKey: '@damoclarky/parcel-optimizer-userscript'}
		);

		if (userConfig) {
			let isJavascript = path.extname(userConfig.filePath) === '.js';
			if (isJavascript) {
				config.invalidateOnStartup();
			}
		}

		const contents = userConfig?.contents ?? {};

		Object.assign(contents, {version: pkg?.contents?.version ?? 'no-version'});

		return contents;
	},

	async optimize({config, contents, map}) {
		let code = await blobToString(contents);

		// if the userscriptMeta config exists, let's find and add it.
		try {
			if (config?.userscriptMeta) {
				const meta = (await fs.readFile(config.userscriptMeta)).toString('utf-8');
				const preparedMeta = meta.replace(/{{ version }}/g, config.version);

				code = `${preparedMeta}\n${code}`;
			} else {
				throw new ThrowableDiagnostic({
					diagnostic: {
						message: 'No userscript metadata path found!',
						hints: [
							"Make sure you create a .userscriptrc file and use it to specify your meta!",
						],
					},
				});
			}
		} catch {
			throw new ThrowableDiagnostic({
				diagnostic: {
					message: 'Specified userscript metadata path not found!',
					hints: [
						"Make sure the meta file specified in .userscriptrc exists!",
					],
				},
			});
		}

		return {contents: code, map}
	},
}));
