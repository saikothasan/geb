import { allFakers, allLocales, type Faker } from "@faker-js/faker";

// 1. Dynamically build Base Locales Map
// This replaces the manual import of 60+ individual locales
export const LOCALES: Record<string, { name: string; faker: Faker }> = {};

Object.keys(allFakers).forEach((key) => {
	// Cast keys safely to access the objects
	const localeKey = key as keyof typeof allFakers;
	const localeDef = allLocales[localeKey as keyof typeof allLocales];
	
	LOCALES[key] = {
		name: localeDef?.title || key, // Use the official title (e.g., "English (United States)")
		faker: allFakers[localeKey],
	};
});

// 2. User-Friendly Country Code Map
// Maps ISO 2-letter codes -> Best matching Locale Key
export const COUNTRY_TO_LOCALE: Record<string, string> = {
	"ZA": "af_ZA", // South Africa
	"AE": "ar",    // UAE (using generic Arabic)
	"SA": "ar",    // Saudi Arabia
	"AZ": "az",    // Azerbaijan
	"BD": "bn_BD", // Bangladesh
	"CZ": "cs_CZ", // Czechia
	"DK": "da",    // Denmark
	"DE": "de",    // Germany
	"AT": "de_AT", // Austria
	"CH": "de_CH", // Switzerland
	"GR": "el",    // Greece
	"US": "en_US", // United States
	"AU": "en_AU", // Australia
	"CA": "en_CA", // Canada
	"GB": "en_GB", // United Kingdom
	"UK": "en_GB", // United Kingdom (Alias)
	"GH": "en_GH", // Ghana
	"HK": "en_HK", // Hong Kong
	"IE": "en_IE", // Ireland
	"IN": "en_IN", // India
	"NG": "en_NG", // Nigeria
	"ES": "es",    // Spain
	"MX": "es_MX", // Mexico
	"IR": "fa",    // Iran (Persian)
	"FI": "fi",    // Finland
	"FR": "fr",    // France
	"BE": "fr_BE", // Belgium
	"IL": "he",    // Israel
	"HR": "hr",    // Croatia
	"HU": "hu",    // Hungary
	"AM": "hy",    // Armenia
	"ID": "id_ID", // Indonesia
	"IT": "it",    // Italy
	"JP": "ja",    // Japan
	"GE": "ka_GE", // Georgia
	"KR": "ko",    // South Korea
	"LV": "lv",    // Latvia
	"MK": "mk",    // North Macedonia
	"NO": "nb_NO", // Norway
	"NP": "ne",    // Nepal
	"NL": "nl",    // Netherlands
	"PL": "pl",    // Poland
	"BR": "pt_BR", // Brazil
	"PT": "pt_PT", // Portugal
	"RO": "ro",    // Romania
	"MD": "ro_MD", // Moldova
	"RU": "ru",    // Russia
	"SK": "sk",    // Slovakia
	"RS": "sr_RS_latin", // Serbia
	"SE": "sv",    // Sweden
	"TH": "th",    // Thailand
	"TR": "tr",    // Turkey
	"UA": "uk",    // Ukraine
	"PK": "ur",    // Pakistan (Urdu)
	"UZ": "uz_UZ_latin", // Uzbekistan
	"VN": "vi",    // Vietnam
	"CN": "zh_CN", // China
	"TW": "zh_TW", // Taiwan
};
