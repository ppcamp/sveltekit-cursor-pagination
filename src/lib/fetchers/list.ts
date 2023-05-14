import { doFetch } from './internal/client-fetch';
import type { GotApiItemList } from '$types/list';
import type { ServerEvent } from '$types/utils';
import type { Pagination } from '$types/pagination';

const list = async (p: Pagination, event?: ServerEvent) => {
	return await doFetch<GotApiItemList>('/api/list', event)
		.prepare((input) => {
			if (p.pageSize) input.searchParams.append('pageSize', `${p.pageSize}`);
			if (p.pageToken) input.searchParams.append('pageToken', `${p.pageToken}`);
			return input;
		})
		.do();
};

export default { list };
