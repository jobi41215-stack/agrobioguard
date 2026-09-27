"use client";

import {
  ChangeEvent,
  useState,
} from "react";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";
import {
  OfflinePestDemoAnalyzer,
} from "@/lib/analysis/offline-pest-demo-analyzer";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { AnalysisResult } from "@/lib/analysis/types";
import type {
  LocationContext,
  RiskAssessment,
} from "@/lib/analysis/risk-types";

type PestUiText = {
  eyebrow: string;
  title: string;
  description: string;
  localDemo: string;
  localDemoDescription: string;
  agriculturalMonitoring: string;
  agriculturalMonitoringDescription: string;
  uploadPestImage: string;
  uploadPestImageDescription: string;
  imageReady: string;
  selectedPestImage: string;
  removeImage: string;
  locationRiskContext: string;
  locationRiskDescription: string;
  gettingLocation: string;
  updateLocation: string;
  useMyLocation: string;
  deviceLocationAvailable: string;
  locationUnavailable: string;
  uploadBeforeDemo: string;
  runningDemo: string;
  analyzeDemo: string;
  analysisResult: string;
  resultWillAppear: string;
  resultDescription: string;
  pest: string;
  demoConfidence: string;
  scientificName: string;
  detectionSource: string;
  locationContext: string;
  locationCoordinatesUnavailable: string;
  notProvided: string;
  localPestDemo: string;
  riskAssessment: string;
  recommendedAction: string;
};

const pestUiTranslations: Record<
  SupportedLanguage,
  PestUiText
> = {
  English: {
    eyebrow: "PEST & WEED DETECTION",
    title: "Detect Agricultural Pests",
    description:
      "Upload an insect or pest image to demonstrate AgroBioGuard's agricultural risk workflow.",
    localDemo: "LOCAL PEST DEMO",
    localDemoDescription:
      "No cloud AI API is used for this demonstration.",
    agriculturalMonitoring: "Agricultural Monitoring",
    agriculturalMonitoringDescription:
      "Demonstrating pest identification and agricultural risk assessment.",
    uploadPestImage: "Upload a pest image",
    uploadPestImageDescription:
      "Use a clear insect, pest, or crop-damage image for the demonstration.",
    imageReady: "IMAGE READY",
    selectedPestImage: "Selected pest image",
    removeImage: "Remove image",
    locationRiskContext: "Location-aware risk context",
    locationRiskDescription:
      "Add device location to attach surroundings to the demo assessment.",
    gettingLocation: "Getting location...",
    updateLocation: "Update location",
    useMyLocation: "Use my location",
    deviceLocationAvailable:
      "Device location available.",
    locationUnavailable:
      "Location could not be accessed. The demo can still continue.",
    uploadBeforeDemo:
      "Upload a pest image before starting the demo.",
    runningDemo: "Running pest demo...",
    analyzeDemo: "Analyze pest demo",
    analysisResult: "ANALYSIS RESULT",
    resultWillAppear:
      "Pest analysis will appear here.",
    resultDescription:
      "The demonstration will show a pest identification, risk level, and recommended agricultural action.",
    pest: "Pest",
    demoConfidence: "Demo confidence",
    scientificName: "Scientific name",
    detectionSource: "Detection source",
    locationContext: "Location context",
    locationCoordinatesUnavailable:
      "Location available, coordinates unavailable",
    notProvided: "Not provided",
    localPestDemo: "Local Pest Demo",
    riskAssessment: "AGROBIOGUARD RISK ASSESSMENT",
    recommendedAction: "Recommended action",
  },

  Tamil: {
    eyebrow: "பூச்சி மற்றும் களை கண்டறிதல்",
    title: "வேளாண் பூச்சிகளை கண்டறியவும்",
    description:
      "AgroBioGuard வேளாண் அபாய செயல்முறையை விளக்க பூச்சி அல்லது பூச்சி படத்தைப் பதிவேற்றவும்.",
    localDemo: "உள்ளூர் பூச்சி டெமோ",
    localDemoDescription:
      "இந்த விளக்கக் காட்சிக்கு கிளவுட் AI API பயன்படுத்தப்படவில்லை.",
    agriculturalMonitoring: "வேளாண் கண்காணிப்பு",
    agriculturalMonitoringDescription:
      "பூச்சி அடையாளம் மற்றும் வேளாண் அபாய மதிப்பீட்டை விளக்குகிறது.",
    uploadPestImage: "பூச்சிப் படத்தைப் பதிவேற்றவும்",
    uploadPestImageDescription:
      "விளக்கக் காட்சிக்காக தெளிவான பூச்சி, பூச்சி சேதம் அல்லது பயிர் சேதப் படத்தைப் பயன்படுத்தவும்.",
    imageReady: "படம் தயாராக உள்ளது",
    selectedPestImage: "தேர்ந்தெடுக்கப்பட்ட பூச்சிப் படம்",
    removeImage: "படத்தை அகற்றவும்",
    locationRiskContext: "இருப்பிட அடிப்படையிலான அபாயச் சூழல்",
    locationRiskDescription:
      "டெமோ மதிப்பீட்டில் சுற்றுப்புறத் தகவலை இணைக்க சாதன இருப்பிடத்தைச் சேர்க்கவும்.",
    gettingLocation: "இருப்பிடம் பெறப்படுகிறது...",
    updateLocation: "இருப்பிடத்தைப் புதுப்பிக்கவும்",
    useMyLocation: "என் இருப்பிடத்தைப் பயன்படுத்தவும்",
    deviceLocationAvailable:
      "சாதன இருப்பிடம் கிடைக்கிறது.",
    locationUnavailable:
      "இருப்பிடத்தை அணுக முடியவில்லை. டெமோவைத் தொடரலாம்.",
    uploadBeforeDemo:
      "டெமோவைத் தொடங்குவதற்கு முன் பூச்சிப் படத்தைப் பதிவேற்றவும்.",
    runningDemo: "பூச்சி டெமோ இயங்குகிறது...",
    analyzeDemo: "பூச்சி டெமோவை பகுப்பாய்வு செய்யவும்",
    analysisResult: "பகுப்பாய்வு முடிவு",
    resultWillAppear:
      "பூச்சி பகுப்பாய்வு முடிவு இங்கே தோன்றும்.",
    resultDescription:
      "இந்த டெமோ பூச்சி அடையாளம், அபாய நிலை மற்றும் பரிந்துரைக்கப்பட்ட வேளாண் நடவடிக்கையை காட்டும்.",
    pest: "பூச்சி",
    demoConfidence: "டெமோ நம்பகத்தன்மை",
    scientificName: "அறிவியல் பெயர்",
    detectionSource: "கண்டறிதல் மூலம்",
    locationContext: "இருப்பிடம் மற்றும் சூழல்",
    locationCoordinatesUnavailable:
      "இருப்பிடம் கிடைக்கிறது, ஆனால் ஆயத்தொலைவுகள் கிடைக்கவில்லை",
    notProvided: "வழங்கப்படவில்லை",
    localPestDemo: "உள்ளூர் பூச்சி டெமோ",
    riskAssessment: "AGROBIOGUARD அபாய மதிப்பீடு",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
  },

  Telugu: {
    eyebrow: "కీటకాలు మరియు కలుపు గుర్తింపు",
    title: "వ్యవసాయ కీటకాలను గుర్తించండి",
    description:
      "AgroBioGuard వ్యవసాయ ప్రమాద ప్రక్రియను ప్రదర్శించడానికి కీటకం లేదా పురుగు చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    localDemo: "స్థానిక కీటక డెమో",
    localDemoDescription:
      "ఈ ప్రదర్శనలో క్లౌడ్ AI API ఉపయోగించబడదు.",
    agriculturalMonitoring: "వ్యవసాయ పర్యవేక్షణ",
    agriculturalMonitoringDescription:
      "కీటక గుర్తింపు మరియు వ్యవసాయ ప్రమాద అంచనాను ప్రదర్శిస్తోంది.",
    uploadPestImage: "కీటక చిత్రాన్ని అప్‌లోడ్ చేయండి",
    uploadPestImageDescription:
      "డెమో కోసం స్పష్టమైన కీటకం, పురుగు లేదా పంట నష్టం చిత్రాన్ని ఉపయోగించండి.",
    imageReady: "చిత్రం సిద్ధంగా ఉంది",
    selectedPestImage: "ఎంచుకున్న కీటక చిత్రం",
    removeImage: "చిత్రాన్ని తొలగించండి",
    locationRiskContext: "స్థాన ఆధారిత ప్రమాద సందర్భం",
    locationRiskDescription:
      "డెమో అంచనాకు పరిసరాలను జోడించడానికి పరికరం స్థానాన్ని జోడించండి.",
    gettingLocation: "స్థానం పొందుతోంది...",
    updateLocation: "స్థానాన్ని నవీకరించండి",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించండి",
    deviceLocationAvailable:
      "పరికరం స్థానం అందుబాటులో ఉంది.",
    locationUnavailable:
      "స్థానాన్ని యాక్సెస్ చేయలేకపోయాం. డెమో కొనసాగించవచ్చు.",
    uploadBeforeDemo:
      "డెమో ప్రారంభించే ముందు కీటక చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    runningDemo: "కీటక డెమో నడుస్తోంది...",
    analyzeDemo: "కీటక డెమోను విశ్లేషించండి",
    analysisResult: "విశ్లేషణ ఫలితం",
    resultWillAppear:
      "కీటక విశ్లేషణ ఫలితం ఇక్కడ కనిపిస్తుంది.",
    resultDescription:
      "డెమో కీటక గుర్తింపు, ప్రమాద స్థాయి మరియు సిఫార్సు చేసిన వ్యవసాయ చర్యను చూపిస్తుంది.",
    pest: "కీటకం",
    demoConfidence: "డెమో నమ్మకం",
    scientificName: "శాస్త్రీయ పేరు",
    detectionSource: "గుర్తింపు మూలం",
    locationContext: "స్థానం మరియు సందర్భం",
    locationCoordinatesUnavailable:
      "స్థానం అందుబాటులో ఉంది, కానీ కోఆర్డినేట్లు అందుబాటులో లేవు",
    notProvided: "అందించబడలేదు",
    localPestDemo: "స్థానిక కీటక డెమో",
    riskAssessment: "AGROBIOGUARD ప్రమాద అంచనా",
    recommendedAction: "సిఫార్సు చేసిన చర్య",
  },

  Hindi: {
    eyebrow: "कीट और खरपतवार पहचान",
    title: "कृषि कीटों की पहचान करें",
    description:
      "AgroBioGuard के कृषि जोखिम कार्यप्रवाह को प्रदर्शित करने के लिए कीट की छवि अपलोड करें।",
    localDemo: "स्थानीय कीट डेमो",
    localDemoDescription:
      "इस प्रदर्शन के लिए क्लाउड AI API का उपयोग नहीं किया जाता है।",
    agriculturalMonitoring: "कृषि निगरानी",
    agriculturalMonitoringDescription:
      "कीट पहचान और कृषि जोखिम आकलन का प्रदर्शन।",
    uploadPestImage: "कीट की छवि अपलोड करें",
    uploadPestImageDescription:
      "डेमो के लिए स्पष्ट कीट या फसल क्षति की छवि का उपयोग करें।",
    imageReady: "छवि तैयार है",
    selectedPestImage: "चयनित कीट छवि",
    removeImage: "छवि हटाएँ",
    locationRiskContext: "स्थान-आधारित जोखिम संदर्भ",
    locationRiskDescription:
      "डेमो आकलन में आसपास की जानकारी जोड़ने के लिए डिवाइस स्थान जोड़ें।",
    gettingLocation: "स्थान प्राप्त किया जा रहा है...",
    updateLocation: "स्थान अपडेट करें",
    useMyLocation: "मेरा स्थान उपयोग करें",
    deviceLocationAvailable:
      "डिवाइस स्थान उपलब्ध है।",
    locationUnavailable:
      "स्थान तक पहुँचा नहीं जा सका। डेमो जारी रह सकता है।",
    uploadBeforeDemo:
      "डेमो शुरू करने से पहले कीट की छवि अपलोड करें।",
    runningDemo: "कीट डेमो चल रहा है...",
    analyzeDemo: "कीट डेमो का विश्लेषण करें",
    analysisResult: "विश्लेषण परिणाम",
    resultWillAppear:
      "कीट विश्लेषण का परिणाम यहाँ दिखाई देगा।",
    resultDescription:
      "डेमो कीट पहचान, जोखिम स्तर और अनुशंसित कृषि कार्रवाई दिखाएगा।",
    pest: "कीट",
    demoConfidence: "डेमो विश्वास",
    scientificName: "वैज्ञानिक नाम",
    detectionSource: "पहचान स्रोत",
    locationContext: "स्थान और संदर्भ",
    locationCoordinatesUnavailable:
      "स्थान उपलब्ध है, लेकिन निर्देशांक उपलब्ध नहीं हैं",
    notProvided: "प्रदान नहीं किया गया",
    localPestDemo: "स्थानीय कीट डेमो",
    riskAssessment: "AGROBIOGUARD जोखिम आकलन",
    recommendedAction: "अनुशंसित कार्रवाई",
  },

  Kannada: {
    eyebrow: "ಕೀಟ ಮತ್ತು ಕಳೆ ಪತ್ತೆ",
    title: "ಕೃಷಿ ಕೀಟಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
    description:
      "AgroBioGuard ಕೃಷಿ ಅಪಾಯ ಕಾರ್ಯಪ್ರವಾಹವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಕೀಟದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    localDemo: "ಸ್ಥಳೀಯ ಕೀಟ ಡೆಮೋ",
    localDemoDescription:
      "ಈ ಪ್ರದರ್ಶನದಲ್ಲಿ ಕ್ಲೌಡ್ AI API ಬಳಸಲಾಗುವುದಿಲ್ಲ.",
    agriculturalMonitoring: "ಕೃಷಿ ಮೇಲ್ವಿಚಾರಣೆ",
    agriculturalMonitoringDescription:
      "ಕೀಟ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಕೃಷಿ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನವನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ.",
    uploadPestImage: "ಕೀಟದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadPestImageDescription:
      "ಡೆಮೋಗಾಗಿ ಸ್ಪಷ್ಟವಾದ ಕೀಟ ಅಥವಾ ಬೆಳೆ ಹಾನಿಯ ಚಿತ್ರವನ್ನು ಬಳಸಿ.",
    imageReady: "ಚಿತ್ರ ಸಿದ್ಧವಾಗಿದೆ",
    selectedPestImage: "ಆಯ್ಕೆ ಮಾಡಿದ ಕೀಟದ ಚಿತ್ರ",
    removeImage: "ಚಿತ್ರವನ್ನು ತೆಗೆದುಹಾಕಿ",
    locationRiskContext: "ಸ್ಥಳ-ಆಧಾರಿತ ಅಪಾಯ ಸಂದರ್ಭ",
    locationRiskDescription:
      "ಡೆಮೋ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಸುತ್ತಮುತ್ತಲಿನ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಲು ಸಾಧನದ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ.",
    gettingLocation: "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    updateLocation: "ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    deviceLocationAvailable:
      "ಸಾಧನದ ಸ್ಥಳ ಲಭ್ಯವಿದೆ.",
    locationUnavailable:
      "ಸ್ಥಳವನ್ನು ಪ್ರವೇಶಿಸಲಾಗಲಿಲ್ಲ. ಡೆಮೋ ಮುಂದುವರಿಯಬಹುದು.",
    uploadBeforeDemo:
      "ಡೆಮೋ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಕೀಟದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    runningDemo: "ಕೀಟ ಡೆಮೋ ನಡೆಯುತ್ತಿದೆ...",
    analyzeDemo: "ಕೀಟ ಡೆಮೋವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analysisResult: "ವಿಶ್ಲೇಷಣಾ ಫಲಿತಾಂಶ",
    resultWillAppear:
      "ಕೀಟ ವಿಶ್ಲೇಷಣಾ ಫಲಿತಾಂಶ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
    resultDescription:
      "ಡೆಮೋ ಕೀಟ ಗುರುತಿಸುವಿಕೆ, ಅಪಾಯ ಮಟ್ಟ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಿದ ಕೃಷಿ ಕ್ರಮವನ್ನು ತೋರಿಸುತ್ತದೆ.",
    pest: "ಕೀಟ",
    demoConfidence: "ಡೆಮೋ ವಿಶ್ವಾಸ",
    scientificName: "ವೈಜ್ಞಾನಿಕ ಹೆಸರು",
    detectionSource: "ಪತ್ತೆ ಮೂಲ",
    locationContext: "ಸ್ಥಳ ಮತ್ತು ಸಂದರ್ಭ",
    locationCoordinatesUnavailable:
      "ಸ್ಥಳ ಲಭ್ಯವಿದೆ, ಆದರೆ ಸಂಯೋಜನೆಗಳು ಲಭ್ಯವಿಲ್ಲ",
    notProvided: "ಒದಗಿಸಲಾಗಿಲ್ಲ",
    localPestDemo: "ಸ್ಥಳೀಯ ಕೀಟ ಡೆಮೋ",
    riskAssessment: "AGROBIOGUARD ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
    recommendedAction: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
  },

  Malayalam: {
    eyebrow: "കീടവും കളയും കണ്ടെത്തൽ",
    title: "കാർഷിക കീടങ്ങളെ കണ്ടെത്തുക",
    description:
      "AgroBioGuard-ന്റെ കാർഷിക അപകട പ്രവർത്തനരീതി പ്രദർശിപ്പിക്കാൻ ഒരു കീടചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
    localDemo: "പ്രാദേശിക കീട ഡെമോ",
    localDemoDescription:
      "ഈ പ്രദർശനത്തിൽ ക്ലൗഡ് AI API ഉപയോഗിക്കുന്നില്ല.",
    agriculturalMonitoring: "കാർഷിക നിരീക്ഷണം",
    agriculturalMonitoringDescription:
      "കീട തിരിച്ചറിയലും കാർഷിക അപകട വിലയിരുത്തലും പ്രദർശിപ്പിക്കുന്നു.",
    uploadPestImage: "കീടത്തിന്റെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    uploadPestImageDescription:
      "ഡെമോയ്ക്കായി വ്യക്തമായ കീടം അല്ലെങ്കിൽ വിളനാശ ചിത്രം ഉപയോഗിക്കുക.",
    imageReady: "ചിത്രം തയ്യാറാണ്",
    selectedPestImage: "തിരഞ്ഞെടുത്ത കീട ചിത്രം",
    removeImage: "ചിത്രം നീക്കം ചെയ്യുക",
    locationRiskContext: "ലൊക്കേഷൻ അടിസ്ഥാനമാക്കിയ അപകട സന്ദർഭം",
    locationRiskDescription:
      "ഡെമോ വിലയിരുത്തലിലേക്ക് ചുറ്റുപാടുകൾ ചേർക്കാൻ ഉപകരണ ലൊക്കേഷൻ ചേർക്കുക.",
    gettingLocation: "ലൊക്കേഷൻ ലഭ്യമാക്കുന്നു...",
    updateLocation: "ലൊക്കേഷൻ അപ്‌ഡേറ്റ് ചെയ്യുക",
    useMyLocation: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക",
    deviceLocationAvailable:
      "ഉപകരണ ലൊക്കേഷൻ ലഭ്യമാണ്.",
    locationUnavailable:
      "ലൊക്കേഷൻ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ഡെമോ തുടരാം.",
    uploadBeforeDemo:
      "ഡെമോ ആരംഭിക്കുന്നതിന് മുമ്പ് കീടത്തിന്റെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
    runningDemo: "കീട ഡെമോ പ്രവർത്തിക്കുന്നു...",
    analyzeDemo: "കീട ഡെമോ വിശകലനം ചെയ്യുക",
    analysisResult: "വിശകലന ഫലം",
    resultWillAppear:
      "കീട വിശകലന ഫലം ഇവിടെ പ്രത്യക്ഷപ്പെടും.",
    resultDescription:
      "ഡെമോ കീട തിരിച്ചറിയൽ, അപകടനില, ശുപാർശ ചെയ്യുന്ന കാർഷിക നടപടി എന്നിവ കാണിക്കും.",
    pest: "കീടം",
    demoConfidence: "ഡെമോ വിശ്വാസം",
    scientificName: "ശാസ്ത്രീയ നാമം",
    detectionSource: "കണ്ടെത്തൽ ഉറവിടം",
    locationContext: "ലൊക്കേഷനും സന്ദർഭവും",
    locationCoordinatesUnavailable:
      "ലൊക്കേഷൻ ലഭ്യമാണ്, പക്ഷേ കോർഡിനേറ്റുകൾ ലഭ്യമല്ല",
    notProvided: "നൽകിയിട്ടില്ല",
    localPestDemo: "പ്രാദേശിക കീട ഡെമോ",
    riskAssessment: "AGROBIOGUARD അപകട വിലയിരുത്തൽ",
    recommendedAction: "ശുപാർശ ചെയ്യുന്ന നടപടി",
  },
};

const localeMap: Record<
  SupportedLanguage,
  string
> = {
  English: "en-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Hindi: "hi-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
};

export function PestWeedWorkspace() {
  const { language } = useLanguage();
  const baseTranslations =
    getTranslations(language);
  const t = pestUiTranslations[language];

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [result, setResult] =
    useState<AnalysisResult>();
  const [assessment, setAssessment] =
    useState<RiskAssessment>();
  const [location, setLocation] =
    useState<LocationContext>();
  const [locationLoading, setLocationLoading] =
    useState(false);
  const [locationMessage, setLocationMessage] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  function selectImage(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setLocationMessage(
        t.uploadBeforeDemo,
      );
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(
      URL.createObjectURL(file),
    );
    setResult(undefined);
    setAssessment(undefined);
    setLocationMessage("");
  }

  async function useMyLocation() {
    setLocationLoading(true);
    setLocationMessage("");

    try {
      const currentLocation =
        await getCurrentLocation();

      setLocation({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        source: "device",
      });

      setLocationMessage(
        t.deviceLocationAvailable,
      );
    } catch {
      setLocationMessage(
        t.locationUnavailable,
      );
    } finally {
      setLocationLoading(false);
    }
  }

  async function analyzeDemo() {
    if (!image) {
      setLocationMessage(
        t.uploadBeforeDemo,
      );
      return;
    }

    setLoading(true);
    setResult(undefined);
    setAssessment(undefined);

    try {
      const analysis =
        await new OfflinePestDemoAnalyzer().analyzeImage(
          {
            image,
          },
        );

      const risk = assessRisk(
        analysis,
        location,
        language,
      );

      setResult(analysis);
      setAssessment(risk);
    } finally {
      setLoading(false);
    }
  }

  function getDisplayedDescription() {
    switch (language) {
      case "Tamil":
        return "இந்த முடிவு AgroBioGuard உள்ளூர் பூச்சி டெமோ இயந்திரத்தால் உருவாக்கப்பட்டது. பதிவேற்றிய படம் டெமோ தொடர்பு உள்ளீடாகப் பயன்படுத்தப்படுகிறது.";
      case "Telugu":
        return "ఈ ఫలితం AgroBioGuard స్థానిక కీటక డెమో ఇంజిన్ ద్వారా రూపొందించబడింది. అప్‌లోడ్ చేసిన చిత్రం డెమో పరస్పర చర్య కోసం ఉపయోగించబడుతుంది.";
      case "Hindi":
        return "यह परिणाम AgroBioGuard के स्थानीय कीट डेमो इंजन द्वारा तैयार किया गया है। अपलोड की गई छवि का उपयोग डेमो इंटरैक्शन इनपुट के रूप में किया जाता है।";
      case "Kannada":
        return "ಈ ಫಲಿತಾಂಶವನ್ನು AgroBioGuard ಸ್ಥಳೀಯ ಕೀಟ ಡೆಮೋ ಎಂಜಿನ್ ರಚಿಸಿದೆ. ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರವನ್ನು ಡೆಮೋ ಸಂವಹನ ಇನ್‌ಪುಟ್ ಆಗಿ ಬಳಸಲಾಗುತ್ತದೆ.";
      case "Malayalam":
        return "ഈ ഫലം AgroBioGuard-ന്റെ പ്രാദേശിക കീട ഡെമോ എഞ്ചിൻ സൃഷ്ടിച്ചതാണ്. അപ്‌ലോഡ് ചെയ്ത ചിത്രം ഡെമോ ഇടപെടൽ ഇൻപുട്ടായി ഉപയോഗിക്കുന്നു.";
      default:
        return "This result was generated by the AgroBioGuard local pest demonstration engine. The uploaded image is used as the demo interaction input.";
    }
  }

  function getLocationDisplay() {
    if (
      location?.latitude !== undefined &&
      location?.longitude !== undefined
    ) {
      return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    }

    if (location) {
      return t.locationCoordinatesUnavailable;
    }

    return t.notProvided;
  }

  return (
    <section
      className="identification-section"
      id="pest-demo"
      aria-labelledby="pest-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> {t.eyebrow}
          </p>

          <h2 id="pest-title">
            {t.title}
          </h2>

          <p>{t.description}</p>
        </div>

        <div className="identification-grid">
          <div className="upload-panel">
            <div className="ai-mode-banner offline">
              <div className="ai-mode-icon">
                🐛
              </div>

              <div>
                <strong>
                  {t.localDemo}
                </strong>

                <span>
                  {t.localDemoDescription}
                </span>
              </div>
            </div>

            <div className="view-context-banner">
              <span className="view-context-icon">
                🌾
              </span>

              <div>
                <strong>
                  {t.agriculturalMonitoring}
                </strong>

                <span>
                  {
                    t.agriculturalMonitoringDescription
                  }
                </span>
              </div>
            </div>

            {!preview ? (
              <div className="dropzone">
                <span
                  className="upload-symbol"
                  aria-hidden="true"
                >
                  🐛
                </span>

                <h3>
                  {t.uploadPestImage}
                </h3>

                <p>
                  {
                    t.uploadPestImageDescription
                  }
                </p>

                <div className="upload-actions">
                  <label className="button primary upload-trigger">
                    {baseTranslations.uploadImage}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        selectImage
                      }
                    />
                  </label>

                  <label className="button outline upload-trigger">
                    {baseTranslations.useCamera}

                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={
                        selectImage
                      }
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="image-preview-wrap">
                <img
                  className="image-preview"
                  src={preview}
                  alt={
                    t.selectedPestImage
                  }
                />

                <div className="preview-details">
                  <span>
                    <b>
                      {t.imageReady}
                    </b>

                    <small>
                      {image?.name}
                    </small>
                  </span>

                  <button
                    className="remove-image"
                    type="button"
                    onClick={() => {
                      if (
                        preview?.startsWith(
                          "blob:",
                        )
                      ) {
                        URL.revokeObjectURL(
                          preview,
                        );
                      }

                      setImage(undefined);
                      setPreview(undefined);
                      setResult(
                        undefined,
                      );
                      setAssessment(
                        undefined,
                      );
                    }}
                  >
                    {t.removeImage}
                  </button>
                </div>
              </div>
            )}

            <div className="location-panel">
              <div className="location-panel-header">
                <div>
                  <span
                    className="location-icon"
                    aria-hidden="true"
                  >
                    📍
                  </span>

                  <div>
                    <strong>
                      {t.locationRiskContext}
                    </strong>

                    <p>
                      {
                        t.locationRiskDescription
                      }
                    </p>
                  </div>
                </div>

                <button
                  className="button outline"
                  type="button"
                  onClick={
                    useMyLocation
                  }
                  disabled={
                    locationLoading
                  }
                >
                  {locationLoading
                    ? t.gettingLocation
                    : location
                      ? t.updateLocation
                      : t.useMyLocation}
                </button>
              </div>

              {locationMessage ? (
                <small className="location-note">
                  {locationMessage}
                </small>
              ) : null}
            </div>

            <button
              className="button analyze-button"
              type="button"
              onClick={analyzeDemo}
              disabled={loading}
            >
              {loading
                ? t.runningDemo
                : t.analyzeDemo}

              <span>→</span>
            </button>
          </div>

          <div
            className="result-panel"
            aria-live="polite"
          >
            <div className="panel-label">
              <span>
                {t.analysisResult}
              </span>

              <b className="demo-label">
                {t.localDemo}
              </b>
            </div>

            {!result ? (
              <div className="result-empty">
                <span
                  aria-hidden="true"
                >
                  🐛
                </span>

                <h3>
                  {t.resultWillAppear}
                </h3>

                <p>
                  {t.resultDescription}
                </p>
              </div>
            ) : (
              <div className="result-content">
                <div className="result-title">
                  <span className="category-pill">
                    {t.pest}
                  </span>

                  {result.confidence !==
                  undefined ? (
                    <span className="confidence">
                      {t.demoConfidence}{" "}
                      <b>
                        {result.confidence}%
                      </b>
                    </span>
                  ) : null}
                </div>

                <h3>
                  {result.identifiedName}
                </h3>

                <p className="result-description">
                  {getDisplayedDescription()}
                </p>

                <dl className="result-details">
                  <div>
                    <dt>
                      {t.scientificName}
                    </dt>

                    <dd>
                      {
                        result.scientificName
                      }
                    </dd>
                  </div>

                  <div>
                    <dt>
                      {t.detectionSource}
                    </dt>

                    <dd>
                      {t.localPestDemo}
                    </dd>
                  </div>

                  <div>
                    <dt>
                      {t.locationContext}
                    </dt>

                    <dd>
                      {getLocationDisplay()}
                    </dd>
                  </div>
                </dl>

                {assessment ? (
                  <div className="risk-assessment-card">
                    <div className="risk-assessment-header">
                      <span>
                        {t.riskAssessment}
                      </span>

                      <strong>
                        {assessment.level.toUpperCase()}
                      </strong>
                    </div>

                    <h4>
                      {assessment.title}
                    </h4>

                    <p>
                      {assessment.description}
                    </p>

                    <div className="risk-recommendation">
                      <b>
                        {t.recommendedAction}
                      </b>

                      <span>
                        {
                          assessment.recommendation
                        }
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}