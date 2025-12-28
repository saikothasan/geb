import { Bot, webhookCallback } from "grammy";
import { Env } from "./types";
import { onStart, onSupport } from "./commands/start";
import { onFake } from "./commands/fake";
import { onBin } from "./commands/bin";
import { onGen, onDotGen, onRegenCallback } from "./commands/gen";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		// Command Registration
		bot.command("start", onStart);
		bot.command("support", onSupport);
		bot.command("fake", onFake);
		bot.command("bin", onBin);
		
		// GEN: Handle /gen
		bot.command("gen", onGen);
		// GEN: Handle .gen (Regex matches ".gen" followed by space and args)
		bot.hears(/^\.gen\s+(.+)$/, onDotGen);

		// Callbacks
		bot.callbackQuery(/^regen_/, onRegenCallback);

		// Webhook Handler
		return webhookCallback(bot, "cloudflare-mod")(request);
	},
};
