import { Bot, webhookCallback } from "grammy";
import { Env } from "./types";
import { onStart, onSupport } from "./commands/start";
import { onFake } from "./commands/fake";
import { onBin } from "./commands/bin";
import { onGen, onDotGen, onRegenCallback } from "./commands/gen";
import { onStyle, onStyleCallback } from "./commands/style";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		// --- 1. Commands ---
		bot.command("start", onStart);
		bot.command("support", onSupport);
		bot.command("fake", onFake);
		bot.command("bin", onBin);
		bot.command("style", onStyle);
		bot.command("gen", onGen); // Handles /gen
		
		// --- 2. Hears (Regex) ---
		// Matches ".gen 555555" etc.
		bot.hears(/^\.gen\s+(.+)$/, onDotGen);

		// --- 3. Callbacks ---
		// Re-generate cards
		bot.callbackQuery(/^regen_/, onRegenCallback);
		// Stylish text pagination
		bot.callbackQuery(/^style_page_/, onStyleCallback);

		// --- 4. Webhook ---
		return webhookCallback(bot, "cloudflare-mod")(request);
	},
};
