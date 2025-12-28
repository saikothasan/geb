export function extractBin(input: string): string | null {
	const match = input.match(/(\d{6,16})/);
	if (!match) return null;
	const bin = match[1];
	// Pad short BINs with 'x' to length 16 for consistency in UI, if desired
	// or just return the raw 6 digits if that's what the API needs.
	// Based on original code:
	return bin.length === 6 ? bin.padEnd(16, 'x') : bin;
}
