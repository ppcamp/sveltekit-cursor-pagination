import type { LoadEvent } from '@sveltejs/kit';
export type ServerEvent = Pick<LoadEvent, 'fetch' | 'url'>;
