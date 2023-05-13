import { readdirSync } from 'fs';
import { dirname } from 'path';
import type { PageLoad } from './$types';
import { fileURLToPath } from 'url';

export const ssr = true;

const dir = dirname(fileURLToPath(import.meta.url));
const links = readdirSync(dir, { withFileTypes: true })
	.filter((fd) => fd.isDirectory())
	.map((v) => v.name);

export const load: PageLoad = async () => {
	return {
		dirs: links
	};
};
