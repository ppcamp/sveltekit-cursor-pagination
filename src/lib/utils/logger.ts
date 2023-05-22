interface ILogger {
	d: (...args: any) => void;
	e: (err: Error, ...args: any) => void;
	i: (...args: any) => void;
	l: (...args: any) => void;
}

export const logger = {
	d: (...args) => console.debug(new Date().toDateString(), ' - ', ...args),
	e: (err, ...args) => console.error(new Date().toDateString(), ' - ', 'err:', err, ...args),
	i: (...args) => console.info(new Date().toDateString(), ' - ', ...args),
	l: (...args) => console.log(new Date().toDateString(), ' - ', ...args)
} satisfies ILogger;
