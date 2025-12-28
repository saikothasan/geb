import { BotContext } from "../types";
import { InlineKeyboard } from "grammy";
import { fetchCCData, fetchBinInfo } from "../services/api";

// Helper to process the command logic
async function processGenCommand(c: BotContext, argsRaw: string) {
	if (!argsRaw || argsRaw.trim() === "") {
		return c.reply("Usage: <code>/gen 551827|05|24</code>", { parse_mode: "HTML" });
	}

	// Parse arguments: BIN|MM|YY
	const parts = argsRaw.split("|").map(s => s.trim());
	const inputBin = parts[0];
	const inputMonth = parts[1] || undefined;
	const inputYear = parts[2] || undefined;

	await handleGenLogic(c, inputBin, inputMonth, inputYear);
}

// Handler for /gen command
export async function onGen(c: BotContext) {
	const args = c.match as string;
	await processGenCommand(c, args);
}

// Handler for .gen text trigger
export async function onDotGen(c: BotContext) {
	const match = c.match as RegExpMatchArray;
	const args = match[1]; // Capture group from regex
	await processGenCommand(c, args);
}

export async function onRegenCallback(c: BotContext) {
	if (!c.callbackQuery || !c.callbackQuery.data) return;
	
	// Format: regen_BIN_MM_YY (Need to store constraints in callback data)
	// Simple approach: parse the original message or store state. 
	// For now, simpler: regen_BIN (Randomizes date again) or we pack data.
	// Given typical limitations, we will just use the BIN and let it randomize date again
	// OR we can try to parse the callback data if we pack it.
	
	const parts = c.callbackQuery.data.split("_");
	// regen_551827_05_2028
	const bin = parts[1];
	const month = parts[2] || undefined;
	const year = parts[3] || undefined;

	await c.answerCallbackQuery({ text: "Generating..." });
	await handleGenLogic(c, bin, month, year, true, c.callbackQuery.message?.message_id);
}

async function handleGenLogic(ctx: BotContext, bin: string, month?: string, year?: string, isRegen: boolean = false, messageIdToEdit?: number) {
	// Clean BIN for Pattern usage (keep 'x')
	const rawPattern = bin.replace(/[^0-9x]/gi, "");
	
	if (rawPattern.length < 6) {
		if(!isRegen) await ctx.reply("Invalid BIN.", { parse_mode: "HTML" });
		return;
	}

	let msgId = messageIdToEdit;
	if (!isRegen) {
		const sent = await ctx.reply("⏳ <b>Processing...</b>", { parse_mode: "HTML" });
		msgId = sent.message_id;
	}

	const [ccData, binInfo] = await Promise.all([
		fetchCCData(rawPattern, month, year),
		fetchBinInfo(rawPattern)
	]);

	if (ccData.includes("error")) {
		await ctx.api.editMessageText(ctx.chat!.id, msgId!, "❌ API Error.");
		return;
	}

	// Format Output
	// ccData items are already formatted as CC|MM|YYYY|CVV
	let text = `💳 <b>BIN:</b> <code>${rawPattern.substring(0, 6)}</code>\n`;
	text += `🔄 <b>Amount:</b> <code>${ccData.length}</code>\n\n`;
	
	ccData.forEach(cardLine => {
		text += `<code>${cardLine}</code>\n`;
	});

	text += `\n━━━━━━━━━━━━━━━━━━\n`;
	if (Object.keys(binInfo).length > 0) {
		text += `🏦 <b>Bank:</b> ${binInfo.bank || 'N/A'}\n`;
		text += `🌍 <b>Country:</b> ${binInfo.country_name || 'N/A'} ${binInfo.country_flag || ''}\n`;
		text += `🏷 <b>Brand:</b> ${binInfo.brand || 'N/A'}\n`;
		text += `💠 <b>Type:</b> ${binInfo.type || 'N/A'} - ${binInfo.level || 'N/A'}\n`;
	} else {
		text += `❌ BIN Info unavailable.`;
	}

	// Store constraints in callback data for consistency: regen_BIN_MM_YYYY
	// Ensure length doesn't exceed 64 bytes for Telegram callback
	const callbackData = `regen_${rawPattern}_${month || ''}_${year || ''}`;
	
	const keyboard = new InlineKeyboard().text("🔄 Re-generate", callbackData);
	
	try {
		await ctx.api.editMessageText(ctx.chat!.id, msgId!, text, {
			parse_mode: "HTML",
			reply_markup: keyboard
		});
	} catch (e) {
		// Ignore not modified
	}
}
