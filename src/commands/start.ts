import { BotContext } from "../types";
import { InlineKeyboard } from "grammy";
import { makeStylish } from "../utils/format";
import { LOCALES } from "../data/locales";

export async function onStart(c: BotContext) {
	const name = c.from?.first_name || "User";
	const text = 
		`✨ ${makeStylish(`Welcome ${name}`)} ✨\n\n` +
		`🛠 <b>Available Commands:</b>\n` +
		`━━━━━━━━━━━━━━━━━━\n` +
		`💳 <b>CC Gen:</b> <code>/gen 456789</code>\n` +
		`🔍 <b>BIN Look:</b> <code>/bin 456789</code>\n` +
		`📍 <b>Fake Addr:</b> <code>/fake en_US</code>\n` +
		`📋 <b>Locales:</b> <code>/support</code>\n`;

	const keyboard = new InlineKeyboard()
		.url("👨‍💻 Developer", "https://t.me/ToxicGamer04")
		.url("📢 Channel", "https://t.me/+xJFdpxht-voxNTJl");

	await c.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
}

export async function onSupport(c: BotContext) {
	const keys = Object.keys(LOCALES);
	let text = `🌍 <b>Supported Locales</b>\n\n`;
	
	// Chunking to avoid Telegram message length limits
	let chunk = "";
	for (const key of keys) {
		const entry = `<code>${key}</code>: ${LOCALES[key].name}\n`;
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
