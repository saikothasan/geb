import { allFakers, allLocales, type Faker } from "@faker-js/faker";

// 1. Dynamically build Base Locales Map
export const LOCALES: Record<string, { name: string; faker: Faker }> = {};

Object.keys(allFakers).forEach((key) => {
	// SAFE CASTING to avoid TS errors
	const localeKey = key as keyof typeof allFakers;
	// Helper to access allLocales safely as it might have different keys
	const localeDef = (allLocales as any)[localeKey];
	
	LOCALES[key] = {
		name: localeDef?.title || key, 
		faker: allFakers[localeKey],
	};
});

// 2. User-Friendly Country Code Map
// Maps ISO 2-letter codes -> Best matching Locale Key
export const COUNTRY_TO_LOCALE: Record<string, string> = {
	"ZA": "af_ZA", "AE": "ar", "SA": "ar", "AZ": "az", "BD": "bn_BD", 
	"CZ": "cs_CZ", "DK": "da", "DE": "de", "AT": "de_AT", "CH": "de_CH", 
	"GR": "el", "US": "en_US", "AU": "en_AU", "CA": "en_CA", "GB": "en_GB", 
	"UK": "en_GB", "GH": "en_GH", "HK": "en_HK", "IE": "en_IE", "IN": "en_IN", 
	"NG": "en_NG", "ES": "es", "MX": "es_MX", "IR": "fa", "FI": "fi", 
	"FR": "fr", "BE": "fr_BE", "IL": "he", "HR": "hr", "HU": "hu", 
	"AM": "hy", "ID": "id_ID", "IT": "it", "JP": "ja", "GE": "ka_GE", 
	"KR": "ko", "LV": "lv", "MK": "mk", "NO": "nb_NO", "NP": "ne", 
	"NL": "nl", "PL": "pl", "BR": "pt_BR", "PT": "pt_PT", "RO": "ro", 
	"MD": "ro_MD", "RU": "ru", "SK": "sk", "RS": "sr_RS_latin", 
	"SE": "sv", "TH": "th", "TR": "tr", "UA": "uk", "PK": "ur", 
	"UZ": "uz_UZ_latin", "VN": "vi", "CN": "zh_CN", "TW": "zh_TW"
};
