import { allFakers, allLocales, type Faker } from "@faker-js/faker";

// 1. Dynamically build Base Locales Map
// This enables looking up any locale by its key (e.g., "en_AU_ocker")
export const LOCALES: Record<string, { name: string; faker: Faker }> = {};

Object.keys(allFakers).forEach((key) => {
	const localeKey = key as keyof typeof allFakers;
	// Access locale definition safely to get the friendly name
	const localeDef = (allLocales as any)[localeKey];
	
	LOCALES[key] = {
		name: localeDef?.title || key, 
		faker: allFakers[localeKey],
	};
});

// 2. User-Friendly Country Code Map
// Maps ISO 2-letter Country Codes -> Best matching Faker Locale Key
export const COUNTRY_TO_LOCALE: Record<string, string> = {
    // Americas
    "US": "en_US", "CA": "en_CA", "MX": "es_MX", "BR": "pt_BR", 
    "AR": "es", "CO": "es", "CL": "es", "PE": "es", // Generic Spanish fallbacks
    
    // Europe
    "GB": "en_GB", "UK": "en_GB", "IE": "en_IE", 
    "FR": "fr", "BE": "fr_BE", "CH": "de_CH", // Defaulting CH to German, could also be fr_CH
    "DE": "de", "AT": "de_AT", 
    "IT": "it", "ES": "es", "PT": "pt_PT",
    "NL": "nl", "DK": "da", "NO": "nb_NO", "SE": "sv", "FI": "fi",
    "PL": "pl", "CZ": "cs_CZ", "SK": "sk", "HU": "hu", "RO": "ro", "MD": "ro_MD",
    "RU": "ru", "UA": "uk", "BY": "ru", // Fallback
    "GR": "el", "TR": "tr", "RS": "sr_RS_latin", "HR": "hr", "LV": "lv", "MK": "mk",
    
    // Asia
    "CN": "zh_CN", "TW": "zh_TW", "JP": "ja", "KR": "ko",
    "IN": "en_IN", "PK": "ur", "BD": "bn_BD", "NP": "ne",
    "ID": "id_ID", "TH": "th", "VN": "vi", 
    "IR": "fa", "AF": "fa", // Fallback
    "IL": "he", "AZ": "az", "GE": "ka_GE", "AM": "hy",
    "MV": "dv", // Maldives
    "HK": "en_HK",
    
    // Middle East (Generic Arabic)
    "SA": "ar", "AE": "ar", "EG": "ar", "KW": "ar", "QA": "ar",
    
    // Africa
    "ZA": "en_ZA", // English (South Africa)
    "NG": "en_NG", // Nigeria
    "GH": "en_GH", // Ghana
    "SN": "fr_SN", // Senegal
    
    // Oceania
    "AU": "en_AU", "NZ": "en_AU", // Fallback to AU or generic en
};
