/**
 * Calculates the Luhn check digit for a given payload (number without check digit).
 * @param payload - The string of digits to calculate the checksum for.
 * @returns The check digit (0-9).
 */
function getCheckDigit(payload: string): number {
	let sum = 0;
	let shouldDouble = true; // We process from right to left, starting with the digit immediately left of the check digit

	// Loop backwards through the payload
	for (let i = payload.length - 1; i >= 0; i--) {
		let digit = parseInt(payload.charAt(i), 10);

		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	return (10 - (sum % 10)) % 10;
}

/**
 * Generates a valid Credit Card number using the Luhn algorithm based on a pattern.
 * Validates against the input pattern:
 * - Digits are preserved.
 * - Non-digits (like 'x') are replaced with random digits.
 * - The final digit is always recalculated as the Luhn check digit.
 * * @param pattern - The BIN or pattern (e.g. "456789xxxxxxxxxx")
 * @param length - Total length of the card (default 16)
 */
export function generateLuhnCard(pattern: string, length: number = 16): string {
	let payload = "";

	// Build the payload (digits 0 to length-2)
	for (let i = 0; i < length - 1; i++) {
		const char = pattern[i];
		if (char && /[0-9]/.test(char)) {
			// Keep existing digit
			payload += char;
		} else {
			// Generate random digit for 'x' or missing chars
			payload += Math.floor(Math.random() * 10).toString();
		}
	}

	// Calculate and append the Check Digit
	const checkDigit = getCheckDigit(payload);
	return payload + checkDigit;
}

/**
 * Generates multiple unique valid cards.
 */
export function generateMultipleCards(pattern: string, count: number = 10): string[] {
	const cards: string[] = [];
	for (let i = 0; i < count; i++) {
		cards.push(generateLuhnCard(pattern));
	}
	return cards;
}
