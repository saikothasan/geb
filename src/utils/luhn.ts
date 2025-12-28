/**
 * Calculates the Luhn check digit for a given payload (number without check digit).
 * @param payload - The string of digits to calculate the checksum for.
 * @returns The check digit (0-9).
 */
function getCheckDigit(payload: string): number {
	let sum = 0;
	let shouldDouble = true; // Process from right to left

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
 * Generates a valid Luhn number based on a pattern.
 */
export function generateLuhnCard(pattern: string, length: number = 16): string {
    // 1. Clean pattern: allow digits and 'x'
    let cleanPattern = pattern.replace(/[^0-9x]/gi, "");
    
    // 2. Pad with 'x' if short
    if (cleanPattern.length < length) {
        cleanPattern = cleanPattern.padEnd(length, 'x');
    }
    
	let payload = "";
	// Build the payload (digits 0 to length-2)
	for (let i = 0; i < length - 1; i++) {
		const char = cleanPattern[i];
		if (char && /[0-9]/.test(char)) {
			// Keep existing digit
			payload += char;
		} else {
			// Generate random digit for 'x'
			payload += Math.floor(Math.random() * 10).toString();
		}
	}

	// Calculate and append the Check Digit
	const checkDigit = getCheckDigit(payload);
	return payload + checkDigit;
}

export interface CardDetails {
    number: string;
    month: string;
    year: string;
    cvv: string;
}

/**
 * Generates full card details: Number, Month, Year, CVV.
 */
export function generateCardDetails(pattern: string, reqMonth?: string, reqYear?: string): CardDetails {
    // 1. Generate Number
    const number = generateLuhnCard(pattern);

    const now = new Date();
    const currentYear = now.getFullYear();

    // 2. Year Logic
    let year = reqYear;
    if (!year) {
        // Random year: Current to +5 years
        year = (currentYear + Math.floor(Math.random() * 5) + 1).toString();
    }
    // Normalize "28" -> "2028"
    if (year.length === 2) {
        year = "20" + year;
    }
    
    // 3. Month Logic
    let month = reqMonth;
    if (!month) {
        month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    } else {
        month = month.padStart(2, '0');
    }
    
    // 4. CVV Logic
    // Amex (starts with 34 or 37) uses 4 digits, others 3
    const isAmex = /^3[47]/.test(number);
    const cvvLen = isAmex ? 4 : 3;
    let cvv = "";
    for(let i=0; i<cvvLen; i++) cvv += Math.floor(Math.random() * 10);

    return { number, month, year, cvv };
}

/**
 * Generates multiple cards in format: CC|MM|YYYY|CVV
 */
export function generateMultipleCards(pattern: string, count: number = 10, month?: string, year?: string): string[] {
	const cards: string[] = [];
	for (let i = 0; i < count; i++) {
        const d = generateCardDetails(pattern, month, year);
		cards.push(`${d.number}|${d.month}|${d.year}|${d.cvv}`);
	}
	return cards;
}
