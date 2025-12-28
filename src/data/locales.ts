import {
	type Faker,
	fakerAF_ZA, fakerAR, fakerAZ, fakerBASE, fakerBN_BD, fakerCS_CZ, fakerCY, fakerDA,
	fakerDE, fakerDE_AT, fakerDE_CH, fakerDV, fakerEL, fakerEN, fakerEN_AU, fakerEN_AU_ocker,
	fakerEN_BORK, fakerEN_CA, fakerEN_GB, fakerEN_GH, fakerEN_HK, fakerEN_IE, fakerEN_IN,
	fakerEN_NG, fakerEN_US, fakerEN_ZA, fakerEO, fakerES, fakerES_MX, fakerFA, fakerFI,
	fakerFR, fakerFR_BE, fakerFR_CA, fakerFR_CH, fakerFR_LU, fakerFR_SN, fakerHE, fakerHR,
	fakerHU, fakerHY, fakerID_ID, fakerIT, fakerJA, fakerKA_GE, fakerKO, fakerKU_ckb,
	fakerLV, fakerMK, fakerNB_NO, fakerNE, fakerNL, fakerNL_BE, fakerPL, fakerPT_BR,
	fakerPT_PT, fakerRO, fakerRO_MD, fakerRU, fakerSK, fakerSR_RS_latin, fakerSV, fakerTA_IN,
	fakerTH, fakerTR, fakerUK, fakerUR, fakerUZ_UZ_latin, fakerVI, fakerYO_NG, fakerZH_CN,
	fakerZH_TW, fakerZU_ZA
} from "@faker-js/faker";

// 1. Base Locales Map (Technical Keys)
export const LOCALES: Record<string, { name: string; faker: Faker }> = {
	"af_ZA": { name: "Afrikaans (South Africa)", faker: fakerAF_ZA },
	"ar": { name: "Arabic", faker: fakerAR },
	"az": { name: "Azerbaijani", faker: fakerAZ },
	"base": { name: "Base", faker: fakerBASE },
	"bn_BD": { name: "Bengali (Bangladesh)", faker: fakerBN_BD },
	"cs_CZ": { name: "Czech (Czechia)", faker: fakerCS_CZ },
	"cy": { name: "Welsh", faker: fakerCY },
	"da": { name: "Danish", faker: fakerDA },
	"de": { name: "German", faker: fakerDE },
	"de_AT": { name: "German (Austria)", faker: fakerDE_AT },
	"de_CH": { name: "German (Switzerland)", faker: fakerDE_CH },
	"dv": { name: "Maldivian", faker: fakerDV },
	"el": { name: "Greek", faker: fakerEL },
	"en": { name: "English", faker: fakerEN },
	"en_AU": { name: "English (Australia)", faker: fakerEN_AU },
	"en_AU_ocker": { name: "English (Australia Ocker)", faker: fakerEN_AU_ocker },
	"en_BORK": { name: "English (Bork)", faker: fakerEN_BORK },
	"en_CA": { name: "English (Canada)", faker: fakerEN_CA },
	"en_GB": { name: "English (Great Britain)", faker: fakerEN_GB },
	"en_GH": { name: "English (Ghana)", faker: fakerEN_GH },
	"en_HK": { name: "English (Hong Kong)", faker: fakerEN_HK },
	"en_IE": { name: "English (Ireland)", faker: fakerEN_IE },
	"en_IN": { name: "English (India)", faker: fakerEN_IN },
	"en_NG": { name: "English (Nigeria)", faker: fakerEN_NG },
	"en_US": { name: "English (United States)", faker: fakerEN_US },
	"en_ZA": { name: "English (South Africa)", faker: fakerEN_ZA },
	"eo": { name: "Esperanto", faker: fakerEO },
	"es": { name: "Spanish", faker: fakerES },
	"es_MX": { name: "Spanish (Mexico)", faker: fakerES_MX },
	"fa": { name: "Farsi/Persian", faker: fakerFA },
	"fi": { name: "Finnish", faker: fakerFI },
	"fr": { name: "French", faker: fakerFR },
	"fr_BE": { name: "French (Belgium)", faker: fakerFR_BE },
	"fr_CA": { name: "French (Canada)", faker: fakerFR_CA },
	"fr_CH": { name: "French (Switzerland)", faker: fakerFR_CH },
	"fr_LU": { name: "French (Luxembourg)", faker: fakerFR_LU },
	"fr_SN": { name: "French (Senegal)", faker: fakerFR_SN },
	"he": { name: "Hebrew", faker: fakerHE },
	"hr": { name: "Croatian", faker: fakerHR },
	"hu": { name: "Hungarian", faker: fakerHU },
	"hy": { name: "Armenian", faker: fakerHY },
	"id_ID": { name: "Indonesian (Indonesia)", faker: fakerID_ID },
	"it": { name: "Italian", faker: fakerIT },
	"ja": { name: "Japanese", faker: fakerJA },
	"ka_GE": { name: "Georgian (Georgia)", faker: fakerKA_GE },
	"ko": { name: "Korean", faker: fakerKO },
	"ku_ckb": { name: "Kurdish (Sorani)", faker: fakerKU_ckb },
	"lv": { name: "Latvian", faker: fakerLV },
	"mk": { name: "Macedonian", faker: fakerMK },
	"nb_NO": { name: "Norwegian (Norway)", faker: fakerNB_NO },
	"ne": { name: "Nepali", faker: fakerNE },
	"nl": { name: "Dutch", faker: fakerNL },
	"nl_BE": { name: "Dutch (Belgium)", faker: fakerNL_BE },
	"pl": { name: "Polish", faker: fakerPL },
	"pt_BR": { name: "Portuguese (Brazil)", faker: fakerPT_BR },
	"pt_PT": { name: "Portuguese (Portugal)", faker: fakerPT_PT },
	"ro": { name: "Romanian", faker: fakerRO },
	"ro_MD": { name: "Romanian (Moldova)", faker: fakerRO_MD },
	"ru": { name: "Russian", faker: fakerRU },
	"sk": { name: "Slovak", faker: fakerSK },
	"sr_RS_latin": { name: "Serbian (Serbia, Latin)", faker: fakerSR_RS_latin },
	"sv": { name: "Swedish", faker: fakerSV },
	"ta_IN": { name: "Tamil (India)", faker: fakerTA_IN },
	"th": { name: "Thai", faker: fakerTH },
	"tr": { name: "Turkish", faker: fakerTR },
	"uk": { name: "Ukrainian", faker: fakerUK },
	"ur": { name: "Urdu", faker: fakerUR },
	"uz_UZ_latin": { name: "Uzbek (Uzbekistan, Latin)", faker: fakerUZ_UZ_latin },
	"vi": { name: "Vietnamese", faker: fakerVI },
	"yo_NG": { name: "Yoruba (Nigeria)", faker: fakerYO_NG },
	"zh_CN": { name: "Chinese (China)", faker: fakerZH_CN },
	"zh_TW": { name: "Chinese (Taiwan)", faker: fakerZH_TW },
	"zu_ZA": { name: "Zulu (South Africa)", faker: fakerZU_ZA }
};

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
