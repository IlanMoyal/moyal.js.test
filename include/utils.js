import { dirname, resolve } from 'path';
import fs from 'fs';
import path from 'path';
import { dir } from 'console';

export default class {
	getRootDirectory(currentUrl, level) {
		let current =fileURLToPath(currentUrl);
		if(level != null && level >= 0) {
			const dir = dirname(current);
			return resolve(dir, "../".repeat(level).slice(0, -1));
		}
		else{
			const dir = dirname(fileURLToPath(currentUrl));
			while(dir != currentUrl) {
				const temp = path.join(dir, 'project.settings.js');
				const hasRootedFile = fs.existsSync(temp);
				if(hasRootedFile)
					return temp;
				
				currentUrl = dir;
				dir = dirname(currentUrl);
			}

		}
	}
}