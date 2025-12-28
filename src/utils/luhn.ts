/**
 * Calculates the Luhn check digit for a given payload.
 */
function getCheckDigit(payload: string): number {
	let sum = 0;
	let shouldDouble = true; 

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
    let cleanPattern = pattern.replace(/[^0-9x]/gi, "");
    if (cleanPattern.length < length) {
        cleanPattern = cleanPattern.padEnd(length, 'x');
    }
    
	let payload = "";
	for (let i = 0; i < length - 1; i++) {
		const char = cleanPattern[i];
		if (char && /[0-9]/.test(char)) {
			payload += char;
		} else {
			payload += Math.floor(Math.random() * 10).toString();
		}
	}

	return payload + getCheckDigit(payload);
}

export interface CardDetails {
    number: string;
    month: string;
    year: string;
    cvv: string;
}

export function generateCardDetails(pattern: string, reqMonth?: string, reqYear?: string): CardDetails {
    const number = generateLuhnCard(pattern);

    const now = new Date();
    const currentYear = now.getFullYear();

    // Year Logic
    let year = reqYear;
    if (!year) {
        year = (currentYear + Math.floor(Math.random() * 5) + 1).toString();
    }
    if (year.length === 2) year = "20" + year;
    
    // Month Logic
    let month = reqMonth;
    if (!month) {
        month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    } else {
        month = month.padStart(2, '0');
    }
    
    // CVV Logic
    const isAmex = /^3[47]/.test(number);
    const cvvLen = isAmex ? 4 : 3;
    let cvv = "";
    for(let i=0; i<cvvLen; i++) cvv += Math.floor(Math.random() * 10);

    return { number, month, year, cvv };
}

export function generateMultipleCards(pattern: string, count: number = 10, month?: string, year?: string): string[] {
	const cards: string[] = [];
	for (let i = 0; i < count; i++) {
        const d = generateCardDetails(pattern, month, year);
		cards.push(`${d.number}|${d.month}|${d.year}|${d.cvv}`);
	}
	return cards;
}
