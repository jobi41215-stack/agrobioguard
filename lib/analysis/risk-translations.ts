import type { IdentificationLanguage } from "../identification-translations";
import type { IdentificationCategory, RiskLevel } from "./types";

type RiskText = {
  title: string;
  description: string;
  recommendation: string;
};

const genericRiskTranslations: Record<
  IdentificationLanguage,
  Record<string, RiskText>
> = {
  English: {
    pepper: {
      title: "Low agricultural risk",
      description:
        "AgroBioGuard identified this observation as a pepper-family plant. The current local rule set does not classify the identified plant itself as an immediate agricultural or ecological threat.",
      recommendation:
        "Continue normal crop monitoring and inspect the plant for visible signs of pests, disease, or abnormal growth.",
    },
    weed: {
      title: "Moderate agricultural risk",
      description:
        "The observation has been classified as a weed. Weeds can compete with crops for water, nutrients, sunlight, and space.",
      recommendation:
        "Inspect the surrounding crop area and consider appropriate weed-management practices before taking action.",
    },
    pest: {
      title: "High agricultural monitoring priority",
      description:
        "The observation has been classified as a pest. Pest observations may affect nearby agricultural plants and therefore require closer monitoring.",
      recommendation:
        "Inspect nearby plants for signs of damage and confirm the identification before applying any pest-control measure.",
    },
    insect: {
      title: "Moderate monitoring priority",
      description:
        "The observation has been classified as an insect. The current AgroBioGuard rule set does not determine whether this insect is beneficial or harmful at species level.",
      recommendation:
        "Review the identification and inspect nearby crops before taking control measures.",
    },
    fauna: {
      title: "Ecological monitoring required",
      description:
        "The observation has been classified as fauna. The current rule set does not automatically classify the animal as an agricultural or ecological threat.",
      recommendation:
        "Observe from a safe distance and review the identification before taking agricultural or wildlife-related action.",
    },
    unknown: {
      title: "Risk assessment requires review",
      description:
        "AgroBioGuard does not currently have enough species-specific knowledge to determine an agricultural or ecological risk for this observation.",
      recommendation:
        "Review the identification before taking agricultural or ecological action.",
    },
  },

  Tamil: {
    pepper: {
      title: "குறைந்த வேளாண் அபாயம்",
      description:
        "AgroBioGuard இந்த பதிவை மிளகாய் குடும்பத்தைச் சேர்ந்த தாவரமாக அடையாளம் கண்டுள்ளது. தற்போதைய விதிமுறைகள் இந்த தாவரத்தை உடனடி வேளாண் அல்லது சூழலியல் அபாயமாக வகைப்படுத்தவில்லை.",
      recommendation:
        "வழக்கமான பயிர் கண்காணிப்பைத் தொடரவும். பூச்சிகள், நோய் அல்லது அசாதாரண வளர்ச்சிக்கான அறிகுறிகளைப் பரிசோதிக்கவும்.",
    },
    weed: {
      title: "மிதமான வேளாண் அபாயம்",
      description:
        "இந்த பதிவு ஒரு களையாக வகைப்படுத்தப்பட்டுள்ளது. களைகள் நீர், ஊட்டச்சத்து, சூரியஒளி மற்றும் இடத்திற்காக பயிர்களுடன் போட்டியிடலாம்.",
      recommendation:
        "சுற்றியுள்ள பயிர் பகுதியை ஆய்வு செய்து, நடவடிக்கை எடுப்பதற்கு முன் பொருத்தமான களை மேலாண்மை முறைகளைப் பரிசீலிக்கவும்.",
    },
    pest: {
      title: "அதிக வேளாண் கண்காணிப்பு முன்னுரிமை",
      description:
        "இந்த பதிவு ஒரு பூச்சியாக வகைப்படுத்தப்பட்டுள்ளது. பூச்சி பதிவுகள் அருகிலுள்ள வேளாண் தாவரங்களை பாதிக்கக்கூடும் என்பதால் நெருக்கமான கண்காணிப்பு தேவைப்படுகிறது.",
      recommendation:
        "அருகிலுள்ள தாவரங்களில் சேதத்தின் அறிகுறிகளைப் பரிசோதித்து, பூச்சிக்கட்டுப்பாட்டு நடவடிக்கைகளை மேற்கொள்ளும் முன் அடையாளத்தை உறுதிப்படுத்தவும்.",
    },
    insect: {
      title: "மிதமான கண்காணிப்பு முன்னுரிமை",
      description:
        "இந்த பதிவு ஒரு பூச்சியாக வகைப்படுத்தப்பட்டுள்ளது. தற்போதைய AgroBioGuard விதிமுறைகள் இந்த பூச்சி பயனுள்ளதா அல்லது தீங்கு விளைவிப்பதா என்பதை இன அளவில் தீர்மானிக்கவில்லை.",
      recommendation:
        "அடையாளத்தை மதிப்பாய்வு செய்து, கட்டுப்பாட்டு நடவடிக்கைகளை மேற்கொள்வதற்கு முன் அருகிலுள்ள பயிர்களை ஆய்வு செய்யவும்.",
    },
    fauna: {
      title: "சூழலியல் கண்காணிப்பு தேவை",
      description:
        "இந்த பதிவு விலங்கினமாக வகைப்படுத்தப்பட்டுள்ளது. தற்போதைய விதிமுறைகள் விலங்கினத்தை தானாகவே வேளாண் அல்லது சூழலியல் அச்சுறுத்தலாக வகைப்படுத்தவில்லை.",
      recommendation:
        "பாதுகாப்பான தூரத்தில் இருந்து கண்காணித்து, வேளாண் அல்லது வனவிலங்கு தொடர்பான நடவடிக்கைகளை எடுப்பதற்கு முன் அடையாளத்தை மதிப்பாய்வு செய்யவும்.",
    },
    unknown: {
      title: "அபாய மதிப்பீட்டிற்கு மதிப்பாய்வு தேவை",
      description:
        "இந்த பதிவிற்கான வேளாண் அல்லது சூழலியல் அபாயத்தைத் தீர்மானிக்க AgroBioGuard-இல் தற்போது போதுமான இன-குறிப்பிட்ட தகவல் இல்லை.",
      recommendation:
        "வேளாண் அல்லது சூழலியல் நடவடிக்கை எடுப்பதற்கு முன் அடையாளத்தை மதிப்பாய்வு செய்யவும்.",
    },
  },

  Telugu: {
    pepper: {
      title: "తక్కువ వ్యవసాయ ప్రమాదం",
      description:
        "AgroBioGuard ఈ పరిశీలనను మిరప కుటుంబానికి చెందిన మొక్కగా గుర్తించింది. ప్రస్తుత నియమాలు ఈ మొక్కను తక్షణ వ్యవసాయ లేదా పర్యావరణ ప్రమాదంగా వర్గీకరించవు.",
      recommendation:
        "సాధారణ పంట పర్యవేక్షణను కొనసాగించండి మరియు పురుగులు, వ్యాధి లేదా అసాధారణ పెరుగుదల సంకేతాలను పరిశీలించండి.",
    },
    weed: {
      title: "మధ్యస్థ వ్యవసాయ ప్రమాదం",
      description:
        "ఈ పరిశీలనను కలుపు మొక్కగా వర్గీకరించారు. కలుపు మొక్కలు నీరు, పోషకాలు, సూర్యకాంతి మరియు స్థలం కోసం పంటలతో పోటీ పడవచ్చు.",
      recommendation:
        "చుట్టుపక్కల పంట ప్రాంతాన్ని పరిశీలించి, చర్య తీసుకునే ముందు తగిన కలుపు నిర్వహణ పద్ధతులను పరిగణించండి.",
    },
    pest: {
      title: "అధిక వ్యవసాయ పర్యవేక్షణ ప్రాధాన్యత",
      description:
        "ఈ పరిశీలనను పురుగుగా వర్గీకరించారు. పురుగు పరిశీలనలు సమీపంలోని వ్యవసాయ మొక్కలను ప్రభావితం చేయవచ్చు కాబట్టి మరింత పర్యవేక్షణ అవసరం.",
      recommendation:
        "సమీపంలోని మొక్కల్లో నష్టం సంకేతాలను పరిశీలించి, పురుగు నియంత్రణ చర్యలకు ముందు గుర్తింపును నిర్ధారించండి.",
    },
    insect: {
      title: "మధ్యస్థ పర్యవేక్షణ ప్రాధాన్యత",
      description:
        "ఈ పరిశీలనను కీటకంగా వర్గీకరించారు. ప్రస్తుత AgroBioGuard నియమాలు ఈ కీటకం ప్రయోజనకరమా లేదా హానికరమా అనే విషయాన్ని జాతి స్థాయిలో నిర్ణయించవు.",
      recommendation:
        "గుర్తింపును సమీక్షించి, నియంత్రణ చర్యలకు ముందు సమీపంలోని పంటలను పరిశీలించండి.",
    },
    fauna: {
      title: "పర్యావరణ పర్యవేక్షణ అవసరం",
      description:
        "ఈ పరిశీలనను జంతుజాలంగా వర్గీకరించారు. ప్రస్తుత నియమాలు జంతువును స్వయంచాలకంగా వ్యవసాయ లేదా పర్యావరణ ముప్పుగా వర్గీకరించవు.",
      recommendation:
        "సురక్షిత దూరంలో ఉండి పరిశీలించండి మరియు వ్యవసాయ లేదా వన్యప్రాణి చర్యలకు ముందు గుర్తింపును సమీక్షించండి.",
    },
    unknown: {
      title: "ప్రమాద అంచనాకు సమీక్ష అవసరం",
      description:
        "ఈ పరిశీలనకు సంబంధించిన వ్యవసాయ లేదా పర్యావరణ ప్రమాదాన్ని నిర్ణయించడానికి AgroBioGuard వద్ద ప్రస్తుతం తగిన జాతి-ప్రత్యేక సమాచారం లేదు.",
      recommendation:
        "వ్యవసాయ లేదా పర్యావరణ చర్యలు తీసుకునే ముందు గుర్తింపును సమీక్షించండి.",
    },
  },

  Hindi: {
    pepper: {
      title: "कम कृषि जोखिम",
      description:
        "AgroBioGuard ने इस अवलोकन को मिर्च परिवार के पौधे के रूप में पहचाना है। वर्तमान नियम इस पौधे को तत्काल कृषि या पारिस्थितिक जोखिम के रूप में वर्गीकृत नहीं करते हैं।",
      recommendation:
        "सामान्य फसल निगरानी जारी रखें और कीट, रोग या असामान्य वृद्धि के संकेतों की जाँच करें।",
    },
    weed: {
      title: "मध्यम कृषि जोखिम",
      description:
        "इस अवलोकन को खरपतवार के रूप में वर्गीकृत किया गया है। खरपतवार पानी, पोषक तत्वों, धूप और स्थान के लिए फसलों से प्रतिस्पर्धा कर सकते हैं।",
      recommendation:
        "आसपास के फसल क्षेत्र का निरीक्षण करें और कार्रवाई से पहले उचित खरपतवार प्रबंधन उपायों पर विचार करें।",
    },
    pest: {
      title: "उच्च कृषि निगरानी प्राथमिकता",
      description:
        "इस अवलोकन को कीट के रूप में वर्गीकृत किया गया है। कीट आसपास के कृषि पौधों को प्रभावित कर सकते हैं, इसलिए नज़दीकी निगरानी आवश्यक है।",
      recommendation:
        "पास के पौधों में नुकसान के संकेतों की जाँच करें और कीट नियंत्रण उपाय लागू करने से पहले पहचान की पुष्टि करें।",
    },
    insect: {
      title: "मध्यम निगरानी प्राथमिकता",
      description:
        "इस अवलोकन को कीट के रूप में वर्गीकृत किया गया है। वर्तमान AgroBioGuard नियम यह निर्धारित नहीं करते कि यह कीट प्रजाति स्तर पर लाभकारी है या हानिकारक।",
      recommendation:
        "पहचान की समीक्षा करें और नियंत्रण उपायों से पहले आसपास की फसलों का निरीक्षण करें।",
    },
    fauna: {
      title: "पारिस्थितिक निगरानी आवश्यक",
      description:
        "इस अवलोकन को जीव-जंतु के रूप में वर्गीकृत किया गया है। वर्तमान नियम जानवर को स्वतः कृषि या पारिस्थितिक खतरे के रूप में वर्गीकृत नहीं करते हैं।",
      recommendation:
        "सुरक्षित दूरी से निरीक्षण करें और कृषि या वन्यजीव संबंधी कार्रवाई से पहले पहचान की समीक्षा करें।",
    },
    unknown: {
      title: "जोखिम आकलन के लिए समीक्षा आवश्यक",
      description:
        "इस अवलोकन के लिए कृषि या पारिस्थितिक जोखिम निर्धारित करने हेतु AgroBioGuard के पास वर्तमान में पर्याप्त प्रजाति-विशिष्ट जानकारी नहीं है।",
      recommendation:
        "कृषि या पारिस्थितिक कार्रवाई करने से पहले पहचान की समीक्षा करें।",
    },
  },

  Kannada: {
    pepper: {
      title: "ಕಡಿಮೆ ಕೃಷಿ ಅಪಾಯ",
      description:
        "AgroBioGuard ಈ ವೀಕ್ಷಣೆಯನ್ನು ಮೆಣಸಿನ ಕುಟುಂಬದ ಸಸ್ಯವೆಂದು ಗುರುತಿಸಿದೆ. ಪ್ರಸ್ತುತ ನಿಯಮಗಳು ಈ ಸಸ್ಯವನ್ನು ತಕ್ಷಣದ ಕೃಷಿ ಅಥವಾ ಪರಿಸರ ಅಪಾಯವೆಂದು ವರ್ಗೀಕರಿಸುವುದಿಲ್ಲ.",
      recommendation:
        "ಸಾಮಾನ್ಯ ಬೆಳೆ ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಮುಂದುವರಿಸಿ ಮತ್ತು ಕೀಟ, ರೋಗ ಅಥವಾ ಅಸಾಮಾನ್ಯ ಬೆಳವಣಿಗೆಯ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
    weed: {
      title: "ಮಧ್ಯಮ ಕೃಷಿ ಅಪಾಯ",
      description:
        "ಈ ವೀಕ್ಷಣೆಯನ್ನು ಕಳೆಯಾಗಿ ವರ್ಗೀಕರಿಸಲಾಗಿದೆ. ಕಳೆಗಳು ನೀರು, ಪೋಷಕಾಂಶಗಳು, ಸೂರ್ಯರಶ್ಮಿ ಮತ್ತು ಸ್ಥಳಕ್ಕಾಗಿ ಬೆಳೆಗಳೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸಬಹುದು.",
      recommendation:
        "ಸುತ್ತಮುತ್ತಲಿನ ಬೆಳೆ ಪ್ರದೇಶವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮೊದಲು ಸೂಕ್ತ ಕಳೆ ನಿರ್ವಹಣಾ ವಿಧಾನಗಳನ್ನು ಪರಿಗಣಿಸಿ.",
    },
    pest: {
      title: "ಹೆಚ್ಚಿನ ಕೃಷಿ ಮೇಲ್ವಿಚಾರಣಾ ಆದ್ಯತೆ",
      description:
        "ಈ ವೀಕ್ಷಣೆಯನ್ನು ಕೀಟವೆಂದು ವರ್ಗೀಕರಿಸಲಾಗಿದೆ. ಕೀಟಗಳು ಸಮೀಪದ ಕೃಷಿ ಸಸ್ಯಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸಾಧ್ಯತೆಯಿರುವುದರಿಂದ ಹೆಚ್ಚಿನ ಮೇಲ್ವಿಚಾರಣೆ ಅಗತ್ಯ.",
      recommendation:
        "ಸಮೀಪದ ಸಸ್ಯಗಳಲ್ಲಿ ಹಾನಿಯ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ದೃಢಪಡಿಸಿ.",
    },
    insect: {
      title: "ಮಧ್ಯಮ ಮೇಲ್ವಿಚಾರಣಾ ಆದ್ಯತೆ",
      description:
        "ಈ ವೀಕ್ಷಣೆಯನ್ನು ಕೀಟವೆಂದು ವರ್ಗೀಕರಿಸಲಾಗಿದೆ. ಪ್ರಸ್ತುತ AgroBioGuard ನಿಯಮಗಳು ಈ ಕೀಟವು ಉಪಯುಕ್ತವೇ ಅಥವಾ ಹಾನಿಕಾರಕವೇ ಎಂಬುದನ್ನು ಜಾತಿ ಮಟ್ಟದಲ್ಲಿ ನಿರ್ಧರಿಸುವುದಿಲ್ಲ.",
      recommendation:
        "ಗುರುತಿಸುವಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳ ಮೊದಲು ಸಮೀಪದ ಬೆಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
    fauna: {
      title: "ಪರಿಸರ ಮೇಲ್ವಿಚಾರಣೆ ಅಗತ್ಯ",
      description:
        "ಈ ವೀಕ್ಷಣೆಯನ್ನು ಪ್ರಾಣಿಜಾಲವೆಂದು ವರ್ಗೀಕರಿಸಲಾಗಿದೆ. ಪ್ರಸ್ತುತ ನಿಯಮಗಳು ಪ್ರಾಣಿಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕೃಷಿ ಅಥವಾ ಪರಿಸರ ಅಪಾಯವೆಂದು ವರ್ಗೀಕರಿಸುವುದಿಲ್ಲ.",
      recommendation:
        "ಸುರಕ್ಷಿತ ಅಂತರದಿಂದ ವೀಕ್ಷಿಸಿ ಮತ್ತು ಕೃಷಿ ಅಥವಾ ವನ್ಯಜೀವಿ ಕ್ರಮಗಳ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
    unknown: {
      title: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
      description:
        "ಈ ವೀಕ್ಷಣೆಗೆ ಕೃಷಿ ಅಥವಾ ಪರಿಸರ ಅಪಾಯವನ್ನು ನಿರ್ಧರಿಸಲು AgroBioGuard ಬಳಿ ಪ್ರಸ್ತುತ ಸಾಕಷ್ಟು ಜಾತಿ-ನಿರ್ದಿಷ್ಟ ಮಾಹಿತಿ ಇಲ್ಲ.",
      recommendation:
        "ಕೃಷಿ ಅಥವಾ ಪರಿಸರ ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
  },

  Malayalam: {
    pepper: {
      title: "കുറഞ്ഞ കാർഷിക അപകടസാധ്യത",
      description:
        "AgroBioGuard ഈ നിരീക്ഷണം മുളക് കുടുംബത്തിൽപ്പെട്ട സസ്യമാണെന്ന് തിരിച്ചറിഞ്ഞു. നിലവിലെ നിയമങ്ങൾ ഈ സസ്യത്തെ അടിയന്തര കാർഷിക അല്ലെങ്കിൽ പരിസ്ഥിതി അപകടമായി വർഗ്ഗീകരിക്കുന്നില്ല.",
      recommendation:
        "സാധാരണ വിള നിരീക്ഷണം തുടരുകയും കീടങ്ങൾ, രോഗങ്ങൾ അല്ലെങ്കിൽ അസാധാരണ വളർച്ചയുടെ ലക്ഷണങ്ങൾ പരിശോധിക്കുകയും ചെയ്യുക.",
    },
    weed: {
      title: "മിതമായ കാർഷിക അപകടസാധ്യത",
      description:
        "ഈ നിരീക്ഷണം കളയായി വർഗ്ഗീകരിച്ചിരിക്കുന്നു. വെള്ളം, പോഷകങ്ങൾ, സൂര്യപ്രകാശം, സ്ഥലം എന്നിവയ്ക്കായി കളകൾ വിളകളുമായി മത്സരിക്കാം.",
      recommendation:
        "ചുറ്റുമുള്ള വിള പ്രദേശം പരിശോധിക്കുകയും നടപടി സ്വീകരിക്കുന്നതിന് മുമ്പ് അനുയോജ്യമായ കള നിയന്ത്രണ രീതികൾ പരിഗണിക്കുകയും ചെയ്യുക.",
    },
    pest: {
      title: "ഉയർന്ന കാർഷിക നിരീക്ഷണ മുൻഗണന",
      description:
        "ഈ നിരീക്ഷണം ഒരു കീടമായി വർഗ്ഗീകരിച്ചിരിക്കുന്നു. കീടങ്ങൾ സമീപത്തെ കാർഷിക സസ്യങ്ങളെ ബാധിക്കാനിടയുള്ളതിനാൽ കൂടുതൽ നിരീക്ഷണം ആവശ്യമാണ്.",
      recommendation:
        "സമീപത്തെ സസ്യങ്ങളിൽ നാശത്തിന്റെ ലക്ഷണങ്ങൾ പരിശോധിക്കുകയും കീടനിയന്ത്രണ നടപടികൾ സ്വീകരിക്കുന്നതിന് മുമ്പ് തിരിച്ചറിയൽ സ്ഥിരീകരിക്കുകയും ചെയ്യുക.",
    },
    insect: {
      title: "മിതമായ നിരീക്ഷണ മുൻഗണന",
      description:
        "ഈ നിരീക്ഷണം ഒരു കീടമായി വർഗ്ഗീകരിച്ചിരിക്കുന്നു. നിലവിലെ AgroBioGuard നിയമങ്ങൾ ഈ കീടം ഗുണകരമാണോ ദോഷകരമാണോ എന്ന് ജാതി തലത്തിൽ നിർണ്ണയിക്കുന്നില്ല.",
      recommendation:
        "തിരിച്ചറിയൽ പരിശോധിക്കുകയും നിയന്ത്രണ നടപടികൾക്ക് മുമ്പ് സമീപത്തെ വിളകൾ പരിശോധിക്കുകയും ചെയ്യുക.",
    },
    fauna: {
      title: "പരിസ്ഥിതി നിരീക്ഷണം ആവശ്യമാണ്",
      description:
        "ഈ നിരീക്ഷണം ജീവജാലമായി വർഗ്ഗീകരിച്ചിരിക്കുന്നു. നിലവിലെ നിയമങ്ങൾ മൃഗത്തെ സ്വയമേവ കാർഷിക അല്ലെങ്കിൽ പരിസ്ഥിതി ഭീഷണിയായി വർഗ്ഗീകരിക്കുന്നില്ല.",
      recommendation:
        "സുരക്ഷിതമായ അകലത്തിൽ നിന്ന് നിരീക്ഷിക്കുകയും കാർഷിക അല്ലെങ്കിൽ വന്യജീവി നടപടികൾക്ക് മുമ്പ് തിരിച്ചറിയൽ പരിശോധിക്കുകയും ചെയ്യുക.",
    },
    unknown: {
      title: "അപകട വിലയിരുത്തലിന് പരിശോധന ആവശ്യമാണ്",
      description:
        "ഈ നിരീക്ഷണത്തിനായുള്ള കാർഷിക അല്ലെങ്കിൽ പരിസ്ഥിതി അപകടം നിർണ്ണയിക്കാൻ AgroBioGuard-ൽ നിലവിൽ മതിയായ ജാതി-നിർദ്ദിഷ്ട വിവരങ്ങൾ ഇല്ല.",
      recommendation:
        "കാർഷിക അല്ലെങ്കിൽ പരിസ്ഥിതി നടപടി സ്വീകരിക്കുന്നതിന് മുമ്പ് തിരിച്ചറിയൽ പരിശോധിക്കുക.",
    },
  },
};

const speciesRiskTranslations: Record<
  IdentificationLanguage,
  Record<string, RiskText>
> = {
  English: {
    elephant: {
      title: "Wildlife alert",
      description:
        "An elephant has been identified. Elephants may enter agricultural areas and create safety and crop-damage risks.",
      recommendation:
        "Keep a safe distance and contact the appropriate local wildlife authority if it is near people or crops.",
    },
    wildBoar: {
      title: "Wildlife alert",
      description:
        "A wild boar has been identified. Wild boar may enter agricultural areas and damage crops.",
      recommendation:
        "Keep a safe distance and notify the appropriate local wildlife or agricultural authority if it is near people or fields.",
    },
    leopard: {
      title: "Wildlife alert",
      description:
        "A leopard has been identified. This wildlife observation requires careful safety awareness.",
      recommendation:
        "Do not approach the animal. Move to a safe location and contact the appropriate wildlife authority.",
    },
    tiger: {
      title: "Wildlife safety alert",
      description:
        "A tiger has been identified. This observation may represent a serious wildlife safety concern.",
      recommendation:
        "Do not approach or follow the animal. Move to a safe location and contact the appropriate wildlife authority.",
    },
    locust: {
      title: "Agricultural pest alert",
      description:
        "A locust has been identified. Locust activity can cause significant agricultural crop damage.",
      recommendation:
        "Inspect nearby crops and report significant activity to the appropriate agricultural authority.",
    },
    fallArmyworm: {
      title: "Crop pest alert",
      description:
        "A fall armyworm has been identified. This pest can damage agricultural crops.",
      recommendation:
        "Inspect nearby crops for feeding damage and confirm the identification before applying pest-control measures.",
    },
  },

  Tamil: {
    elephant: {
      title: "வனவிலங்கு எச்சரிக்கை",
      description:
        "ஒரு யானை அடையாளம் காணப்பட்டுள்ளது. யானைகள் வேளாண் பகுதிகளுக்குள் நுழைந்து பாதுகாப்பு மற்றும் பயிர் சேத அபாயங்களை உருவாக்கக்கூடும்.",
      recommendation:
        "பாதுகாப்பான தூரத்தை வைத்திருந்து, மக்கள் அல்லது பயிர்களுக்கு அருகில் இருந்தால் பொருத்தமான உள்ளூர் வனவிலங்கு அதிகாரியைத் தொடர்புகொள்ளவும்.",
    },
    wildBoar: {
      title: "வனவிலங்கு எச்சரிக்கை",
      description:
        "ஒரு காட்டுப்பன்றி அடையாளம் காணப்பட்டுள்ளது. காட்டுப்பன்றிகள் வேளாண் பகுதிகளுக்குள் நுழைந்து பயிர்களை சேதப்படுத்தக்கூடும்.",
      recommendation:
        "பாதுகாப்பான தூரத்தில் இருந்து, மக்கள் அல்லது வயல்களுக்கு அருகில் இருந்தால் பொருத்தமான உள்ளூர் வனவிலங்கு அல்லது வேளாண் அதிகாரிக்கு தகவல் தெரிவிக்கவும்.",
    },
    leopard: {
      title: "வனவிலங்கு எச்சரிக்கை",
      description:
        "ஒரு சிறுத்தை அடையாளம் காணப்பட்டுள்ளது. இந்த வனவிலங்கு பதிவு கவனமான பாதுகாப்பு விழிப்புணர்வைத் தேவைப்படுத்துகிறது.",
      recommendation:
        "விலங்கின் அருகில் செல்ல வேண்டாம். பாதுகாப்பான இடத்திற்குச் சென்று பொருத்தமான வனவிலங்கு அதிகாரியைத் தொடர்புகொள்ளவும்.",
    },
    tiger: {
      title: "வனவிலங்கு பாதுகாப்பு எச்சரிக்கை",
      description:
        "ஒரு புலி அடையாளம் காணப்பட்டுள்ளது. இந்த பதிவு தீவிரமான வனவிலங்கு பாதுகாப்பு கவலையை ஏற்படுத்தக்கூடும்.",
      recommendation:
        "விலங்கை அணுகவோ பின்தொடரவோ வேண்டாம். பாதுகாப்பான இடத்திற்குச் சென்று பொருத்தமான வனவிலங்கு அதிகாரியைத் தொடர்புகொள்ளவும்.",
    },
    locust: {
      title: "வேளாண் பூச்சி எச்சரிக்கை",
      description:
        "வெட்டுக்கிளி அடையாளம் காணப்பட்டுள்ளது. வெட்டுக்கிளி செயல்பாடு குறிப்பிடத்தக்க பயிர் சேதத்தை ஏற்படுத்தக்கூடும்.",
      recommendation:
        "அருகிலுள்ள பயிர்களைப் பரிசோதித்து, குறிப்பிடத்தக்க செயல்பாடு இருந்தால் பொருத்தமான வேளாண் அதிகாரியிடம் தெரிவிக்கவும்.",
    },
    fallArmyworm: {
      title: "பயிர் பூச்சி எச்சரிக்கை",
      description:
        "Fall armyworm அடையாளம் காணப்பட்டுள்ளது. இந்த பூச்சி வேளாண் பயிர்களை சேதப்படுத்தக்கூடும்.",
      recommendation:
        "அருகிலுள்ள பயிர்களில் உணவுத் தாக்குதலால் ஏற்பட்ட சேதத்தைப் பரிசோதித்து, பூச்சிக்கட்டுப்பாட்டு நடவடிக்கைகளை மேற்கொள்வதற்கு முன் அடையாளத்தை உறுதிப்படுத்தவும்.",
    },
  },

  Telugu: {
    elephant: {
      title: "వన్యప్రాణి హెచ్చరిక",
      description:
        "ఒక ఏనుగు గుర్తించబడింది. ఏనుగులు వ్యవసాయ ప్రాంతాల్లోకి ప్రవేశించి భద్రత మరియు పంట నష్టం ప్రమాదాలను కలిగించవచ్చు.",
      recommendation:
        "సురక్షిత దూరంలో ఉండండి మరియు అది ప్రజలు లేదా పంటలకు సమీపంలో ఉంటే తగిన స్థానిక వన్యప్రాణి అధికారిని సంప్రదించండి.",
    },
    wildBoar: {
      title: "వన్యప్రాణి హెచ్చరిక",
      description:
        "ఒక అడవి పంది గుర్తించబడింది. అడవి పందులు వ్యవసాయ ప్రాంతాల్లోకి ప్రవేశించి పంటలను దెబ్బతీయవచ్చు.",
      recommendation:
        "సురక్షిత దూరంలో ఉండండి మరియు ప్రజలు లేదా పొలాలకు సమీపంలో ఉంటే తగిన స్థానిక వన్యప్రాణి లేదా వ్యవసాయ అధికారికి సమాచారం ఇవ్వండి.",
    },
    leopard: {
      title: "వన్యప్రాణి హెచ్చరిక",
      description:
        "ఒక చిరుత గుర్తించబడింది. ఈ వన్యప్రాణి పరిశీలనకు జాగ్రత్తతో కూడిన భద్రతా అవగాహన అవసరం.",
      recommendation:
        "జంతువును చేరుకోకండి. సురక్షిత ప్రదేశానికి వెళ్లి తగిన వన్యప్రాణి అధికారిని సంప్రదించండి.",
    },
    tiger: {
      title: "వన్యప్రాణి భద్రత హెచ్చరిక",
      description:
        "ఒక పులి గుర్తించబడింది. ఈ పరిశీలన తీవ్రమైన వన్యప్రాణి భద్రతా ఆందోళనను సూచించవచ్చు.",
      recommendation:
        "జంతువును చేరుకోవద్దు లేదా వెంబడించవద్దు. సురక్షిత ప్రదేశానికి వెళ్లి తగిన వన్యప్రాణి అధికారిని సంప్రదించండి.",
    },
    locust: {
      title: "వ్యవసాయ పురుగు హెచ్చరిక",
      description:
        "మిడత గుర్తించబడింది. మిడతల కార్యకలాపం గణనీయమైన పంట నష్టాన్ని కలిగించవచ్చు.",
      recommendation:
        "సమీపంలోని పంటలను పరిశీలించి, గణనీయమైన కార్యకలాపం ఉంటే తగిన వ్యవసాయ అధికారికి నివేదించండి.",
    },
    fallArmyworm: {
      title: "పంట పురుగు హెచ్చరిక",
      description:
        "ఫాల్ ఆర్మీవార్మ్ గుర్తించబడింది. ఈ పురుగు వ్యవసాయ పంటలను దెబ్బతీయవచ్చు.",
      recommendation:
        "సమీపంలోని పంటల్లో తినివేత నష్టాన్ని పరిశీలించి, పురుగు నియంత్రణ చర్యలకు ముందు గుర్తింపును నిర్ధారించండి.",
    },
  },

  Hindi: {
    elephant: {
      title: "वन्यजीव चेतावनी",
      description:
        "एक हाथी की पहचान हुई है। हाथी कृषि क्षेत्रों में प्रवेश कर सकते हैं और सुरक्षा तथा फसल क्षति के जोखिम पैदा कर सकते हैं।",
      recommendation:
        "सुरक्षित दूरी बनाए रखें और यदि यह लोगों या फसलों के पास हो तो उचित स्थानीय वन्यजीव प्राधिकरण से संपर्क करें।",
    },
    wildBoar: {
      title: "वन्यजीव चेतावनी",
      description:
        "जंगली सूअर की पहचान हुई है। जंगली सूअर कृषि क्षेत्रों में प्रवेश कर फसलों को नुकसान पहुँचा सकते हैं।",
      recommendation:
        "सुरक्षित दूरी बनाए रखें और यदि यह लोगों या खेतों के पास हो तो उचित स्थानीय वन्यजीव या कृषि प्राधिकरण को सूचित करें।",
    },
    leopard: {
      title: "वन्यजीव चेतावनी",
      description:
        "तेंदुए की पहचान हुई है। इस वन्यजीव अवलोकन के लिए सावधानीपूर्ण सुरक्षा जागरूकता आवश्यक है।",
      recommendation:
        "जानवर के पास न जाएँ। सुरक्षित स्थान पर जाएँ और उचित वन्यजीव प्राधिकरण से संपर्क करें।",
    },
    tiger: {
      title: "वन्यजीव सुरक्षा चेतावनी",
      description:
        "बाघ की पहचान हुई है। यह अवलोकन गंभीर वन्यजीव सुरक्षा चिंता का संकेत हो सकता है।",
      recommendation:
        "जानवर के पास न जाएँ और उसका पीछा न करें। सुरक्षित स्थान पर जाएँ और उचित वन्यजीव प्राधिकरण से संपर्क करें।",
    },
    locust: {
      title: "कृषि कीट चेतावनी",
      description:
        "टिड्डी की पहचान हुई है। टिड्डी गतिविधि से महत्वपूर्ण कृषि फसल क्षति हो सकती है।",
      recommendation:
        "पास की फसलों का निरीक्षण करें और महत्वपूर्ण गतिविधि होने पर उचित कृषि प्राधिकरण को सूचित करें।",
    },
    fallArmyworm: {
      title: "फसल कीट चेतावनी",
      description:
        "फॉल आर्मीवर्म की पहचान हुई है। यह कीट कृषि फसलों को नुकसान पहुँचा सकता है।",
      recommendation:
        "पास की फसलों में खाने से हुई क्षति की जाँच करें और कीट नियंत्रण उपायों से पहले पहचान की पुष्टि करें।",
    },
  },

  Kannada: {
    elephant: {
      title: "ವನ್ಯಜೀವಿ ಎಚ್ಚರಿಕೆ",
      description:
        "ಆನೆಯೊಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಆನೆಗಳು ಕೃಷಿ ಪ್ರದೇಶಗಳಿಗೆ ಪ್ರವೇಶಿಸಿ ಸುರಕ್ಷತೆ ಮತ್ತು ಬೆಳೆ ಹಾನಿಯ ಅಪಾಯಗಳನ್ನು ಉಂಟುಮಾಡಬಹುದು.",
      recommendation:
        "ಸುರಕ್ಷಿತ ಅಂತರದಲ್ಲಿರಿ ಮತ್ತು ಅದು ಜನರು ಅಥವಾ ಬೆಳೆಗಳ ಸಮೀಪದಲ್ಲಿದ್ದರೆ ಸೂಕ್ತ ಸ್ಥಳೀಯ ವನ್ಯಜೀವಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },
    wildBoar: {
      title: "ವನ್ಯಜೀವಿ ಎಚ್ಚರಿಕೆ",
      description:
        "ಕಾಡುಹಂದಿಯೊಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಕಾಡುಹಂದಿಗಳು ಕೃಷಿ ಪ್ರದೇಶಗಳಿಗೆ ಪ್ರವೇಶಿಸಿ ಬೆಳೆಗಳಿಗೆ ಹಾನಿ ಮಾಡಬಹುದು.",
      recommendation:
        "ಸುರಕ್ಷಿತ ಅಂತರದಲ್ಲಿರಿ ಮತ್ತು ಅದು ಜನರು ಅಥವಾ ಹೊಲಗಳ ಸಮೀಪದಲ್ಲಿದ್ದರೆ ಸೂಕ್ತ ಸ್ಥಳೀಯ ವನ್ಯಜೀವಿ ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಗೆ ತಿಳಿಸಿ.",
    },
    leopard: {
      title: "ವನ್ಯಜೀವಿ ಎಚ್ಚರಿಕೆ",
      description:
        "ಚಿರತೆಯೊಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಈ ವನ್ಯಜೀವಿ ವೀಕ್ಷಣೆಗೆ ಎಚ್ಚರಿಕೆಯ ಸುರಕ್ಷತಾ ಅರಿವು ಅಗತ್ಯ.",
      recommendation:
        "ಪ್ರಾಣಿಯ ಸಮೀಪ ಹೋಗಬೇಡಿ. ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ತೆರಳಿ ಸೂಕ್ತ ವನ್ಯಜೀವಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },
    tiger: {
      title: "ವನ್ಯಜೀವಿ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ",
      description:
        "ಹುಲಿಯೊಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಈ ವೀಕ್ಷಣೆ ಗಂಭೀರ ವನ್ಯಜೀವಿ ಸುರಕ್ಷತಾ ಕಾಳಜಿಯನ್ನು ಸೂಚಿಸಬಹುದು.",
      recommendation:
        "ಪ್ರಾಣಿಯ ಸಮೀಪ ಹೋಗಬೇಡಿ ಅಥವಾ ಹಿಂಬಾಲಿಸಬೇಡಿ. ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ತೆರಳಿ ಸೂಕ್ತ ವನ್ಯಜೀವಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    },
    locust: {
      title: "ಕೃಷಿ ಕೀಟ ಎಚ್ಚರಿಕೆ",
      description:
        "ಮಿಡತೆ ಗುರುತಿಸಲಾಗಿದೆ. ಮಿಡತೆಗಳ ಚಟುವಟಿಕೆ ಗಮನಾರ್ಹ ಬೆಳೆ ಹಾನಿಯನ್ನು ಉಂಟುಮಾಡಬಹುದು.",
      recommendation:
        "ಸಮೀಪದ ಬೆಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಗಮನಾರ್ಹ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದರೆ ಸೂಕ್ತ ಕೃಷಿ ಅಧಿಕಾರಿಗೆ ವರದಿ ಮಾಡಿ.",
    },
    fallArmyworm: {
      title: "ಬೆಳೆ ಕೀಟ ಎಚ್ಚರಿಕೆ",
      description:
        "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್ ಗುರುತಿಸಲಾಗಿದೆ. ಈ ಕೀಟವು ಕೃಷಿ ಬೆಳೆಗಳಿಗೆ ಹಾನಿ ಮಾಡಬಹುದು.",
      recommendation:
        "ಸಮೀಪದ ಬೆಳೆಗಳಲ್ಲಿ ತಿನ್ನುವ ಹಾನಿಯ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ದೃಢಪಡಿಸಿ.",
    },
  },

  Malayalam: {
    elephant: {
      title: "വന്യജീവി മുന്നറിയിപ്പ്",
      description:
        "ഒരു ആനയെ തിരിച്ചറിഞ്ഞു. ആനകൾ കൃഷിയിടങ്ങളിൽ പ്രവേശിച്ച് സുരക്ഷയ്ക്കും വിളനാശത്തിനും അപകടസാധ്യത സൃഷ്ടിക്കാം.",
      recommendation:
        "സുരക്ഷിതമായ അകലം പാലിക്കുകയും ആളുകൾക്കോ വിളകൾക്കോ സമീപത്താണെങ്കിൽ ബന്ധപ്പെട്ട പ്രാദേശിക വന്യജീവി അധികാരിയെ ബന്ധപ്പെടുകയും ചെയ്യുക.",
    },
    wildBoar: {
      title: "വന്യജീവി മുന്നറിയിപ്പ്",
      description:
        "ഒരു കാട്ടുപന്നിയെ തിരിച്ചറിഞ്ഞു. കാട്ടുപന്നികൾ കൃഷിയിടങ്ങളിൽ പ്രവേശിച്ച് വിളകൾക്ക് നാശം വരുത്താം.",
      recommendation:
        "സുരക്ഷിതമായ അകലം പാലിക്കുകയും ആളുകൾക്കോ കൃഷിയിടങ്ങൾക്കോ സമീപത്താണെങ്കിൽ ബന്ധപ്പെട്ട പ്രാദേശിക വന്യജീവി അല്ലെങ്കിൽ കാർഷിക അധികാരിയെ അറിയിക്കുകയും ചെയ്യുക.",
    },
    leopard: {
      title: "വന്യജീവി മുന്നറിയിപ്പ്",
      description:
        "ഒരു പുലിയെ തിരിച്ചറിഞ്ഞു. ഈ വന്യജീവി നിരീക്ഷണത്തിന് ജാഗ്രതയോടെയുള്ള സുരക്ഷാ ബോധവൽക്കരണം ആവശ്യമാണ്.",
      recommendation:
        "മൃഗത്തെ സമീപിക്കരുത്. സുരക്ഷിതമായ സ്ഥലത്തേക്ക് മാറി ബന്ധപ്പെട്ട വന്യജീവി അധികാരിയെ ബന്ധപ്പെടുക.",
    },
    tiger: {
      title: "വന്യജീവി സുരക്ഷാ മുന്നറിയിപ്പ്",
      description:
        "ഒരു കടുവയെ തിരിച്ചറിഞ്ഞു. ഈ നിരീക്ഷണം ഗുരുതരമായ വന്യജീവി സുരക്ഷാ ആശങ്കയെ സൂചിപ്പിക്കാം.",
      recommendation:
        "മൃഗത്തെ സമീപിക്കുകയോ പിന്തുടരുകയോ ചെയ്യരുത്. സുരക്ഷിതമായ സ്ഥലത്തേക്ക് മാറി ബന്ധപ്പെട്ട വന്യജീവി അധികാരിയെ ബന്ധപ്പെടുക.",
    },
    locust: {
      title: "കാർഷിക കീട മുന്നറിയിപ്പ്",
      description:
        "വെട്ടുക്കിളിയെ തിരിച്ചറിഞ്ഞു. വെട്ടുക്കിളികളുടെ പ്രവർത്തനം ഗണ്യമായ വിളനാശത്തിന് കാരണമാകാം.",
      recommendation:
        "സമീപത്തെ വിളകൾ പരിശോധിക്കുകയും ഗണ്യമായ പ്രവർത്തനം ഉണ്ടെങ്കിൽ ബന്ധപ്പെട്ട കാർഷിക അധികാരിയെ അറിയിക്കുകയും ചെയ്യുക.",
    },
    fallArmyworm: {
      title: "വിള കീട മുന്നറിയിപ്പ്",
      description:
        "ഫാൾ ആർമിവോം തിരിച്ചറിഞ്ഞു. ഈ കീടം കാർഷിക വിളകൾക്ക് നാശം വരുത്താം.",
      recommendation:
        "സമീപത്തെ വിളകളിലെ ഭക്ഷണനാശത്തിന്റെ ലക്ഷണങ്ങൾ പരിശോധിക്കുകയും കീടനിയന്ത്രണ നടപടികൾക്ക് മുമ്പ് തിരിച്ചറിയൽ സ്ഥിരീകരിക്കുകയും ചെയ്യുക.",
    },
  },
};

function locationText(
  language: IdentificationLanguage,
  location?: { latitude?: number; longitude?: number },
): string {
  if (!location) {
    return genericLocation[language].unavailable;
  }

  if (
    location.latitude !== undefined &&
    location.longitude !== undefined
  ) {
    return genericLocation[language].available(
      location.latitude,
      location.longitude,
    );
  }

  return genericLocation[language].provided;
}

const genericLocation: Record<
  IdentificationLanguage,
  {
    unavailable: string;
    provided: string;
    available: (latitude: number, longitude: number) => string;
  }
> = {
  English: {
    unavailable:
      "Device location context is available for this assessment.",
    provided:
      "Location context was provided, but exact coordinates were not available.",
    available: (latitude, longitude) =>
      `Device location context is available at ${latitude.toFixed(6)}, ${longitude.toFixed(6)}.`,
  },

  Tamil: {
    unavailable:
      "இந்த மதிப்பீட்டிற்கான சாதன இருப்பிட சூழல் கிடைக்கிறது.",
    provided:
      "இருப்பிடத் தகவல் வழங்கப்பட்டுள்ளது, ஆனால் துல்லியமான ஆயத்தொலைவுகள் கிடைக்கவில்லை.",
    available: (latitude, longitude) =>
      `${latitude.toFixed(6)}, ${longitude.toFixed(6)} என்ற சாதன இருப்பிடத் தகவல் இந்த மதிப்பீட்டிற்கு கிடைக்கிறது.`,
  },

  Telugu: {
    unavailable:
      "ఈ అంచనాకు పరికరం స్థాన సందర్భం అందుబాటులో ఉంది.",
    provided:
      "స్థాన సమాచారం అందించబడింది, కానీ ఖచ్చితమైన కోఆర్డినేట్లు అందుబాటులో లేవు.",
    available: (latitude, longitude) =>
      `ఈ అంచనాకు పరికర స్థానం ${latitude.toFixed(6)}, ${longitude.toFixed(6)} వద్ద అందుబాటులో ఉంది.`,
  },

  Hindi: {
    unavailable:
      "इस आकलन के लिए डिवाइस स्थान संदर्भ उपलब्ध है।",
    provided:
      "स्थान संदर्भ प्रदान किया गया है, लेकिन सटीक निर्देशांक उपलब्ध नहीं हैं।",
    available: (latitude, longitude) =>
      `इस आकलन के लिए डिवाइस स्थान ${latitude.toFixed(6)}, ${longitude.toFixed(6)} पर उपलब्ध है।`,
  },

  Kannada: {
    unavailable:
      "ಈ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಸಾಧನದ ಸ್ಥಳ ಸಂದರ್ಭ ಲಭ್ಯವಿದೆ.",
    provided:
      "ಸ್ಥಳ ಸಂದರ್ಭವನ್ನು ಒದಗಿಸಲಾಗಿದೆ, ಆದರೆ ನಿಖರ ಸಂಯೋಜನೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    available: (latitude, longitude) =>
      `ಈ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಸಾಧನದ ಸ್ಥಳ ${latitude.toFixed(6)}, ${longitude.toFixed(6)} ನಲ್ಲಿ ಲಭ್ಯವಿದೆ.`,
  },

  Malayalam: {
    unavailable:
      "ഈ വിലയിരുത്തലിനായി ഉപകരണ ലൊക്കേഷൻ സന്ദർഭം ലഭ്യമാണ്.",
    provided:
      "ലൊക്കേഷൻ വിവരങ്ങൾ നൽകിയിട്ടുണ്ട്, എന്നാൽ കൃത്യമായ കോർഡിനേറ്റുകൾ ലഭ്യമല്ല.",
    available: (latitude, longitude) =>
      `ഈ വിലയിരുത്തലിനായി ഉപകരണ ലൊക്കേഷൻ ${latitude.toFixed(6)}, ${longitude.toFixed(6)} ൽ ലഭ്യമാണ്.`,
  },
};

export function getGenericRiskText(
  language: IdentificationLanguage,
  key: keyof typeof genericRiskTranslations.English,
): RiskText {
  return (
    genericRiskTranslations[language][key] ??
    genericRiskTranslations.English[key]
  );
}

export function getSpeciesRiskText(
  language: IdentificationLanguage,
  key: string,
): RiskText | undefined {
  return speciesRiskTranslations[language][key];
}

export function getLocationRiskText(
  language: IdentificationLanguage,
  location?: { latitude?: number; longitude?: number },
): string {
  return locationText(language, location);
}

export function getRiskCategoryKey(
  category: IdentificationCategory,
): keyof typeof genericRiskTranslations.English {
  switch (category) {
    case "Pest":
      return "pest";
    case "Weed":
      return "weed";
    case "Insect":
      return "insect";
    case "Fauna":
      return "fauna";
    default:
      return "unknown";
  }
}
export function getWarningTitle(
  language: IdentificationLanguage,
  riskLevel: RiskLevel,
): string {
  const titles: Record<
    IdentificationLanguage,
    Record<RiskLevel, string>
  > = {
    English: {
      high: "Agricultural risk warning",
      moderate: "Agricultural monitoring advised",
      low: "No immediate agricultural risk identified",
      unknown: "Risk assessment requires review",
    },

    Tamil: {
      high: "வேளாண் அபாய எச்சரிக்கை",
      moderate: "வேளாண் கண்காணிப்பு அறிவுறுத்தப்படுகிறது",
      low: "உடனடி வேளாண் அபாயம் கண்டறியப்படவில்லை",
      unknown: "அபாய மதிப்பீட்டை மறுபரிசீலனை செய்ய வேண்டும்",
    },

    Telugu: {
      high: "వ్యవసాయ ప్రమాద హెచ్చరిక",
      moderate: "వ్యవసాయ పర్యవేక్షణ సూచించப்படுகிறது",
      low: "తక్షణ వ్యవసాయ ప్రమాదం గుర్తించబడలేదు",
      unknown: "ప్రమాద అంచనాను సమీక్షించాలి",
    },

    Hindi: {
      high: "कृषि जोखिम चेतावनी",
      moderate: "कृषि निगरानी की सलाह",
      low: "तत्काल कृषि जोखिम की पहचान नहीं हुई",
      unknown: "जोखिम आकलन की समीक्षा आवश्यक है",
    },

    Kannada: {
      high: "ಕೃಷಿ ಅಪಾಯ ಎಚ್ಚರಿಕೆ",
      moderate: "ಕೃಷಿ ಮೇಲ್ವಿಚಾರಣೆ ಅಗತ್ಯ",
      low: "ತಕ್ಷಣದ ಕೃಷಿ ಅಪಾಯ ಪತ್ತೆಯಾಗಿಲ್ಲ",
      unknown: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪರಿಶೀಲಿಸಬೇಕು",
    },

    Malayalam: {
      high: "കാർഷിക അപകട മുന്നറിയിപ്പ്",
      moderate: "കാർഷിക നിരീക്ഷണം ആവശ്യമാണ്",
      low: "തൽക്ഷണ കാർഷിക അപകടം കണ്ടെത്തിയില്ല",
      unknown: "അപകട വിലയിരുത്തൽ പരിശോധിക്കണം",
    },
  };

  return titles[language]?.[riskLevel] ?? titles.English[riskLevel];
}