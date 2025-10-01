// Map of common subtitle language codes in filenames
const FILENAME_LANG_PATTERNS: Record<string, string> = {
    en: 'EN',
    eng: 'EN',
    english: 'EN',
    es: 'ES',
    esp: 'ES',
    spa: 'ES',
    spanish: 'ES',
    fr: 'FR',
    fra: 'FR',
    french: 'FR',
    de: 'DE',
    deu: 'DE',
    ger: 'DE',
    german: 'DE',
    it: 'IT',
    ita: 'IT',
    italian: 'IT',
    pt: 'PT',
    por: 'PT',
    portuguese: 'PT',
    pob: 'PT-BR',
    ru: 'RU',
    rus: 'RU',
    russian: 'RU',
    ja: 'JA',
    jpn: 'JA',
    japanese: 'JA',
    ko: 'KO',
    kor: 'KO',
    korean: 'KO',
    zh: 'ZH',
    zho: 'ZH',
    chi: 'ZH',
    chinese: 'ZH',
  };
  
  export function detectLanguageFromFilename(filename: string): string {
    // Convert filename to lowercase for matching
    const lower = filename.toLowerCase();
    
    // Try to find language code in the filename
    for (const [code, lang] of Object.entries(FILENAME_LANG_PATTERNS)) {
      // Match patterns like: .en.srt, _en.srt, -en.srt, .eng.srt, etc.
      const pattern = new RegExp(`[._-]${code}[._-]|[._-]${code}$`);
      if (pattern.test(lower)) {
        return lang;
      }
    }
    
    return 'unknown';
  }
