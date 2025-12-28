import { BotContext } from "../types";
import { InlineKeyboard } from "grammy";
import { makeStylish } from "../utils/format";
import { LOCALES, COUNTRY_TO_LOCALE } from "../data/locales";

export async function onStart(c: BotContext) {
	const name = c.from?.first_name || "User";
	const text = 
		`✨ ${makeStylish(`Welcome ${name}`)} ✨\n\n` +
		`🛠 <b>Available Commands:</b>\n` +
		`━━━━━━━━━━━━━━━━━━\n` +
		`💳 <b>CC Gen:</b> <code>/gen 456789</code>\n` +
		`🔍 <b>BIN Look:</b> <code>/bin 456789</code>\n` +
		`📍 <b>Fake Addr:</b> <code>/fake US</code>\n` +
		`📋 <b>Countries:</b> <code>/support</code>\n`;

	const keyboard = new InlineKeyboard()
		.url("👨‍💻 Developer", "https://t.me/CyberCoderBD")
		.url("📢 Channel", "https://t.me/drkingbd");

	await c.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
}

export async function onSupport(c: BotContext) {
	// We will list the Country Codes defined in COUNTRY_TO_LOCALE
	const entries = Object.entries(COUNTRY_TO_LOCALE).sort((a, b) => a[0].localeCompare(b[0]));
	
	let text = `🌍 <b>Supported Countries</b>\n\n`;
	
	// Chunking to avoid Telegram message length limits
	let chunk = "";
	for (const [code, localeKey] of entries) {
		const localeName = LOCALES[localeKey]?.name || localeKey;
		const entry = `<code>${code}</code> : ${localeName}\n`;
		
		if (chunk.length + entry.length > 3800) {
			await c.reply(text + chunk, { parse_mode: "HTML" });
			text = "";
			chunk = "";
		}
		chunk += entry;
	}
	if (chunk.length > 0) {
		await c.reply(text + chunk, { parse_mode: "HTML" });
	}
}
