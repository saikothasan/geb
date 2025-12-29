import { allFakers, allLocales, type Faker } from "@faker-js/faker";

// 1. Dynamically build Base Locales Map
export const LOCALES: Record<string, { name: string; faker: Faker }> = {};

Object.keys(allFakers).forEach((key) => {
	const localeKey = key as keyof typeof allFakers;
	// Cast to any to access title safely if types mismatch
	const localeDef = (allLocales as any)[localeKey];
	
	LOCALES[key] = {
		name: localeDef?.title || key, 
		faker: allFakers[localeKey],
	};
});

// 2. User-Friendly Country Code Map
export const COUNTRY_TO_LOCALE: Record<string, string> = {
	"ZA": "af_ZA", "AE": "ar", "SA": "ar", "AZ": "az", "BD": "bn_BD", 
	"CZ": "cs_CZ", "DK": "da", "DE": "de", "AT": "de_AT", "CH": "de_CH", 
	"GR": "el", "US": "en_US", "AU": "en_AU", "CA": "en_CA", "GB": "en_GB", 
	// ... (rest of the map)
	"VN": "vi", "CN": "zh_CN", "TW": "zh_TW"
};
