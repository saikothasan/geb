import { BotContext } from "../types";
import { makeStylish } from "../utils/format";

export async function onStyle(c: BotContext) {
	const args = c.match as string;
	
	if (!args || !args.trim()) {
		return c.reply("Usage: <code>/style Hello World</code>", { parse_mode: "HTML" });
	}

	const styled = makeStylish(args);
	
	// Return inside a code block for easy copying
	await c.reply(`<code>${styled}</code>`, { parse_mode: "HTML" });
}
