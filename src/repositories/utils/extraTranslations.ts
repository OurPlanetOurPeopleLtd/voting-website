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
    headerText?:string;
    privacyLinkText?:string;
    resetText?:string;
}
export const getCookieBannerText = (locale: string): TCookieBannerText => {
   /* const englishMainText = "We use a single cookie for the sole purpose of protecting against misuse of the voting process.\n" +
        "We'd also like, but only if you agree, to set analytics cookies solely to understand how you use this\n" +
        "site. We do this to make the site work better.";*/

    const englishMainText = "We use cookies to give you the best online experience. Strictly necessary cookies are on by default. Additional cookies are off by default."
    const englishApproveText = "Accept non-essential cookies";
    const englishDeclineText = "Reject non-essential cookies";
    const englishPrivacyText = "See privacy policy for details";
    const englishHeaderText = "Cookies on OurPlanetOurPeople";

    const resultTranslations: { [key: string]: TCookieBannerText } = {
        "en": {
            approveText: englishApproveText,
            declineText: englishDeclineText,
            mainText: englishMainText,
            headerText: englishHeaderText,
            privacyLinkText: englishPrivacyText,
            resetText: "Reset Cookies"
        },
        "fr": {
            approveText: "Accepter les cookies non essentiels",
            declineText: "Refuser les cookies non essentiels",
            mainText: "Nous utilisons des cookies pour vous offrir la meilleure expérience en ligne. Les cookies strictement nécessaires sont activés par défaut. Les cookies supplémentaires sont désactivés par défaut.",
            headerText: "Cookies sur OurPlanetOurPeople",
            privacyLinkText: "Voir la politique de confidentialité pour plus de détails",
            resetText: "Réinitialiser les cookies"
        },
        "nl": {
            approveText: "Niet-essentiële cookies accepteren",
            declineText: "Niet-essentiële cookies weigeren",
            mainText: "We gebruiken cookies om u de beste online ervaring te bieden. Strikt noodzakelijke cookies zijn standaard ingeschakeld. Aanvullende cookies zijn standaard uitgeschakeld.",
            headerText: "Cookies op OurPlanetOurPeople",
            privacyLinkText: "Zie privacybeleid voor details",
            resetText: "Cookies resetten"
        },
        "sr": {
            approveText: "Prihvati nebitne kolačiće",
            declineText: "Odbij nebitne kolačiće",
            mainText: "Koristimo kolačiće kako bismo vam pružili najbolje online iskustvo. Strogo neophodni kolačići su uključeni po zadanom. Dodatni kolačići su isključeni po zadanom.",
            headerText: "Kolačići na OurPlanetOurPeople",
            privacyLinkText: "Pogledajte politiku privatnosti za detalje",
            resetText: "Resetuj kolačiće"
        },
        "hi": {
            approveText: "गैर-आवश्यक कुकीज़ स्वीकार करें",
            declineText: "गैर-आवश्यक कुकीज़ अस्वीकार करें",
            mainText: "हम आपको सर्वोत्तम ऑनलाइन अनुभव देने के लिए कुकीज़ का उपयोग करते हैं। सख्ती से आवश्यक कुकीज़ डिफ़ॉल्ट रूप से चालू हैं। अतिरिक्त कुकीज़ डिफ़ॉल्ट रूप से बंद हैं।",
            headerText: "OurPlanetOurPeople पर कुकीज़",
            privacyLinkText: "विवरण के लिए गोपनीयता नीति देखें",
            resetText: "कुकीज़ रीसेट करें"
        },
        "ja": {
            approveText: "不要なCookieを受け入れる",
            declineText: "不要なCookieを拒否する",
            mainText: "最高のオンライン体験を提供するためにCookieを使用します。厳密に必要なCookieはデフォルトでオンになっています。追加のCookieはデフォルトでオフになっています。",
            headerText: "OurPlanetOurPeopleのCookie",
            privacyLinkText: "詳細についてはプライバシーポリシーをご覧ください",
            resetText: "Cookieをリセット"
        },
        "zh": {
            approveText: "接受非必要 Cookie",
            declineText: "拒绝非必要 Cookie",
            mainText: "我们使用 Cookie 为您提供最佳的在线体验。严格必要的 Cookie 默认开启。额外的 Cookie 默认关闭。",
            headerText: "OurPlanetOurPeople 上的 Cookie",
            privacyLinkText: "（有关详细信息，请参阅隐私政策）",
            resetText: "重置 Cookie"
        },
        "es": {
            approveText: "Aceptar cookies no esenciales",
            declineText: "Rechazar cookies no esenciales",
            mainText: "Utilizamos cookies para ofrecerle la mejor experiencia en línea. Las cookies estrictamente necesarias están activadas de forma predeterminada. Las cookies adicionales están desactivadas de forma predeterminada.",
            headerText: "Cookies en OurPlanetOurPeople",
            privacyLinkText: "Consulte la política de privacidad para obtener más detalles",
            resetText: "Restablecer cookies"
        },
        "pt": {
            approveText: "Aceitar cookies não essenciais",
            declineText: "Rejeitar cookies não essenciais",
            mainText: "Usamos cookies para lhe proporcionar a melhor experiência online. Os cookies estritamente necessários estão ativados por padrão. Os cookies adicionais estão desativados por padrão.",
            headerText: "Cookies no OurPlanetOurPeople",
            privacyLinkText: "Consulte a política de privacidade para obter detalhes",
            resetText: "Redefinir cookies"
        },
        "no": {
            approveText: "Godta ikke-essensielle informasjonskapsler",
            declineText: "Avvis ikke-essensielle informasjonskapsler",
            mainText: "Vi bruker informasjonskapsler for å gi deg den beste online opplevelsen. Strengt nødvendige informasjonskapsler er slått på som standard. Ytterligere informasjonskapsler er slått av som standard.",
            headerText: "Informasjonskapsler på OurPlanetOurPeople",
            privacyLinkText: "Se personvernerklæringen for detaljer",
            resetText: "Tilbakestill informasjonskapsler"
        },
        "de": {
            approveText: "Nicht notwendige Cookies akzeptieren",
            declineText: "Nicht notwendige Cookies ablehnen",
            mainText: "Wir verwenden Cookies, um Ihnen die beste Online-Erfahrung zu bieten. Unbedingt erforderliche Cookies sind standardmäßig aktiviert. Zusätzliche Cookies sind standardmäßig deaktiviert.",
            headerText: "Cookies auf OurPlanetOurPeople",
            privacyLinkText: "Weitere Informationen finden Sie in der Datenschutzerklärung",
            resetText: "Cookies zurücksetzen"
        },
        "it": {
            approveText: "Accetta cookie non essenziali",
            declineText: "Rifiuta cookie non essenziali",
            mainText: "Utilizziamo i cookie per offrirti la migliore esperienza online. I cookie strettamente necessari sono attivati per impostazione predefinita. I cookie aggiuntivi sono disattivati per impostazione predefinita.",
            headerText: "Cookie su OurPlanetOurPeople",
            privacyLinkText: "Consulta l'informativa sulla privacy per i dettagli",
            resetText: "Ripristina cookie"
        },
        "ru": {
            approveText: "Принять необязательные файлы cookie",
            declineText: "Отклонить необязательные файлы cookie",
            mainText: "Мы используем файлы cookie, чтобы предоставить вам лучший онлайн-опыт. Строго необходимые файлы cookie включены по умолчанию. Дополнительные файлы cookie отключены по умолчанию.",
            headerText: "Файлы cookie на OurPlanetOurPeople",
            privacyLinkText: "Подробности см. в политике конфиденциальности",
            resetText: "Сбросить файлы cookie"
        },
        "ko": {
            approveText: "필수적이지 않은 쿠키 허용",
            declineText: "필수적이지 않은 쿠키 거부",
            mainText: "최고의 온라인 경험을 제공하기 위해 쿠키를 사용합니다. 엄격히 필요한 쿠키는 기본적으로 활성화되어 있습니다. 추가 쿠키는 기본적으로 비활성화되어 있습니다.",
            headerText: "OurPlanetOurPeople의 쿠키",
            privacyLinkText: "자세한 내용은 개인 정보 보호 정책을 참조하십시오.",
            resetText: "쿠키 재설정"
        },
        "ar": {
            approveText: "قبول ملفات تعريف الارتباط غير الضرورية",
            declineText: "رفض ملفات تعريف الارتباط غير الضرورية",
            mainText: "نستخدم ملفات تعريف الارتباط لنمنحك أفضل تجربة عبر الإنترنت. يتم تشغيل ملفات تعريف الارتباط الضرورية للغاية افتراضيًا. يتم إيقاف تشغيل ملفات تعريف الارتباط الإضافية افتراضيًا.",
            headerText: "ملفات تعريف الارتباط على OurPlanetOurPeople",
            privacyLinkText: "راجع سياسة الخصوصية للحصول على التفاصيل",
            resetText: "إعادة تعيين ملفات تعريف الارتباط"
        },
        "sv": {
            approveText: "Acceptera icke-nödvändiga cookies",
            declineText: "Avvisa icke-nödvändiga cookies",
            mainText: "Vi använder cookies för att ge dig den bästa onlineupplevelsen. Strikt nödvändiga cookies är aktiverade som standard. Ytterligare cookies är inaktiverade som standard.",
            headerText: "Cookies på OurPlanetOurPeople",
            privacyLinkText: "Se integritetspolicyn för mer information",
            resetText: "Återställ cookies"
        },
        "da": {
            approveText: "Accepter ikke-væsentlige cookies",
            declineText: "Afvis ikke-væsentlige cookies",
            mainText: "Vi bruger cookies for at give dig den bedste onlineoplevelse. Strengt nødvendige cookies er slået til som standard. Yderligere cookies er slået fra som standard.",
            headerText: "Cookies på OurPlanetOurPeople",
            privacyLinkText: "Se privatlivspolitikken for detaljer",
            resetText: "Nulstil cookies"
        },
        "fi": {
            approveText: "Hyväksy ei-välttämättömät evästeet",
            declineText: "Hylkää ei-välttämättömät evästeet",
            mainText: "Käytämme evästeitä tarjotaksemme sinulle parhaan mahdollisen verkkokokemuksen. Välttämättömät evästeet ovat oletusarvoisesti käytössä. Lisäevästeet ovat oletusarvoisesti poissa käytöstä.",
            headerText: "Evästeet sivustolla OurPlanetOurPeople",
            privacyLinkText: "Katso lisätietoja tietosuojakäytännöstä",
            resetText: "Nollaa evästeet"
        },
        "pl": {
            approveText: "Zaakceptuj nieistotne pliki cookie",
            declineText: "Odrzuć nieistotne pliki cookie",
            mainText: "Używamy plików cookie, aby zapewnić Ci najlepsze wrażenia online. Ściśle niezbędne pliki cookie są domyślnie włączone. Dodatkowe pliki cookie są domyślnie wyłączone.",
            headerText: "Pliki cookie na OurPlanetOurPeople",
            privacyLinkText: "Zobacz politykę prywatności, aby uzyskać szczegółowe informacje",
            resetText: "Zresetuj pliki cookie"
        },
        "tr": {
            approveText: "Gerekli olmayan çerezleri kabul et",
            declineText: "Gerekli olmayan çerezleri reddet",
            mainText: "Size en iyi çevrimiçi deneyimi sunmak için çerezleri kullanıyoruz. Kesinlikle gerekli çerezler varsayılan olarak açıktır. Ek çerezler varsayılan olarak kapalıdır.",
            headerText: "OurPlanetOurPeople'daki Çerezler",
            privacyLinkText: "Ayrıntılar için gizlilik politikasına bakın",
            resetText: "Çerezleri sıfırla"
        }
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
    "en": "Get Started",
    "fr": "Commencer",
    "nl": "Beginnen",
    "sr": "Почни",
    "hi": "शुरू करें",
    "ja": "開始する",
    "zh": "开始使用",
    "es": "Comenzar",
    "pt": "Começar",
    "no": "Kom i gang",
    "de": "Loslegen",
    "it": "Inizia",
    "ru": "Начать",
    "ko": "시작하기",
    "ar": "ابدأ",
    "sv": "Kom igång",
    "da": "Kom i gang",
    "fi": "Aloita",
    "pl": "Rozpocznij",
    "tr": "Başla",
    "el": "Ξεκίνα",
    "id": "Mulai",
    "uk": "Почати",
    "vi": "Bắt đầu",
    "th": "เริ่มต้น",
    "he": "התחל",
    "hu": "Kezdés",
    "ro": "Începe",
    "cs": "Začít",
    "sk": "Začať"
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