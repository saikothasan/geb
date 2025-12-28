import { BotContext } from "../types";
import { fetchBinInfo } from "../services/api";

export async function onBin(c: BotContext) {
	const args = c.match; 
	if (!args || typeof args !== 'string' || args.length < 6) {
		return c.reply("Usage: /bin 456789");
	}

	const info = await fetchBinInfo(args);
	if (!info || Object.keys(info).length === 0) {
		return c.reply("❌ Not Found.");
	}

	const text = 
		`🔍 <b>BIN LOOKUP</b>\n` +
		`💳 <b>BIN:</b> <code>${args.substring(0, 6)}</code>\n` +
		`🏦 <b>Bank:</b> ${info.bank || 'N/A'}\n` +
		`🌍 <b>Country:</b> ${info.country_name || 'N/A'} ${info.country_flag || ''}\n` +
		`💠 <b>Type:</b> ${info.type || 'N/A'} - ${info.level || 'N/A'}\n`;
	
	await c.reply(text, { parse_mode: "HTML" });
}
