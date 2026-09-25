export type IdentificationLanguage =
  | "English"
  | "Tamil"
  | "Telugu"
  | "Hindi"
  | "Kannada"
  | "Malayalam";

export const identificationTranslations = {
  English: {
    sectionEyebrow: "AI IDENTIFICATION",
    sectionHeading: "Turn a field image into a clearer next step.",
    sectionDescription:
      "Upload a close, well-lit image or use your device camera. AgroBioGuard identifies the observation and then passes the result through its agricultural risk-assessment workflow.",

    identificationType: "IDENTIFICATION TYPE",
    chooseWhatToIdentify: "Choose what to identify",
    flora: "Flora",
    fauna: "Fauna",

    imageInput: "IMAGE INPUT",
    aiWorkflow: "AI-powered workflow",
    addObservationImage: "Add an observation image",
    observationImageHint:
      "Use a focused image of one plant, animal, insect, or weed for the best identification result.",
    uploadImage: "Upload image",
    useCamera: "Use camera",
    imageFormats: "JPG, PNG, WebP · maximum 10 MB",
    readyForAnalysis: "READY FOR ANALYSIS",
    removeImage: "Remove image",
    changeImage: "Change image",

    locationLabel: "LOCATION",
    locationAwareAssessment: "Location-aware assessment",
    locationDescription:
      "Allow AgroBioGuard to use your current location for contextual risk assessment.",
    gettingLocation: "Getting location...",
    updateLocation: "Update location",
    useMyLocation: "Use my location",
    locationAvailable: "Location available",
    coordinatesUnavailable: "Coordinates are not available.",
    locationOptional:
      "Location is optional. You can analyze an image without sharing your location.",
    unableToAccessLocation: "Unable to access your current location.",

    addImageBeforeAnalysis: "Add an image before starting an analysis.",
    analyzeImage: "Analyze image",
    analyzingImage: "Analyzing image...",

    analysisResult: "ANALYSIS RESULT",
    identificationConfidence: "Identification confidence",
    identificationSource: "Identification source",
    commonName: "Common name",
    locationAndContext: "Location & context",
    deviceLocationAvailable: "Device location available.",
    locationNotProvided: "Location was not provided.",
    plantIdentificationService: "Plant identification service",

    emptyResultHeading: "Your identification will appear here.",
    emptyResultText:
      "Results will include the identified species, confidence, AgroBioGuard risk context, and a practical recommendation.",

    imageReadyHeading: "Image ready for analysis.",
    imageReadyText:
      "Select Analyze image to identify the uploaded observation.",

    analyzingHeading: "Analyzing your observation",
    analyzingText:
      "Plant identification and AgroBioGuard assessment are being processed.",

    riskAssessment: "AGROBIOGUARD RISK ASSESSMENT",
    recommendedAction: "Recommended action",

    importantWildlifeAlert: "🚨 IMPORTANT WILDLIFE ALERT",
    warningAction: "Action",

    locationContextCard: "LOCATION CONTEXT",
    deviceLocationUsed: "Device location used",
    noLocationProvided: "No location provided",
    locationReceived:
      "AgroBioGuard received the device coordinates for location-aware processing.",
    noDeviceLocation:
      "No device location was shared. The identification can still be reviewed without location data.",

    analysisNoteTitle: "AI identification + AgroBioGuard assessment.",
    floraNote:
      "Plant identification is provided by the PlantNet identification service. Agricultural risk assessment is handled separately by AgroBioGuard.",
    faunaNote:
      "Fauna identification is provided by the Gemini AI service. Agricultural and ecological risk assessment is handled separately by AgroBioGuard.",
  },

  Tamil: {
    sectionEyebrow: "AI அடையாளம் காணல்",
    sectionHeading: "ஒரு வயல் படத்தை தெளிவான அடுத்த நடவடிக்கையாக மாற்றுங்கள்.",
    sectionDescription:
      "தெளிவான, நன்றாக ஒளியூட்டப்பட்ட படத்தைப் பதிவேற்றவும் அல்லது உங்கள் சாதன கேமராவைப் பயன்படுத்தவும். AgroBioGuard பதிவை அடையாளம் கண்டு பின்னர் வேளாண் அபாய மதிப்பீட்டு செயல்முறைக்கு அனுப்புகிறது.",

    identificationType: "அடையாள வகை",
    chooseWhatToIdentify: "எதை அடையாளம் காண வேண்டும் என்பதை தேர்வு செய்யவும்",
    flora: "தாவரங்கள்",
    fauna: "விலங்குகள்",

    imageInput: "பட உள்ளீடு",
    aiWorkflow: "AI சார்ந்த செயல்முறை",
    addObservationImage: "கண்காணிப்பு படத்தைச் சேர்க்கவும்",
    observationImageHint:
      "சிறந்த அடையாள முடிவுக்காக ஒரு தாவரம், விலங்கு, பூச்சி அல்லது களையின் தெளிவான படத்தைப் பயன்படுத்தவும்.",
    uploadImage: "படத்தைப் பதிவேற்றவும்",
    useCamera: "கேமராவைப் பயன்படுத்தவும்",
    imageFormats: "JPG, PNG, WebP · அதிகபட்சம் 10 MB",
    readyForAnalysis: "பகுப்பாய்வுக்கு தயாராக உள்ளது",
    removeImage: "படத்தை அகற்றவும்",
    changeImage: "படத்தை மாற்றவும்",

    locationLabel: "இருப்பிடம்",
    locationAwareAssessment: "இருப்பிட அடிப்படையிலான மதிப்பீடு",
    locationDescription:
      "சூழல் சார்ந்த அபாய மதிப்பீட்டிற்காக AgroBioGuard உங்கள் தற்போதைய இருப்பிடத்தைப் பயன்படுத்த அனுமதிக்கவும்.",
    gettingLocation: "இருப்பிடம் பெறப்படுகிறது...",
    updateLocation: "இருப்பிடத்தைப் புதுப்பிக்கவும்",
    useMyLocation: "எனது இருப்பிடத்தைப் பயன்படுத்தவும்",
    locationAvailable: "இருப்பிடம் கிடைக்கிறது",
    coordinatesUnavailable: "ஆயத்தொலைவுகள் கிடைக்கவில்லை.",
    locationOptional:
      "இருப்பிடம் விருப்பமானது. உங்கள் இருப்பிடத்தைப் பகிராமல் ஒரு படத்தைப் பகுப்பாய்வு செய்யலாம்.",
    unableToAccessLocation: "உங்கள் தற்போதைய இருப்பிடத்தை அணுக முடியவில்லை.",

    addImageBeforeAnalysis: "பகுப்பாய்வைத் தொடங்குவதற்கு முன் ஒரு படத்தைச் சேர்க்கவும்.",
    analyzeImage: "படத்தைப் பகுப்பாய்வு செய்க",
    analyzingImage: "படம் பகுப்பாய்வு செய்யப்படுகிறது...",

    analysisResult: "பகுப்பாய்வு முடிவு",
    identificationConfidence: "அடையாள நம்பகத்தன்மை",
    identificationSource: "அடையாள மூலாதாரம்",
    commonName: "பொதுப் பெயர்",
    locationAndContext: "இருப்பிடம் மற்றும் சூழல்",
    deviceLocationAvailable: "சாதன இருப்பிடம் கிடைக்கிறது.",
    locationNotProvided: "இருப்பிடம் வழங்கப்படவில்லை.",
    plantIdentificationService: "தாவர அடையாள சேவை",

    emptyResultHeading: "உங்கள் அடையாள முடிவு இங்கே தோன்றும்.",
    emptyResultText:
      "முடிவில் அடையாளம் காணப்பட்ட இனம், நம்பகத்தன்மை, AgroBioGuard அபாய சூழல் மற்றும் நடைமுறை பரிந்துரை இடம்பெறும்.",

    imageReadyHeading: "படம் பகுப்பாய்வுக்கு தயாராக உள்ளது.",
    imageReadyText:
      "பதிவை அடையாளம் காண 'படத்தைப் பகுப்பாய்வு செய்க' என்பதைத் தேர்வு செய்யவும்.",

    analyzingHeading: "உங்கள் பதிவை பகுப்பாய்வு செய்கிறது",
    analyzingText:
      "தாவர அடையாளம் மற்றும் AgroBioGuard மதிப்பீடு செயலாக்கப்படுகின்றன.",

    riskAssessment: "AGROBIOGUARD அபாய மதிப்பீடு",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",

    importantWildlifeAlert: "🚨 முக்கியமான வனவிலங்கு எச்சரிக்கை",
    warningAction: "நடவடிக்கை",

    locationContextCard: "இருப்பிட சூழல்",
    deviceLocationUsed: "சாதன இருப்பிடம் பயன்படுத்தப்பட்டது",
    noLocationProvided: "இருப்பிடம் வழங்கப்படவில்லை",
    locationReceived:
      "இருப்பிட அடிப்படையிலான செயலாக்கத்திற்காக AgroBioGuard சாதன ஆயத்தொலைவுகளைப் பெற்றுள்ளது.",
    noDeviceLocation:
      "சாதன இருப்பிடம் பகிரப்படவில்லை. இருப்பிடத் தகவல் இல்லாமலும் அடையாளத்தை மதிப்பாய்வு செய்யலாம்.",

    analysisNoteTitle: "AI அடையாளம் + AgroBioGuard மதிப்பீடு.",
    floraNote:
      "தாவர அடையாளத்தை PlantNet அடையாள சேவை வழங்குகிறது. வேளாண் அபாய மதிப்பீடு AgroBioGuard மூலம் தனியாக செய்யப்படுகிறது.",
    faunaNote:
      "விலங்கு அடையாளத்தை Gemini AI சேவை வழங்குகிறது. வேளாண் மற்றும் சூழலியல் அபாய மதிப்பீடு AgroBioGuard மூலம் தனியாக செய்யப்படுகிறது.",
  },

  Telugu: {
    sectionEyebrow: "AI గుర్తింపు",
    sectionHeading: "పొలం చిత్రాన్ని స్పష్టమైన తదుపరి చర్యగా మార్చండి.",
    sectionDescription:
      "స్పష్టమైన, మంచి వెలుతురు ఉన్న చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా మీ పరికర కెమెరాను ఉపయోగించండి. AgroBioGuard పరిశీలనను గుర్తించి వ్యవసాయ ప్రమాద అంచనా ప్రక్రియకు పంపుతుంది.",

    identificationType: "గుర్తింపు రకం",
    chooseWhatToIdentify: "ఏది గుర్తించాలో ఎంచుకోండి",
    flora: "వృక్షజాలం",
    fauna: "జంతుజాలం",

    imageInput: "చిత్ర ఇన్‌పుట్",
    aiWorkflow: "AI ఆధారిత వర్క్‌ఫ్లో",
    addObservationImage: "పరిశీలన చిత్రాన్ని జోడించండి",
    observationImageHint:
      "ఉత్తమ గుర్తింపు ఫలితానికి ఒక మొక్క, జంతువు, పురుగు లేదా కలుపు మొక్క యొక్క స్పష్టమైన చిత్రాన్ని ఉపయోగించండి.",
    uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    useCamera: "కెమెరాను ఉపయోగించండి",
    imageFormats: "JPG, PNG, WebP · గరిష్టంగా 10 MB",
    readyForAnalysis: "విశ్లేషణకు సిద్ధంగా ఉంది",
    removeImage: "చిత్రాన్ని తొలగించండి",
    changeImage: "చిత్రాన్ని మార్చండి",

    locationLabel: "స్థానం",
    locationAwareAssessment: "స్థాన ఆధారిత అంచనా",
    locationDescription:
      "సందర్భానుసార ప్రమాద అంచనా కోసం AgroBioGuard మీ ప్రస్తుత స్థానాన్ని ఉపయోగించడానికి అనుమతించండి.",
    gettingLocation: "స్థానాన్ని పొందుతోంది...",
    updateLocation: "స్థానాన్ని నవీకరించండి",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించండి",
    locationAvailable: "స్థానం అందుబాటులో ఉంది",
    coordinatesUnavailable: "కోఆర్డినేట్లు అందుబాటులో లేవు.",
    locationOptional:
      "స్థానం ఐచ్ఛికం. మీ స్థానాన్ని పంచుకోకుండా చిత్రాన్ని విశ్లేషించవచ్చు.",
    unableToAccessLocation: "మీ ప్రస్తుత స్థానాన్ని యాక్సెస్ చేయలేకపోయాము.",

    addImageBeforeAnalysis: "విశ్లేషణ ప్రారంభించే ముందు ఒక చిత్రాన్ని జోడించండి.",
    analyzeImage: "చిత్రాన్ని విశ్లేషించండి",
    analyzingImage: "చిత్రాన్ని విశ్లేషిస్తోంది...",

    analysisResult: "విశ్లేషణ ఫలితం",
    identificationConfidence: "గుర్తింపు నమ్మక స్థాయి",
    identificationSource: "గుర్తింపు మూలం",
    commonName: "సాధారణ పేరు",
    locationAndContext: "స్థానం మరియు సందర్భం",
    deviceLocationAvailable: "పరికరం స్థానం అందుబాటులో ఉంది.",
    locationNotProvided: "స్థానం అందించబడలేదు.",
    plantIdentificationService: "మొక్కల గుర్తింపు సేవ",

    emptyResultHeading: "మీ గుర్తింపు ఫలితం ఇక్కడ కనిపిస్తుంది.",
    emptyResultText:
      "ఫలితాల్లో గుర్తించిన జాతి, నమ్మక స్థాయి, AgroBioGuard ప్రమాద సందర్భం మరియు ఆచరణాత్మక సూచన ఉంటాయి.",

    imageReadyHeading: "చిత్రం విశ్లేషణకు సిద్ధంగా ఉంది.",
    imageReadyText:
      "అప్‌లోడ్ చేసిన పరిశీలనను గుర్తించడానికి చిత్రాన్ని విశ్లేషించండి ఎంచుకోండి.",

    analyzingHeading: "మీ పరిశీలనను విశ్లేషిస్తోంది",
    analyzingText:
      "వృక్షజాల గుర్తింపు మరియు AgroBioGuard అంచనా ప్రాసెస్ అవుతున్నాయి.",

    riskAssessment: "AGROBIOGUARD ప్రమాద అంచనా",
    recommendedAction: "సిఫార్సు చేసిన చర్య",

    importantWildlifeAlert: "🚨 ముఖ్యమైన వన్యప్రాణి హెచ్చరిక",
    warningAction: "చర్య",

    locationContextCard: "స్థాన సందర్భం",
    deviceLocationUsed: "పరికరం స్థానం ఉపయోగించబడింది",
    noLocationProvided: "స్థానం అందించబడలేదు",
    locationReceived:
      "స్థాన ఆధారిత ప్రాసెసింగ్ కోసం AgroBioGuard పరికర కోఆర్డినేట్లను పొందింది.",
    noDeviceLocation:
      "పరికరం స్థానం భాగస్వామ్యం చేయబడలేదు. స్థాన సమాచారం లేకుండానే గుర్తింపును సమీక్షించవచ్చు.",

    analysisNoteTitle: "AI గుర్తింపు + AgroBioGuard అంచనా.",
    floraNote:
      "మొక్కల గుర్తింపును PlantNet గుర్తింపు సేవ అందిస్తుంది. వ్యవసాయ ప్రమాద అంచనాను AgroBioGuard విడిగా నిర్వహిస్తుంది.",
    faunaNote:
      "జంతుజాల గుర్తింపును Gemini AI సేవ అందిస్తుంది. వ్యవసాయ మరియు పర్యావరణ ప్రమాద అంచనాను AgroBioGuard విడిగా నిర్వహిస్తుంది.",
  },

  Hindi: {
    sectionEyebrow: "AI पहचान",
    sectionHeading: "एक खेत की छवि को स्पष्ट अगले कदम में बदलें।",
    sectionDescription:
      "एक स्पष्ट, अच्छी रोशनी वाली तस्वीर अपलोड करें या अपने डिवाइस के कैमरे का उपयोग करें। AgroBioGuard अवलोकन की पहचान करके उसे कृषि जोखिम आकलन प्रक्रिया में भेजता है।",

    identificationType: "पहचान का प्रकार",
    chooseWhatToIdentify: "पहचानने के लिए चुनें",
    flora: "वनस्पति",
    fauna: "जीव-जंतु",

    imageInput: "चित्र इनपुट",
    aiWorkflow: "AI आधारित वर्कफ़्लो",
    addObservationImage: "अवलोकन चित्र जोड़ें",
    observationImageHint:
      "सर्वोत्तम पहचान परिणाम के लिए किसी पौधे, जानवर, कीट या खरपतवार की स्पष्ट तस्वीर का उपयोग करें।",
    uploadImage: "चित्र अपलोड करें",
    useCamera: "कैमरा उपयोग करें",
    imageFormats: "JPG, PNG, WebP · अधिकतम 10 MB",
    readyForAnalysis: "विश्लेषण के लिए तैयार",
    removeImage: "चित्र हटाएँ",
    changeImage: "चित्र बदलें",

    locationLabel: "स्थान",
    locationAwareAssessment: "स्थान-आधारित आकलन",
    locationDescription:
      "संदर्भित जोखिम आकलन के लिए AgroBioGuard को आपके वर्तमान स्थान का उपयोग करने दें।",
    gettingLocation: "स्थान प्राप्त किया जा रहा है...",
    updateLocation: "स्थान अपडेट करें",
    useMyLocation: "मेरा स्थान उपयोग करें",
    locationAvailable: "स्थान उपलब्ध है",
    coordinatesUnavailable: "निर्देशांक उपलब्ध नहीं हैं।",
    locationOptional:
      "स्थान वैकल्पिक है। अपना स्थान साझा किए बिना चित्र का विश्लेषण किया जा सकता है।",
    unableToAccessLocation: "आपके वर्तमान स्थान तक पहुँच नहीं हो सकी।",

    addImageBeforeAnalysis: "विश्लेषण शुरू करने से पहले एक चित्र जोड़ें।",
    analyzeImage: "चित्र का विश्लेषण करें",
    analyzingImage: "चित्र का विश्लेषण हो रहा है...",

    analysisResult: "विश्लेषण परिणाम",
    identificationConfidence: "पहचान का विश्वास स्तर",
    identificationSource: "पहचान स्रोत",
    commonName: "सामान्य नाम",
    locationAndContext: "स्थान और संदर्भ",
    deviceLocationAvailable: "डिवाइस स्थान उपलब्ध है।",
    locationNotProvided: "स्थान प्रदान नहीं किया गया।",
    plantIdentificationService: "पौधों की पहचान सेवा",

    emptyResultHeading: "आपकी पहचान का परिणाम यहाँ दिखाई देगा।",
    emptyResultText:
      "परिणाम में पहचानी गई प्रजाति, विश्वास स्तर, AgroBioGuard जोखिम संदर्भ और व्यावहारिक सुझाव शामिल होंगे।",

    imageReadyHeading: "चित्र विश्लेषण के लिए तैयार है।",
    imageReadyText:
      "अपलोड किए गए अवलोकन की पहचान करने के लिए चित्र का विश्लेषण करें चुनें।",

    analyzingHeading: "आपके अवलोकन का विश्लेषण हो रहा है",
    analyzingText:
      "वनस्पति पहचान और AgroBioGuard आकलन संसाधित किए जा रहे हैं।",

    riskAssessment: "AGROBIOGUARD जोखिम आकलन",
    recommendedAction: "अनुशंसित कार्रवाई",

    importantWildlifeAlert: "🚨 महत्वपूर्ण वन्यजीव चेतावनी",
    warningAction: "कार्रवाई",

    locationContextCard: "स्थान संदर्भ",
    deviceLocationUsed: "डिवाइस स्थान का उपयोग किया गया",
    noLocationProvided: "स्थान उपलब्ध नहीं है",
    locationReceived:
      "स्थान-आधारित प्रक्रिया के लिए AgroBioGuard को डिवाइस निर्देशांक प्राप्त हुए हैं।",
    noDeviceLocation:
      "डिवाइस स्थान साझा नहीं किया गया। स्थान जानकारी के बिना भी पहचान की समीक्षा की जा सकती है।",

    analysisNoteTitle: "AI पहचान + AgroBioGuard आकलन।",
    floraNote:
      "पौधों की पहचान PlantNet पहचान सेवा द्वारा प्रदान की जाती है। कृषि जोखिम आकलन AgroBioGuard द्वारा अलग से किया जाता है।",
    faunaNote:
      "जीव-जंतु पहचान Gemini AI सेवा द्वारा प्रदान की जाती है। कृषि और पारिस्थितिक जोखिम आकलन AgroBioGuard द्वारा अलग से किया जाता है।",
  },

  Kannada: {
    sectionEyebrow: "AI ಗುರುತಿಸುವಿಕೆ",
    sectionHeading: "ಕೃಷಿ ಚಿತ್ರವನ್ನು ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹೆಜ್ಜೆಯಾಗಿ ಪರಿವರ್ತಿಸಿ.",
    sectionDescription:
      "ಸ್ಪಷ್ಟವಾದ, ಚೆನ್ನಾಗಿ ಬೆಳಗಿದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಸಾಧನದ ಕ್ಯಾಮೆರಾವನ್ನು ಬಳಸಿ. AgroBioGuard ವೀಕ್ಷಣೆಯನ್ನು ಗುರುತಿಸಿ ನಂತರ ಕೃಷಿ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಕಳುಹಿಸುತ್ತದೆ.",

    identificationType: "ಗುರುತಿಸುವಿಕೆಯ ಪ್ರಕಾರ",
    chooseWhatToIdentify: "ಯಾವುದನ್ನು ಗುರುತಿಸಬೇಕು ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    flora: "ಸಸ್ಯಜಾಲ",
    fauna: "ಪ್ರಾಣಿಜಾಲ",

    imageInput: "ಚಿತ್ರ ಇನ್‌ಪುಟ್",
    aiWorkflow: "AI ಆಧಾರಿತ ಕಾರ್ಯಪ್ರವಾಹ",
    addObservationImage: "ವೀಕ್ಷಣೆಯ ಚಿತ್ರವನ್ನು ಸೇರಿಸಿ",
    observationImageHint:
      "ಉತ್ತಮ ಗುರುತಿಸುವಿಕೆಗಾಗಿ ಒಂದು ಸಸ್ಯ, ಪ್ರಾಣಿ, ಕೀಟ ಅಥವಾ ಕಳೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಬಳಸಿ.",
    uploadImage: "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    useCamera: "ಕ್ಯಾಮೆರಾ ಬಳಸಿ",
    imageFormats: "JPG, PNG, WebP · ಗರಿಷ್ಠ 10 MB",
    readyForAnalysis: "ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
    removeImage: "ಚಿತ್ರವನ್ನು ತೆಗೆದುಹಾಕಿ",
    changeImage: "ಚಿತ್ರವನ್ನು ಬದಲಾಯಿಸಿ",

    locationLabel: "ಸ್ಥಳ",
    locationAwareAssessment: "ಸ್ಥಳ ಆಧಾರಿತ ಮೌಲ್ಯಮಾಪನ",
    locationDescription:
      "ಸಂದರ್ಭಾನುಸಾರ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ AgroBioGuard ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಲು ಅನುಮತಿಸಿ.",
    gettingLocation: "ಸ್ಥಳವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    updateLocation: "ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    locationAvailable: "ಸ್ಥಳ ಲಭ್ಯವಿದೆ",
    coordinatesUnavailable: "ಸಂಯೋಜನೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    locationOptional:
      "ಸ್ಥಳ ಐಚ್ಛಿಕವಾಗಿದೆ. ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳದೆ ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಬಹುದು.",
    unableToAccessLocation: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲಾಗಲಿಲ್ಲ.",

    addImageBeforeAnalysis: "ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಚಿತ್ರವನ್ನು ಸೇರಿಸಿ.",
    analyzeImage: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzingImage: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",

    analysisResult: "ವಿಶ್ಲೇಷಣಾ ಫಲಿತಾಂಶ",
    identificationConfidence: "ಗುರುತಿಸುವಿಕೆ ವಿಶ್ವಾಸ",
    identificationSource: "ಗುರುತಿಸುವಿಕೆ ಮೂಲ",
    commonName: "ಸಾಮಾನ್ಯ ಹೆಸರು",
    locationAndContext: "ಸ್ಥಳ ಮತ್ತು ಸಂದರ್ಭ",
    deviceLocationAvailable: "ಸಾಧನದ ಸ್ಥಳ ಲಭ್ಯವಿದೆ.",
    locationNotProvided: "ಸ್ಥಳ ನೀಡಲಾಗಿಲ್ಲ.",
    plantIdentificationService: "ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆ ಸೇವೆ",

    emptyResultHeading: "ನಿಮ್ಮ ಗುರುತಿನ ಫಲಿತಾಂಶ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
    emptyResultText:
      "ಫಲಿತಾಂಶದಲ್ಲಿ ಗುರುತಿಸಲಾದ ಜಾತಿ, ವಿಶ್ವಾಸ ಮಟ್ಟ, AgroBioGuard ಅಪಾಯದ ಸಂದರ್ಭ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಶಿಫಾರಸು ಇರುತ್ತದೆ.",

    imageReadyHeading: "ಚಿತ್ರವು ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ.",
    imageReadyText:
      "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವೀಕ್ಷಣೆಯನ್ನು ಗುರುತಿಸಲು ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಆಯ್ಕೆಮಾಡಿ.",

    analyzingHeading: "ನಿಮ್ಮ ವೀಕ್ಷಣೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ",
    analyzingText:
      "ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು AgroBioGuard ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ.",

    riskAssessment: "AGROBIOGUARD ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
    recommendedAction: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",

    importantWildlifeAlert: "🚨 ಪ್ರಮುಖ ವನ್ಯಜೀವಿ ಎಚ್ಚರಿಕೆ",
    warningAction: "ಕ್ರಮ",

    locationContextCard: "ಸ್ಥಳ ಸಂದರ್ಭ",
    deviceLocationUsed: "ಸಾಧನದ ಸ್ಥಳವನ್ನು ಬಳಸಲಾಗಿದೆ",
    noLocationProvided: "ಸ್ಥಳ ನೀಡಲಾಗಿಲ್ಲ",
    locationReceived:
      "ಸ್ಥಳ ಆಧಾರಿತ ಪ್ರಕ್ರಿಯೆಗಾಗಿ AgroBioGuard ಸಾಧನದ ಸಂಯೋಜನೆಗಳನ್ನು ಪಡೆದಿದೆ.",
    noDeviceLocation:
      "ಸಾಧನದ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗಿಲ್ಲ. ಸ್ಥಳದ ಮಾಹಿತಿಯಿಲ್ಲದೇ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.",

    analysisNoteTitle: "AI ಗುರುತಿಸುವಿಕೆ + AgroBioGuard ಮೌಲ್ಯಮಾಪನ.",
    floraNote:
      "ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆಯನ್ನು PlantNet ಗುರುತಿಸುವಿಕೆ ಸೇವೆ ಒದಗಿಸುತ್ತದೆ. ಕೃಷಿ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನವನ್ನು AgroBioGuard ಪ್ರತ್ಯೇಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ.",
    faunaNote:
      "ಪ್ರಾಣಿಜಾಲ ಗುರುತಿಸುವಿಕೆಯನ್ನು Gemini AI ಸೇವೆ ಒದಗಿಸುತ್ತದೆ. ಕೃಷಿ ಮತ್ತು ಪರಿಸರ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನವನ್ನು AgroBioGuard ಪ್ರತ್ಯೇಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ.",
  },

  Malayalam: {
    sectionEyebrow: "AI തിരിച്ചറിയൽ",
    sectionHeading: "ഒരു കൃഷിയിട ചിത്രം വ്യക്തമായ അടുത്ത ഘട്ടമാക്കി മാറ്റുക.",
    sectionDescription:
      "വ്യക്തവും നല്ല വെളിച്ചമുള്ളതുമായ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ നിങ്ങളുടെ ഉപകരണത്തിന്റെ ക്യാമറ ഉപയോഗിക്കുക. AgroBioGuard നിരീക്ഷണം തിരിച്ചറിഞ്ഞ ശേഷം കാർഷിക അപകട വിലയിരുത്തൽ പ്രക്രിയയിലേക്ക് അയയ്ക്കുന്നു.",

    identificationType: "തിരിച്ചറിയൽ തരം",
    chooseWhatToIdentify: "തിരിച്ചറിയേണ്ടത് തിരഞ്ഞെടുക്കുക",
    flora: "സസ്യജാലം",
    fauna: "ജീവജാലം",

    imageInput: "ചിത്ര ഇൻപുട്ട്",
    aiWorkflow: "AI അധിഷ്ഠിത പ്രവർത്തനരീതി",
    addObservationImage: "നിരീക്ഷണ ചിത്രം ചേർക്കുക",
    observationImageHint:
      "മികച്ച തിരിച്ചറിയൽ ഫലത്തിനായി ഒരു സസ്യം, ജീവി, കീടം അല്ലെങ്കിൽ കളയുടെ വ്യക്തമായ ചിത്രം ഉപയോഗിക്കുക.",
    uploadImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    useCamera: "ക്യാമറ ഉപയോഗിക്കുക",
    imageFormats: "JPG, PNG, WebP · പരമാവധി 10 MB",
    readyForAnalysis: "വിശകലനത്തിന് തയ്യാറാണ്",
    removeImage: "ചിത്രം നീക്കം ചെയ്യുക",
    changeImage: "ചിത്രം മാറ്റുക",

    locationLabel: "ലൊക്കേഷൻ",
    locationAwareAssessment: "ലൊക്കേഷൻ അടിസ്ഥാനമാക്കിയുള്ള വിലയിരുത്തൽ",
    locationDescription:
      "സന്ദർഭാനുസൃത അപകട വിലയിരുത്തലിനായി AgroBioGuard നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ ഉപയോഗിക്കാൻ അനുവദിക്കുക.",
    gettingLocation: "ലൊക്കേഷൻ ലഭ്യമാക്കുന്നു...",
    updateLocation: "ലൊക്കേഷൻ അപ്‌ഡേറ്റ് ചെയ്യുക",
    useMyLocation: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക",
    locationAvailable: "ലൊക്കേഷൻ ലഭ്യമാണ്",
    coordinatesUnavailable: "കോർഡിനേറ്റുകൾ ലഭ്യമല്ല.",
    locationOptional:
      "ലൊക്കേഷൻ ഓപ്ഷണലാണ്. നിങ്ങളുടെ ലൊക്കേഷൻ പങ്കിടാതെ ചിത്രം വിശകലനം ചെയ്യാം.",
    unableToAccessLocation: "നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ ആക്സസ് ചെയ്യാനായില്ല.",

    addImageBeforeAnalysis: "വിശകലനം ആരംഭിക്കുന്നതിന് മുമ്പ് ഒരു ചിത്രം ചേർക്കുക.",
    analyzeImage: "ചിത്രം വിശകലനം ചെയ്യുക",
    analyzingImage: "ചിത്രം വിശകലനം ചെയ്യുന്നു...",

    analysisResult: "വിശകലന ഫലം",
    identificationConfidence: "തിരിച്ചറിയൽ വിശ്വാസനില",
    identificationSource: "തിരിച്ചറിയൽ ഉറവിടം",
    commonName: "സാധാരണ പേര്",
    locationAndContext: "സ്ഥലവും സാഹചര്യവും",
    deviceLocationAvailable: "ഉപകരണ ലൊക്കേഷൻ ലഭ്യമാണ്.",
    locationNotProvided: "ലൊക്കേഷൻ നൽകിയിട്ടില്ല.",
    plantIdentificationService: "സസ്യ തിരിച്ചറിയൽ സേവനം",

    emptyResultHeading: "നിങ്ങളുടെ തിരിച്ചറിയൽ ഫലം ഇവിടെ കാണിക്കും.",
    emptyResultText:
      "ഫലത്തിൽ തിരിച്ചറിഞ്ഞ ഇനം, വിശ്വാസനില, AgroBioGuard അപകടസന്ദർഭം, പ്രായോഗിക ശുപാർശ എന്നിവ ഉൾപ്പെടും.",

    imageReadyHeading: "ചിത്രം വിശകലനത്തിന് തയ്യാറാണ്.",
    imageReadyText:
      "അപ്‌ലോഡ് ചെയ്ത നിരീക്ഷണം തിരിച്ചറിയാൻ ചിത്രം വിശകലനം ചെയ്യുക തിരഞ്ഞെടുക്കുക.",

    analyzingHeading: "നിങ്ങളുടെ നിരീക്ഷണം വിശകലനം ചെയ്യുന്നു",
    analyzingText:
      "സസ്യ തിരിച്ചറിയലും AgroBioGuard വിലയിരുത്തലും പ്രോസസ്സ് ചെയ്യുന്നു.",

    riskAssessment: "AGROBIOGUARD അപകട വിലയിരുത്തൽ",
    recommendedAction: "ശുപാർശ ചെയ്യുന്ന നടപടി",

    importantWildlifeAlert: "🚨 പ്രധാന വന്യജീവി മുന്നറിയിപ്പ്",
    warningAction: "നടപടി",

    locationContextCard: "ലൊക്കേഷൻ സന്ദർഭം",
    deviceLocationUsed: "ഉപകരണ ലൊക്കേഷൻ ഉപയോഗിച്ചു",
    noLocationProvided: "ലൊക്കേഷൻ നൽകിയിട്ടില്ല",
    locationReceived:
      "ലൊക്കേഷൻ അടിസ്ഥാനമാക്കിയുള്ള പ്രോസസ്സിംഗിനായി AgroBioGuard ഉപകരണ കോർഡിനേറ്റുകൾ സ്വീകരിച്ചു.",
    noDeviceLocation:
      "ഉപകരണ ലൊക്കേഷൻ പങ്കിട്ടിട്ടില്ല. ലൊക്കേഷൻ വിവരമില്ലാതെയും തിരിച്ചറിയൽ പരിശോധിക്കാം.",

    analysisNoteTitle: "AI തിരിച്ചറിയൽ + AgroBioGuard വിലയിരുത്തൽ.",
    floraNote:
      "സസ്യ തിരിച്ചറിയൽ PlantNet തിരിച്ചറിയൽ സേവനം നൽകുന്നു. കാർഷിക അപകട വിലയിരുത്തൽ AgroBioGuard പ്രത്യേകം കൈകാര്യം ചെയ്യുന്നു.",
    faunaNote:
      "ജീവജാല തിരിച്ചറിയൽ Gemini AI സേവനം നൽകുന്നു. കാർഷികവും പരിസ്ഥിതിയും സംബന്ധിച്ച അപകട വിലയിരുത്തൽ AgroBioGuard പ്രത്യേകം കൈകാര്യം ചെയ്യുന്നു.",
  },
} as const;

export function getIdentificationTranslations(
  language: IdentificationLanguage,
) {
  return (
    identificationTranslations[language] ??
    identificationTranslations.English
  );
}

export type IdentificationTranslationKey =
  keyof typeof identificationTranslations.English;