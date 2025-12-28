import { generateMultipleCards } from "../utils/luhn";

export async function fetchCCData(bin: string, month?: string, year?: string): Promise<string[]> {
	try {
		// Use local Real Card Generator (Luhn + Date/CVV)
		const cards = generateMultipleCards(bin, 10, month, year);
		return Promise.resolve(cards);
	} catch (e) {
		console.error("CC Generation Error:", e);
		return Promise.resolve(["error"]);
	}
}

export async function fetchBinInfo(bin: string): Promise<any> {
	try {
		// API needs just the first 6 digits
		const cleanBin = bin.replace(/[^0-9]/g, "").substring(0, 6);
		if (cleanBin.length < 6) return {};
		
		const res = await fetch(`https://bins.antipublic.cc/bins/${cleanBin}`);
		if (!res.ok) return {};
		return await res.json();
	} catch (e) {
		console.error("BIN Info Error:", e);
		return {};
	}
}
