import { generateMultipleCards } from "../utils/luhn";

export async function fetchCCData(bin: string): Promise<string[]> {
	try {
		// We use the local Luhn algorithm generator instead of an external API.
		// The 'bin' input here comes from extractBin(), which might be "456789xxxxxxxxxx".
		// We pass it directly to the generator to respect the full pattern.
		const cards = generateMultipleCards(bin, 16, 10);
		
		// Return strictly typed Promise
		return Promise.resolve(cards);
	} catch (e) {
		console.error("CC Generation Error:", e);
		return Promise.resolve(["error"]);
	}
}

export async function fetchBinInfo(bin: string): Promise<any> {
	try {
		const cleanBin = bin.substring(0, 6);
		const res = await fetch(`https://bins.antipublic.cc/bins/${cleanBin}`);
		if (!res.ok) return {};
		return await res.json();
	} catch (e) {
		console.error("BIN Info Error:", e);
		return {};
	}
}
