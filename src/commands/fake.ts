import { BotContext } from "../types";
import { LOCALES, COUNTRY_TO_LOCALE } from "../data/locales";

export async function onFake(c: BotContext) {
	const args = (c.match as string).trim();
	// Default to 'US' if no argument
	const inputCode = args ? args.toUpperCase() : "US";

	// 1. Try to find by Country Code (e.g., "BD")
	let localeKey = COUNTRY_TO_LOCALE[inputCode];

	// 2. Fallback: Check if user provided a full locale code directly (e.g., "bn_BD")
	//    This preserves backward compatibility and allows accessing specific locales (like en_AU_ocker)
	if (!localeKey && LOCALES[args]) {
		localeKey = args;
	}

	if (!localeKey || !LOCALES[localeKey]) {
		return c.reply("❌ Invalid Country Code! Usage: <code>/fake BD</code>\nCheck /support for list.", { parse_mode: "HTML" });
	}

	const currentLocData = LOCALES[localeKey];
	const currentFaker = currentLocData.faker;
	
	// Generate Data using strictly typed Faker methods
	const sex = currentFaker.person.sexType();
	const firstName = currentFaker.person.firstName(sex);
	const lastName = currentFaker.person.lastName();
	const email = currentFaker.internet.email({ firstName, lastName });
	const phone = currentFaker.phone.number(); 
	const street = currentFaker.location.streetAddress();
	const city = currentFaker.location.city();
	const state = currentFaker.location.state();
	const zip = currentFaker.location.zipCode();
	const country = currentFaker.location.country();
	const dob = currentFaker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0];
	const username = currentFaker.internet.username({ firstName, lastName });

	const text = 
		`📍 𝙁𝘼𝙆𝙀 𝘼𝘿𝘿𝙍𝙀𝙎𝙎 (${currentLocData.name})\n\n` +
		`• 𝙉𝙖𝙢𝙚: ${firstName} ${lastName}\n` +
		`• 𝙂𝙚𝙣𝙙𝙚𝙧: ${sex.toUpperCase()}\n` +
		`• 𝙀𝙢𝙖𝙞𝙡: ${email}\n` +
		`• 𝙋𝙝𝙤𝙣𝙚: ${phone}\n` +
		`• 𝘼𝙙𝙙𝙧𝙚𝙨𝙨: ${street}\n` +
		`• 𝘾𝙞𝙩𝙮: ${city}\n` +
		`• 𝙎𝙩𝙖𝙩𝙚: ${state}\n` +
		`• 𝙋𝙤𝙨𝙩𝙘𝙤𝙙𝙚: ${zip}\n` +
		`• 𝘾𝙤𝙪𝙣𝙩𝙧𝙮: ${country}\n` +
		`• 𝘿𝙊𝘽: ${dob}\n` +
		`• 𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚: ${username}\n`;

	await c.reply(text, { parse_mode: "HTML" });
}
