import { Bot, webhookCallback } from "grammy";
import { Env } from "./types";
import { onStart, onSupport } from "./commands/start";
import { onFake } from "./commands/fake";
import { onBin } from "./commands/bin";
import { onGen, onRegenCallback } from "./commands/gen";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		// Command Registration
		bot.command("start", onStart);
		bot.command("support", onSupport);
		bot.command("fake", onFake);
		bot.command("bin", onBin);
		bot.command("gen", onGen);

		// Callbacks
		bot.callbackQuery(/^regen_/, onRegenCallback);

		// Webhook Handler
		return webhookCallback(bot, "cloudflare-mod")(request);
	},
};
