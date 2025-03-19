export function getShareText(locale:string)
{
    //todo at some point put this in Dato
    const socialShareTranslations: { [key: string]: string } = {
        "en": "And/or share via social media",
        "fr": "Et/ou partager via les réseaux sociaux",
        "nl": "En/of delen via sociale media",
        "sr": "I/ili podelite putem društvenih mreža",
        "hi": "और/या सोशल मीडिया के माध्यम से साझा करें",
        "ja": "ソーシャルメディアで共有する",
        "zh": "通过社交媒体分享",
        "es": "Y/o compartir a través de las redes sociales",
        "pt": "E/ou compartilhar através das redes sociais",
        "no": "Og/eller del via sosiale medier",
    };
      

    const translation = socialShareTranslations[locale];

    if (translation) {
        return translation;
    } else {
        console.warn(`Translation for locale "${locale}" not found. Falling back to English. you need to update getShareText`);
        return socialShareTranslations["en"]; // Fallback to English
    }
}

const resultTranslations: { [key: string]: string } = {
    "en": "Result",
    "fr": "Résultat",
    "nl": "Resultaat",
    "sr": "Rezultat",
    "hi": "परिणाम",
    "ja": "結果",
    "zh": "结果",
    "es": "Resultado",
    "pt": "Resultado",
    "no": "Resultat",
    "de": "Ergebnis", //Added German
    "it": "Risultato", //Added Italian
    "ru": "Результат", //Added Russian
    "ko": "결과", // Added Korean
    "ar": "نتيجة", //Added Arabic
    "sv": "Resultat", // Added Swedish
    "da": "Resultat", // Added Danish
    "fi": "Tulos", // Added Finnish
    "pl": "Wynik", // Added Polish
    "tr": "Sonuç" //Added Turkish
};

// Example usage:
export function getResultTranslation(languageCode: string): string {
    return resultTranslations[languageCode] || resultTranslations["en"]; // Default to English if not found
}

const yesTranslations: { [key: string]: string } = {
    "en": "Yes",
    "fr": "Oui",
    "nl": "Ja",
    "sr": "Da",
    "hi": "हाँ",
    "ja": "はい",
    "zh": "是",
    "es": "Sí",
    "pt": "Sim",
    "no": "Ja",
    "de": "Ja",
    "it": "Sì",
    "ru": "Да",
    "ko": "예",
    "ar": "نعم",
    "sv": "Ja",
    "da": "Ja",
    "fi": "Kyllä",
    "pl": "Tak",
    "tr": "Evet"
};

const noTranslations: { [key: string]: string } = {
    "en": "No",
    "fr": "Non",
    "nl": "Nee",
    "sr": "Ne",
    "hi": "नहीं",
    "ja": "いいえ",
    "zh": "否",
    "es": "No",
    "pt": "Não",
    "no": "Nei",
    "de": "Nein",
    "it": "No",
    "ru": "Нет",
    "ko": "아니요",
    "ar": "لا",
    "sv": "Nej",
    "da": "Nej",
    "fi": "Ei",
    "pl": "Nie",
    "tr": "Hayır"
};

export function getYesTranslation(languageCode: string): string {
    return yesTranslations[languageCode] || yesTranslations["en"];
}

export function getNoTranslation(languageCode: string): string {
    return noTranslations[languageCode] || noTranslations["en"];
}

const donateTranslations: { [key: string]: string } = {
    "en": "Donate",
    "fr": "Faire un don",
    "nl": "Doneren",
    "sr": "Doniraj",
    "hi": "दान करें",
    "ja": "寄付する",
    "zh": "捐赠",
    "es": "Donar",
    "pt": "Doar",
    "no": "Doner",
    "de": "Spenden",
    "it": "Donare",
    "ru": "Пожертвовать",
    "ko": "기부하다",
    "ar": "تبرع",
    "sv": "Donera",
    "da": "Donér",
    "fi": "Lahjoita",
    "pl": "Podaruj",
    "tr": "Bağış Yap"
};

// Example usage:
export function getDonateTranslation(languageCode: string): string {
    return donateTranslations[languageCode] || donateTranslations["en"]; // Default to English if not found
}


const nextTranslations: { [key: string]: string } = {
    "en": "Next",
    "fr": "Suivant",
    "nl": "Volgende",
    "sr": "Sledeći",
    "hi": "अगला",
    "ja": "次へ",
    "zh": "下一个",
    "es": "Siguiente",
    "pt": "Próximo",
    "no": "Neste",
    "de": "Nächste",
    "it": "Prossimo",
    "ru": "Следующий",
    "ko": "다음",
    "ar": "التالي",
    "sv": "Nästa",
    "da": "Næste",
    "fi": "Seuraava",
    "pl": "Następny",
    "tr": "Sonraki",
    "el": "Επόμενο", // Added Greek
    "id": "Selanjutnya", // Added Indonesian
    "uk": "Наступний", // Added Ukrainian
    "vi": "Tiếp theo", // Added Vietnamese
    "th": "ถัดไป", // Added Thai
    "he": "הבא", // Added Hebrew
    "hu": "Következő", // Added Hungarian
    "ro": "Următorul", // Added Romanian
    "cs": "Další", // Added Czech
    "sk": "Ďalší" // Added Slovak
};

export function getNextTranslation(languageCode: string): string {
    return nextTranslations[languageCode] || nextTranslations["en"];
}

interface CountryResultsTranslations {
    [languageCode: string]: string;
}

const countryResultsTranslations: CountryResultsTranslations = {
    "en": "All Countries Results",
    "fr": "Résultats de tous les pays",
    "nl": "Resultaten van alle landen",
    "sr": "Rezultati svih zemalja",
    "hi": "सभी देशों के परिणाम",
    "ja": "すべての国の結果",
    "zh": "所有国家的结果",
    "es": "Resultados de todos los países",
    "pt": "Resultados de todos os países",
    "no": "Resultater for alle land"
};

export function getCountryResultsTranslation(languageCode: string): string {
    return countryResultsTranslations[languageCode] || countryResultsTranslations["en"];
}


interface LanguageTranslations {
    [key: string]: string; // Allows any string key with a string value
}

interface Translations {
    [languageCode: string]: LanguageTranslations;
}

const microCopyTranslations: Translations = {
    "en": {
        "videoPrompt": "Please watch the short video to find out about sharing the cause. And/or go directly to the",
        "shareButton": "sharing page",
        "inDepthLink": "visiting our In Depth page",
        "orFindOutMore": "Or find out more by"
    },
    "fr": {
        "videoPrompt": "Veuillez regarder la courte vidéo ci-dessous et aider la",
        "shareButton": "cause en partageant",
        "inDepthLink": "visitant notre page Approfondie",
        "orFindOutMore": "Ou en savoir plus en"
    },
        
        "nl": {
        "videoPrompt": "Bekijk de korte video hieronder en help de",
            "shareButton": "zaak door te delen",
            "inDepthLink": "onze In Depth-pagina te bezoeken",
            "orFindOutMore": "Of kom meer te weten door"
    },
    "sr": {
        "videoPrompt": "Molimo vas da pogledate kratki video ispod i pomognete",
            "shareButton": "cilju deljenjem",
            "inDepthLink": "posetom naše In Depth stranice",
            "orFindOutMore": "Ili saznajte više tako što ćete"
    },
    "hi": {
        "videoPrompt": "कृपया नीचे दिया गया छोटा वीडियो देखें और मदद करें",
            "shareButton": "साझा करके कारण",
            "inDepthLink": "हमारे इन डेप्थ पेज पर जाकर",
            "orFindOutMore": "या हमारे इन डेप्थ पेज पर जाकर अधिक जानकारी प्राप्त करें।"
    },
    "ja": {
        "videoPrompt": "下の短いビデオを見て、助けてください",
            "shareButton": "共有して原因",
            "inDepthLink": "詳細ページをご覧ください",
            "orFindOutMore": "詳細ページをご覧ください。"
    },
    "zh": {
        "videoPrompt": "请观看下面的短片并帮助",
            "shareButton": "通过分享原因",
            "inDepthLink": "访问我们的深入页面",
            "orFindOutMore": "或访问我们的深入页面了解更多信息。"
    },
    "es": {
        "videoPrompt": "Por favor, vea el breve video a continuación y ayude a",
            "shareButton": "la causa compartiendo",
            "inDepthLink": "visitando nuestra página En profundidad",
            "orFindOutMore": "O infórmese más visitando nuestra página En profundidad."
    },
    "pt": {
        "videoPrompt": "Por favor, assista ao pequeno vídeo abaixo e ajude a",
            "shareButton": "causa compartilhando",
            "inDepthLink": "visitando nossa página Detalhada",
            "orFindOutMore": "Ou saiba mais visitando nossa página Detalhada."
    },
    "no": {
        "videoPrompt": "Vennligst se den korte videoen nedenfor og hjelp",
            "shareButton": "saken ved å dele",
            "inDepthLink": "ved å besøke vår In Depth-side",
            "orFindOutMore": "Eller finn ut mer ved å besøke vår In Depth-side."
    }
    
};

export function getTranslation(languageCode: string, key: string): string {
    console.log("trying micropy for " + languageCode)
    const languageTranslations = microCopyTranslations[languageCode];
    if (languageTranslations && languageTranslations[key]) {
        return languageTranslations[key];
    }
    return microCopyTranslations["en"][key]; // Fallback to English
}