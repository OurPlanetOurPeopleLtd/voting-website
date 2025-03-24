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


export type TCookieBannerText = {
    mainText:string;
    approveText: string;
    declineText: string;
}
export const getCookieBannerText = (locale: string): TCookieBannerText => {
    const englishMainText = "We use a single cookie for the sole purpose of protecting against misuse of the voting process.\n" +
        "We'd also like, but only if you agree, to set analytics cookies solely to understand how you use this\n" +
        "site. We do this to make the site work better.";
    const englishApproveText = "Accept these non-essential cookies";
    const englishDeclineText = "Reject these non-essential cookies";

    const resultTranslations: { [key: string]: TCookieBannerText } = {
        "en": {
            approveText: englishApproveText,
            declineText: englishDeclineText,
            mainText: englishMainText
        },
        "fr": {
            approveText: "Accepter ces cookies non essentiels",
            declineText: "Refuser ces cookies non essentiels",
            mainText: "Nous utilisons un seul cookie dans le seul but de protéger contre l&#39;utilisation abusive du processus de vote.\n" +
                "Nous aimerions également, mais seulement si vous êtes d&#39;accord, définir des cookies analytiques uniquement pour comprendre comment vous utilisez ce site.\n" +
                "Nous faisons cela pour améliorer le fonctionnement du site."
        },
        "nl": {
            approveText: "Accepteer deze niet-essentiële cookies",
            declineText: "Weiger deze niet-essentiële cookies",
            mainText: "We gebruiken een enkele cookie met als enig doel te beschermen tegen misbruik van het stemproces.\n" +
                "We zouden ook graag, maar alleen als u ermee instemt, analytische cookies instellen om te begrijpen hoe u deze site gebruikt.\n" +
                "Dit doen we om de site beter te laten werken."
        },
        "sr": {
            approveText: "Prihvatite ove neesencijalne kolačiće",
            declineText: "Odbijte ove neesencijalne kolačiće",
            mainText: "Koristimo jedan kolačić isključivo u svrhu zaštite od zloupotrebe procesa glasanja.\n" +
                "Takođe bismo želeli, ali samo ako se slažete, da postavimo analitičke kolačiće isključivo da bismo razumeli kako koristite ovaj sajt.\n" +
                "Radimo to da bi sajt bolje funkcionisao."
        },
        "hi": {
            approveText: "इन गैर-आवश्यक कुकीज़ को स्वीकार करें",
            declineText: "इन गैर-आवश्यक कुकीज़ को अस्वीकार करें",
            mainText: "हम मतदान प्रक्रिया के दुरुपयोग से बचाने के एकमात्र उद्देश्य के लिए एक एकल कुकी का उपयोग करते हैं।\n" +
                "हम यह भी चाहेंगे, लेकिन केवल यदि आप सहमत हैं, तो यह समझने के लिए कि आप इस साइट का उपयोग कैसे करते हैं, केवल विश्लेषणात्मक कुकीज़ सेट करें।\n" +
                "हम साइट को बेहतर ढंग से काम करने के लिए ऐसा करते हैं।"
        },
        "ja": {
            approveText: "これらの必須ではない Cookie を受け入れる",
            declineText: "これらの必須ではない Cookie を拒否する",
            mainText: "投票プロセスの悪用から保護する唯一の目的で、単一の Cookie を使用します。\n" +
                "また、お客様が同意した場合にのみ、お客様がこのサイトをどのように使用しているかを理解するためだけに分析 Cookie を設定したいと考えています。\n" +
                "これは、サイトの動作を改善するために行います。"
        },
        "zh": {
            approveText: "接受这些非必要的 Cookie",
            declineText: "拒绝这些非必要的 Cookie",
            mainText: "我们使用单个 Cookie，其唯一目的是防止投票过程被滥用。\n" +
                "我们也希望（但仅在您同意的情况下）设置分析 Cookie，以便了解您如何使用本网站。\n" +
                "我们这样做是为了使网站运行得更好。"
        },
        "es": {
            approveText: "Aceptar estas cookies no esenciales",
            declineText: "Rechazar estas cookies no esenciales",
            mainText: "Utilizamos una sola cookie con el único propósito de proteger contra el uso indebido del proceso de votación.\n" +
                "También nos gustaría, pero solo si está de acuerdo, establecer cookies analíticas únicamente para comprender cómo utiliza este sitio.\n" +
                "Hacemos esto para que el sitio funcione mejor."
        },
        "pt": {
            approveText: "Aceitar estes cookies não essenciais",
            declineText: "Rejeitar estes cookies não essenciais",
            mainText: "Usamos um único cookie com o único propósito de proteger contra o uso indevido do processo de votação.\n" +
                "Também gostaríamos, mas apenas se concordar, de definir cookies analíticos apenas para entender como você usa este site.\n" +
                "Fazemos isso para que o site funcione melhor."
        },
        "no": {
            approveText: "Godta disse ikke-essensielle informasjonskapslene",
            declineText: "Avvis disse ikke-essensielle informasjonskapslene",
            mainText: "Vi bruker en enkelt informasjonskapsel med det eneste formålet å beskytte mot misbruk av stemmeprosessen.\n" +
                "Vi vil også, men bare hvis du samtykker, sette analytiske informasjonskapsler kun for å forstå hvordan du bruker dette nettstedet.\n" +
                "Vi gjør dette for å få nettstedet til å fungere bedre."
        },
        "de": {
            approveText: "Diese nicht erforderlichen Cookies akzeptieren",
            declineText: "Diese nicht erforderlichen Cookies ablehnen",
            mainText: "Wir verwenden ein einzelnes Cookie zum alleinigen Zweck, den Missbrauch des Abstimmungsprozesses zu verhindern.\n" +
                "Wir möchten auch, aber nur wenn Sie zustimmen, Analyse-Cookies setzen, um zu verstehen, wie Sie diese Website nutzen.\n" +
                "Wir tun dies, um die Website zu verbessern."
        },
        "it": {
            approveText: "Accetta questi cookie non essenziali",
            declineText: "Rifiuta questi cookie non essenziali",
            mainText: "Utilizziamo un singolo cookie al solo scopo di proteggere dall'uso improprio del processo di voto.\n" +
                "Vorremmo anche, ma solo se sei d'accordo, impostare cookie analitici esclusivamente per capire come utilizzi questo sito.\n" +
                "Lo facciamo per far funzionare meglio il sito."
        },
        "ru": {
            approveText: "Принять эти необязательные файлы cookie",
            declineText: "Отклонить эти необязательные файлы cookie",
            mainText: "Мы используем один файл cookie с единственной целью защиты от злоупотребления процессом голосования.\n" +
                "Мы также хотели бы, но только с вашего согласия, устанавливать файлы cookie аналитики исключительно для понимания того, как вы используете этот сайт.\n" +
                "Мы делаем это, чтобы сайт работал лучше."
        },
        "ko": {
            approveText: "이러한 필수가 아닌 쿠키를 수락합니다.",
            declineText: "이러한 필수가 아닌 쿠키를 거부합니다.",
            mainText: "투표 과정의 오용으로부터 보호하기 위한 목적으로 단일 쿠키를 사용합니다.\n" +
                "또한 귀하가 동의하는 경우에만 귀하가 이 사이트를 어떻게 사용하는지 이해하기 위해 분석 쿠키를 설정하고 싶습니다.\n" +
                "사이트가 더 잘 작동하도록 하기 위해 이 작업을 수행합니다."
        },
        "ar": {
            approveText: "قبول ملفات تعريف الارتباط غير الضرورية هذه",
            declineText: "رفض ملفات تعريف الارتباط غير الضرورية هذه",
            mainText: "نستخدم ملف تعريف ارتباط واحد لغرض وحيد هو الحماية من إساءة استخدام عملية التصويت.\n" +
                "نود أيضًا، ولكن فقط إذا وافقت، تعيين ملفات تعريف ارتباط تحليلية فقط لفهم كيفية استخدامك لهذا الموقع.\n" +
                "نقوم بذلك لجعل الموقع يعمل بشكل أفضل."
        },
        "sv": {
            approveText: "Acceptera dessa icke-nödvändiga cookies",
            declineText: "Avvisa dessa icke-nödvändiga cookies",
            mainText: "Vi använder en enda cookie i det enda syftet att skydda mot missbruk av röstningsprocessen.\n" +
                "Vi skulle också vilja, men bara om du samtycker, ställa in analyscookies enbart för att förstå hur du använder den här webbplatsen.\n" +
                "Vi gör detta för att få webbplatsen att fungera bättre."
        },
        "da": {
            approveText: "Accepter disse ikke-væsentlige cookies",
            declineText: "Afvis disse ikke-væsentlige cookies",
            mainText: "Vi bruger en enkelt cookie med det ene formål at beskytte mod misbrug af stemmeprocessen.\n" +
                "Vi vil også, men kun hvis du samtykker, indstille analysecookies udelukkende for at forstå, hvordan du bruger dette websted.\n" +
                "Vi gør dette for at få webstedet til at fungere bedre."
        },
        "fi": {
            approveText: "Hyväksy nämä ei-välttämättömät evästeet",
            declineText: "Hylkää nämä ei-välttämättömät evästeet",
            mainText: "Käytämme yhtä evästettä yksinomaan äänestysprosessin väärinkäytöltä suojaamiseksi.\n" +
                "Haluaisimme myös, mutta vain jos suostut, asettaa analytiikkaevästeitä yksinomaan ymmärtääksemme, miten käytät tätä sivustoa.\n" +
                "Teemme tämän, jotta sivusto toimisi paremmin."
        },
        "pl": {
            approveText: "Zaakceptuj te nieistotne pliki cookie",
            declineText: "Odrzuć te nieistotne pliki cookie",
            mainText: "Używamy pojedynczego pliku cookie wyłącznie w celu ochrony przed nadużyciem procesu głosowania.\n" +
                "Chcielibyśmy również, ale tylko za Twoją zgodą, ustawić pliki cookie analityczne wyłącznie w celu zrozumienia, w jaki sposób korzystasz z tej witryny.\n" +
                "Robimy to, aby strona działała lepiej."
        },
        "tr": {
            approveText: "Bu zorunlu olmayan çerezleri kabul edin",
            declineText: "Bu zorunlu olmayan çerezleri reddedin",
            mainText: "Oylama sürecinin kötüye kullanımına karşı korunmak amacıyla tek bir çerez kullanıyoruz.\n" +
                "Ayrıca, yalnızca kabul etmeniz durumunda, bu siteyi nasıl kullandığınızı anlamak için analiz çerezleri ayarlamak istiyoruz.\n" +
                "Bunu, sitenin daha iyi çalışmasını sağlamak için yapıyoruz."
        },
    };

    return resultTranslations[locale] || resultTranslations["en"];
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
   
    const languageTranslations = microCopyTranslations[languageCode];
    if (languageTranslations && languageTranslations[key]) {
        return languageTranslations[key];
    }
    return microCopyTranslations["en"][key]; // Fallback to English
}