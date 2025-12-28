import { Bot, Context, InlineKeyboard, webhookCallback } from "grammy";

// --- ⚙️ CONFIG & INTERFACES ---
export interface Env {
	BOT_TOKEN: string;
}

// Country list for /fake
const SUPPORTED_COUNTRIES: Record<string, string> = {
	"AU": "🇦🇺 Australia", "BR": "🇧🇷 Brazil", "CA": "🇨🇦 Canada", "CH": "🇨🇭 Switzerland",
	"DE": "🇩🇪 Germany", "DK": "🇩🇰 Denmark", "ES": "🇪🇸 Spain", "FI": "🇫🇮 Finland",
	"FR": "🇫🇷 France", "GB": "🇬🇧 United Kingdom", "IE": "🇮🇪 Ireland", "IN": "🇮🇳 India",
	"IR": "🇮🇷 Iran", "MX": "🇲🇽 Mexico", "NL": "🇳🇱 Netherlands", "NO": "🇳🇴 Norway",
	"NZ": "🇳🇿 New Zealand", "RS": "🇷🇸 Serbia", "TR": "🇹🇷 Turkey", "UA": "🇺🇦 Ukraine",
	"US": "🇺🇸 United States"
};

// --- 🎨 HELPERS ---

// 1. Stylish Text Generator
function makeStylish(text: string): string {
	const mapping: Record<string, string> = {
		'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
		'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
		'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
		'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
		'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
		'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
		'0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
	};
	return text.split('').map(char => mapping[char] || char).join('');
}

// 2. Extract BIN
function extractBin(input: string): string | null {
	const match = input.match(/(\d{6,16})/);
	if (!match) return null;
	const bin = match[1];
	return bin.length === 6 ? bin.padEnd(16, 'x') : bin;
}

// 3. Fetch APIs
async function fetchCCData(bin: string): Promise<string[]> {
	try {
		const res = await fetch(`https://drlabapis.onrender.com/api/ccgenerator?bin=${bin}&count=10`);
		if (!res.ok) throw new Error("API Error");
		const text = await res.text();
		return text.trim().split("\n");
	} catch (e) {
		return ["error"];
	}
}

async function fetchBinInfo(bin: string): Promise<any> {
	try {
		const res = await fetch(`https://bins.antipublic.cc/bins/${bin.substring(0, 6)}`);
		if (!res.ok) return {};
		return await res.json();
	} catch (e) {
		return {};
	}
}

async function fetchFakeData(countryCode: string): Promise<any> {
	try {
		const res = await fetch(`https://randomuser.me/api/?nat=${countryCode}`);
		if (!res.ok) return null;
		const data = await res.json() as any;
		return data.results?.[0] || null;
	} catch (e) {
		return null;
	}
}

// --- 🤖 BOT LOGIC ---

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN);

		// --- COMMAND: /start ---
		bot.command("start", async (c) => {
			const name = c.from?.first_name || "User";
			const text = 
				`✨ ${makeStylish(`Welcome ${name}`)} ✨\n\n` +
				`🛠 <b>Available Commands:</b>\n` +
				`━━━━━━━━━━━━━━━━━━\n` +
				`💳 <b>CC Gen:</b> <code>/gen 456789</code>\n` +
				`🔍 <b>BIN Look:</b> <code>/bin 456789</code>\n` +
				`📍 <b>Fake Addr:</b> <code>/fake us</code>\n`;

			const keyboard = new InlineKeyboard()
				.url("👨‍💻 Developer", "https://t.me/ToxicGamer04")
				.url("📢 Channel", "https://t.me/+xJFdpxht-voxNTJl");

			await c.reply(text, { parse_mode: "HTML", reply_markup: keyboard });
		});

		// --- COMMAND: /support ---
		bot.command("support", async (c) => {
			let text = `🌍 <b>Supported Countries</b>\n\n`;
			const items = Object.entries(SUPPORTED_COUNTRIES);
			
			for (let i = 0; i < items.length; i += 2) {
				const [c1, n1] = items[i];
				let line = `<code>${c1}</code> : ${n1}`;
				if (i + 1 < items.length) {
					const [c2, n2] = items[i+1];
					line += `  |  <code>${c2}</code> : ${n2}`;
				}
				text += line + "\n";
			}
			await c.reply(text, { parse_mode: "HTML" });
		});

		// --- COMMAND: /bin ---
		bot.command("bin", async (c) => {
			const args = c.match; // args is a string in grammY command
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
		});

		// --- COMMAND: /fake ---
		bot.command("fake", async (c) => {
			const args = (c.match as string).trim();
			if (!args) return c.reply("Use: /support to see all supported countries code.", { parse_mode: "HTML" });

			const code = args.toUpperCase();
			if (!SUPPORTED_COUNTRIES[code]) return c.reply("Invalid Code! Check /support");

			const statusMsg = await c.reply("⏳ <b>Fetching Data...</b>", { parse_mode: "HTML" });

			const data = await fetchFakeData(code.toLowerCase());
			if (!data) {
				return c.api.editMessageText(c.chat.id, statusMsg.message_id, "❌ Error fetching data.");
			}

			const loc = data.location;
			const text = 
				`📍 𝙁𝘼𝙆𝙀 𝘼𝘿𝘿𝙍𝙀𝙎𝙎\n\n` +
				`• 𝙉𝙖𝙢𝙚: ${data.name.first} ${data.name.last}\n` +
				`• 𝙂𝙚𝙣𝙙𝙚𝙧: ${data.gender.toUpperCase()}\n` +
				`• 𝙀𝙢𝙖𝙞𝙡: ${data.email}\n` +
				`• 𝙋𝙝𝙤𝙣𝙚: ${data.phone}\n` +
				`• 𝘼𝙙𝙙𝙧𝙚𝙨𝙨: ${loc.street.number} ${loc.street.name}\n` +
				`• 𝘾𝙞𝙩𝙮: ${loc.city}\n` +
				`• 𝙎𝙩𝙖𝙩𝙚: ${loc.state}\n` +
				`• 𝙋𝙤𝙨𝙩𝙘𝙤𝙙𝙚: ${loc.postcode}\n` +
				`• 𝘾𝙤𝙪𝙣𝙩𝙧𝙮: ${loc.country}\n` +
				`• 𝘿𝙊𝘽: ${data.dob.date.substring(0, 10)}\n` +
				`• 𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚: ${data.login.username}\n`;

			await c.api.editMessageText(c.chat.id, statusMsg.message_id, text, { parse_mode: "HTML" });
		});

		// --- GENERATOR LOGIC (Shared) ---
		async function handleGen(ctx: Context, inputBin: string, isRegen: boolean = false, messageIdToEdit?: number) {
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

			// Parallel Fetching for speed
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
			
			// Update the message
			await ctx.api.editMessageText(ctx.chat!.id, msgId!, text, {
				parse_mode: "HTML",
				reply_markup: keyboard
			});
		}

		// --- COMMAND: /gen ---
		bot.command("gen", async (c) => {
			const args = c.match as string;
			if (!args) return c.reply("Usage: <code>/gen 440066</code>", { parse_mode: "HTML" });
			await handleGen(c, args);
		});

		// --- CALLBACK: Re-generate ---
		bot.callbackQuery(/^regen_/, async (c) => {
			const bin = c.callbackQuery.data.split("_")[1];
			await c.answerCallbackQuery({ text: "Generating..." });
			// Reuse the generation logic
			await handleGen(c, bin, true, c.callbackQuery.message?.message_id);
		});

		// Handle Webhook
		return webhookCallback(bot, "cloudflare-mod")(request);
	},
};
