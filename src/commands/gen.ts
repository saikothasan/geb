import { BotContext } from "../types";
import { InlineKeyboard } from "grammy";
import { extractBin } from "../utils/validation";
import { fetchCCData, fetchBinInfo } from "../services/api";

export async function onGen(c: BotContext) {
	const args = c.match as string;
	if (!args) return c.reply("Usage: <code>/gen 440066</code>", { parse_mode: "HTML" });
	await handleGenLogic(c, args);
}

export async function onRegenCallback(c: BotContext) {
	if (!c.callbackQuery || !c.callbackQuery.data) return;
	const bin = c.callbackQuery.data.split("_")[1];
	await c.answerCallbackQuery({ text: "Generating..." });
	await handleGenLogic(c, bin, true, c.callbackQuery.message?.message_id);
}

async function handleGenLogic(ctx: BotContext, inputBin: string, isRegen: boolean = false, messageIdToEdit?: number) {
	const cleanBin = extractBin(inputBin);
	if (!cleanBin) {
		if(!isRegen) await ctx.reply("Invalid BIN.", { parse_mode: "HTML" });
		return;
	}

	let msgId = messageIdToEdit;
	if (!isRegen) {
		const sent = await ctx.reply("⏳ <b>Processing...</b>", { parse_mode: "HTML" });
		msgId = sent.message_id;
	}

	const [ccData, binInfo] = await Promise.all([
		fetchCCData(cleanBin),
		fetchBinInfo(cleanBin)
	]);

	if (ccData.includes("error")) {
		await ctx.api.editMessageText(ctx.chat!.id, msgId!, "❌ API Error or Timeout.");
		return;
	}

	let text = `💳 <b>BIN:</b> <code>${cleanBin.substring(0, 6)}</code>\n`;
	text += `🔄 <b>Amount:</b> <code>${ccData.length}</code>\n\n`;
	ccData.forEach(card => text += `<code>${card.toUpperCase()}</code>\n`);

	text += `\n━━━━━━━━━━━━━━━━━━\n`;
	if (Object.keys(binInfo).length > 0) {
		text += `🏦 <b>Bank:</b> ${binInfo.bank || 'N/A'}\n`;
		text += `🌍 <b>Country:</b> ${binInfo.country_name || 'N/A'} ${binInfo.country_flag || ''}\n`;
		text += `🏷 <b>Brand:</b> ${binInfo.brand || 'N/A'}\n`;
		text += `💠 <b>Type:</b> ${binInfo.type || 'N/A'} - ${binInfo.level || 'N/A'}\n`;
	} else {
		text += `❌ BIN Info unavailable.`;
	}

	const keyboard = new InlineKeyboard().text("🔄 Re-generate", `regen_${cleanBin.substring(0, 6)}`);
	
	// Ensure we edit safely
	try {
		await ctx.api.editMessageText(ctx.chat!.id, msgId!, text, {
			parse_mode: "HTML",
			reply_markup: keyboard
		});
	} catch (e) {
		// Ignore "message is not modified" errors which can happen if user clicks fast
	}
}
