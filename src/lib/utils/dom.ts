export const cssMap = (old: string, current: string) => {
	return !current.length ? old : old + ' ' + current.length;
};
