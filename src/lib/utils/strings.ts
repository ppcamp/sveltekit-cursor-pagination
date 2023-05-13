export function capitalize(s: string): string {
	if (s.length <= 1) return s.toUpperCase();
	return s[0].toUpperCase() + s.substring(1);
}
