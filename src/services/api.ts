export async function fetchCCData(bin: string): Promise<string[]> {
	try {
		const cleanBin = bin.substring(0, 6);
		const res = await fetch(`https://drlabapis.onrender.com/api/ccgenerator?bin=${cleanBin}&count=10`);
		if (!res.ok) throw new Error("API Error");
		const text = await res.text();
		// API returns newline separated cards
		return text.trim().split("\n");
	} catch (e) {
		console.error("CC Fetch Error:", e);
		return ["error"];
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
