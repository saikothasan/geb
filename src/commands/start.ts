import { BotContext } from "../types";
import { InlineKeyboard } from "grammy";
import { makeStylish } from "../utils/format";
import { LOCALES, COUNTRY_TO_LOCALE } from "../data/locales";

export async function onStart(c: BotContext) {
	const name = c.from?.first_name || "User";
	
	// Create a stylish header
	const header = makeStylish("GEB BOT");
	
	const text = 
		`✨ <b>${header}</b> ✨\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`👋 <b>Hello, ${name}!</b>\n` +
		`<i>I am your advanced all-in-one utility assistant.</i>\n\n` +
		
		`🛠 <b>TOOLKIT</b>\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`💳 <b>CC Generator</b>\n` +
		`👉 <code>/gen 536498</code> <i>(Quick)</i>\n` +
		`👉 <code>.gen 536498|05|28</code> <i>(Full)</i>\n\n` +

		`🔍 <b>BIN Lookup</b>\n` +
		`👉 <code>/bin 536498</code>\n\n` +

		`📍 <b>Fake Identity</b>\n` +
		`👉 <code>/fake US</code> <i>(or any country code)</i>\n` +
		`👉 <code>/support</code> <i>(View all countries)</i>\n\n` +

		`🎨 <b>Text Styler</b>\n` +
		`👉 <code>/style Hello World</code>\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`<i>Select a button below for more:</i>`;

	const keyboard = new InlineKeyboard()
		.url("👨‍💻 Developer", "https://t.me/drkingbd")
		.url("📢 Official Channel", "https://t.me/CyberCoderBD")
		.row()
		.text("📚 Help", "help_callback") // Placeholder for future help menu if needed
		.url("💬 Support", "https://t.me/drkingbd");

	await c.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
}

export async function onSupport(c: BotContext) {
	// Invert the COUNTRY_TO_LOCALE map to group keys or just list them clearly
	// We will list the Country Codes defined in COUNTRY_TO_LOCALE
	const entries = Object.entries(COUNTRY_TO_LOCALE).sort((a, b) => a[0].localeCompare(b[0]));
	
	let text = `🌍 <b>Supported Countries</b>\n` + 
               `<i>Usage: /fake [CODE]</i>\n` + 
               `━━━━━━━━━━━━━━━━━━\n\n`;
	
	let chunk = "";
	for (const [code, localeKey] of entries) {
		const localeName = LOCALES[localeKey]?.name || localeKey;
		const entry = `<code>${code}</code> : ${localeName}\n`;
		
		// 4096 char limit safety
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
