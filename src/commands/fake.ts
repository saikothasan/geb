import { BotContext } from "../types";
import { LOCALES, COUNTRY_TO_LOCALE } from "../data/locales";

export async function onFake(c: BotContext) {
	// 1. Parse Input
	// Supports: /fake (defaults to US), /fake BD, /fake en_GB
	const args = (c.match as string || "").trim();
	const inputCode = args ? args.toUpperCase() : "US";

	// 2. Resolve Locale
	// Priority: 
	//   A. Direct ISO Country Code match (e.g. "BD" -> "bn_BD")
	//   B. Direct Locale Key match (e.g. "en_AU_ocker" -> "en_AU_ocker")
	let localeKey = COUNTRY_TO_LOCALE[inputCode];

	if (!localeKey && LOCALES[args]) {
		localeKey = args;
	}

	// 3. Validate
	if (!localeKey || !LOCALES[localeKey]) {
		// Optional: List some popular codes to help the user
		return c.reply(
			"<b>❌ Invalid Code!</b>\n" +
			"Use a 2-letter country code (e.g., <code>US</code>, <code>BD</code>, <code>IN</code>) " +
			"or a specific locale ID (e.g., <code>en_AU_ocker</code>).", 
			{ parse_mode: "HTML" }
		);
	}

	const { name: localeName, faker: currentFaker } = LOCALES[localeKey];
	
	// 4. Generate Data
	// Using sexType() to ensure firstName matches the gender
	const sex = currentFaker.person.sexType(); 
	const firstName = currentFaker.person.firstName(sex);
	const lastName = currentFaker.person.lastName();
	const email = currentFaker.internet.email({ firstName, lastName });
	const phone = currentFaker.phone.number(); 
	const street = currentFaker.location.streetAddress();
	const city = currentFaker.location.city();
	
	// Handle State/Zip safely as some locales (e.g. generic 'ar') might lack specific state data
	const state = currentFaker.location.state ? currentFaker.location.state() : "N/A";
	const zip = currentFaker.location.zipCode ? currentFaker.location.zipCode() : "N/A";
	const country = currentFaker.location.country();
	
	let dob = "N/A";
	try {
		dob = currentFaker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0];
	} catch (e) {
		dob = "1990-01-01"; 
	}
	
	const username = currentFaker.internet.username({ firstName, lastName });

	const text = 
		`📍 <b>FAKE IDENTITY</b> (${localeName})\n\n` +
		`👤 <b>Name:</b> <code>${firstName} ${lastName}</code>\n` +
		`⚧ <b>Gender:</b> ${sex === 'female' ? '♀️' : '♂️'} ${sex.toUpperCase()}\n` +
		`📅 <b>DOB:</b> ${dob}\n\n` +
		`📧 <b>Email:</b> <code>${email}</code>\n` +
		`📱 <b>Phone:</b> <code>${phone}</code>\n` +
		`🔗 <b>Username:</b> @${username}\n\n` +
		`🏠 <b>Address:</b>\n` +
		`${street}\n${city}, ${state} ${zip}\n${country}`;

	await c.reply(text, { parse_mode: "HTML" });
}
