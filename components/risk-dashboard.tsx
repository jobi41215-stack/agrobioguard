"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";

type SavedObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};

type RiskUiText = {
  riskAssessment: string;
  riskIntelligence: string;
  description: string;
  highRiskEvents: string;
  requiresAttention: string;
  moderateEvents: string;
  continueMonitoring: string;
  totalObservations: string;
  storedLocally: string;
  highPriorityEvent: string;
  highRiskObservationStored: string;
  category: string;
  source: string;
  localObservation: string;
  detected: string;
  recommendedAction: string;
  openCctvMonitoring: string;
  viewFarmDashboard: string;
  noHighRiskEvent: string;
  newObservationsAppear: string;
  observationHistory: string;
  recentRiskEvents: string;
  stored: string;
  noLocalObservations: string;
  latestObservation: string;
  high: string;
  moderate: string;
  low: string;
  unknown: string;
  flora: string;
  fauna: string;
  pest: string;
  insect: string;
  weed: string;
  safeWildlifeRecommendation: string;
  pestRecommendation: string;
  weedRecommendation: string;
  generalRecommendation: string;
};

const riskUiTranslations: Record<
  SupportedLanguage,
  RiskUiText
> = {
  English: {
    riskAssessment: "RISK ASSESSMENT",
    riskIntelligence: "AgroBioGuard Risk Intelligence",
    description:
      "Review recent observations, identify high-risk events, and understand the recommended next step.",
    highRiskEvents: "HIGH RISK EVENTS",
    requiresAttention: "Requires attention",
    moderateEvents: "MODERATE EVENTS",
    continueMonitoring: "Continue monitoring",
    totalObservations: "TOTAL OBSERVATIONS",
    storedLocally: "Stored locally",
    highPriorityEvent: "HIGH PRIORITY EVENT",
    highRiskObservationStored:
      "A high-risk observation is currently stored in AgroBioGuard.",
    category: "Category",
    source: "Source",
    localObservation: "Local observation",
    detected: "Detected",
    recommendedAction: "Recommended action",
    openCctvMonitoring: "Open CCTV Monitoring",
    viewFarmDashboard: "View Farm Dashboard",
    noHighRiskEvent: "No high-risk event is active",
    newObservationsAppear:
      "New local observations will appear here when they are created.",
    observationHistory: "OBSERVATION HISTORY",
    recentRiskEvents: "Recent Risk Events",
    stored: "stored",
    noLocalObservations:
      "No local observations available.",
    latestObservation: "Latest observation",
    high: "HIGH",
    moderate: "MODERATE",
    low: "LOW",
    unknown: "UNKNOWN",
    flora: "Flora",
    fauna: "Fauna",
    pest: "Pest",
    insect: "Insect",
    weed: "Weed",
    safeWildlifeRecommendation:
      "Maintain a safe distance and follow appropriate wildlife-safety procedures.",
    pestRecommendation:
      "Inspect nearby crops and confirm the identification before applying pest-control measures.",
    weedRecommendation:
      "Inspect the affected area and confirm the identification before taking control measures.",
    generalRecommendation:
      "Review the observation and monitor the surrounding area.",
  },

  Tamil: {
    riskAssessment: "அபாய மதிப்பீடு",
    riskIntelligence: "AgroBioGuard அபாய நுண்ணறிவு",
    description:
      "சமீபத்திய பதிவுகளை மதிப்பாய்வு செய்து, அதிக அபாய நிகழ்வுகளை கண்டறிந்து, பரிந்துரைக்கப்பட்ட அடுத்த நடவடிக்கையைப் புரிந்துகொள்ளுங்கள்.",
    highRiskEvents: "அதிக அபாய நிகழ்வுகள்",
    requiresAttention: "கவனம் தேவை",
    moderateEvents: "மிதமான அபாய நிகழ்வுகள்",
    continueMonitoring: "கண்காணிப்பைத் தொடரவும்",
    totalObservations: "மொத்த பதிவுகள்",
    storedLocally: "உள்ளூரில் சேமிக்கப்பட்டது",
    highPriorityEvent: "முக்கிய முன்னுரிமை நிகழ்வு",
    highRiskObservationStored:
      "அதிக அபாய பதிவு தற்போது AgroBioGuard-ல் சேமிக்கப்பட்டுள்ளது.",
    category: "வகை",
    source: "மூலம்",
    localObservation: "உள்ளூர் பதிவு",
    detected: "கண்டறியப்பட்டது",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    openCctvMonitoring: "CCTV கண்காணிப்பைத் திறக்கவும்",
    viewFarmDashboard: "பண்ணை டாஷ்போர்டைப் பார்க்கவும்",
    noHighRiskEvent: "தற்போது அதிக அபாய நிகழ்வு இல்லை",
    newObservationsAppear:
      "புதிய உள்ளூர் பதிவுகள் உருவாக்கப்பட்டதும் இங்கே தோன்றும்.",
    observationHistory: "பதிவு வரலாறு",
    recentRiskEvents: "சமீபத்திய அபாய நிகழ்வுகள்",
    stored: "சேமிக்கப்பட்டது",
    noLocalObservations:
      "உள்ளூர் பதிவுகள் எதுவும் இல்லை.",
    latestObservation: "சமீபத்திய பதிவு",
    high: "அதிகம்",
    moderate: "மிதமான",
    low: "குறைவு",
    unknown: "தெரியவில்லை",
    flora: "தாவரங்கள்",
    fauna: "விலங்குகள்",
    pest: "பூச்சி",
    insect: "பூச்சி",
    weed: "களை",
    safeWildlifeRecommendation:
      "பாதுகாப்பான தூரத்தைப் பராமரித்து, பொருத்தமான வனவிலங்கு பாதுகாப்பு நடைமுறைகளைப் பின்பற்றவும்.",
    pestRecommendation:
      "அருகிலுள்ள பயிர்களை ஆய்வு செய்து, பூச்சிக்கட்டுப்பாட்டு நடவடிக்கைகளை மேற்கொள்ளும் முன் அடையாளத்தை உறுதிப்படுத்தவும்.",
    weedRecommendation:
      "பாதிக்கப்பட்ட பகுதியை ஆய்வு செய்து, கட்டுப்பாட்டு நடவடிக்கைகளை மேற்கொள்ளும் முன் அடையாளத்தை உறுதிப்படுத்தவும்.",
    generalRecommendation:
      "பதிவை மதிப்பாய்வு செய்து சுற்றுப்புறத்தை தொடர்ந்து கண்காணிக்கவும்.",
  },

  Telugu: {
    riskAssessment: "ప్రమాద అంచనా",
    riskIntelligence: "AgroBioGuard ప్రమాద నిఘా",
    description:
      "ఇటీవలి పరిశీలనలను సమీక్షించి, అధిక ప్రమాద సంఘటనలను గుర్తించి, సిఫార్సు చేసిన తదుపరి చర్యను అర్థం చేసుకోండి.",
    highRiskEvents: "అధిక ప్రమాద సంఘటనలు",
    requiresAttention: "శ్రద్ధ అవసరం",
    moderateEvents: "మధ్యస్థ ప్రమాద సంఘటనలు",
    continueMonitoring: "పర్యవేక్షణ కొనసాగించండి",
    totalObservations: "మొత్తం పరిశీలనలు",
    storedLocally: "స్థానికంగా నిల్వ చేయబడింది",
    highPriorityEvent: "అధిక ప్రాధాన్యత సంఘటన",
    highRiskObservationStored:
      "అధిక ప్రమాద పరిశీలన ప్రస్తుతం AgroBioGuardలో నిల్వ చేయబడింది.",
    category: "వర్గం",
    source: "మూలం",
    localObservation: "స్థానిక పరిశీలన",
    detected: "గుర్తించబడింది",
    recommendedAction: "సిఫార్సు చేసిన చర్య",
    openCctvMonitoring: "CCTV పర్యవేక్షణను తెరవండి",
    viewFarmDashboard: "వ్యవసాయ డాష్‌బోర్డ్ చూడండి",
    noHighRiskEvent: "ప్రస్తుతం అధిక ప్రమాద సంఘటన లేదు",
    newObservationsAppear:
      "కొత్త స్థానిక పరిశీలనలు సృష్టించబడినప్పుడు ఇక్కడ కనిపిస్తాయి.",
    observationHistory: "పరిశీలన చరిత్ర",
    recentRiskEvents: "ఇటీవలి ప్రమాద సంఘటనలు",
    stored: "నిల్వ చేయబడింది",
    noLocalObservations:
      "స్థానిక పరిశీలనలు అందుబాటులో లేవు.",
    latestObservation: "తాజా పరిశీలన",
    high: "అధిక",
    moderate: "మధ్యస్థ",
    low: "తక్కువ",
    unknown: "తెలియదు",
    flora: "వృక్షజాలం",
    fauna: "జంతుజాలం",
    pest: "కీటకం",
    insect: "కీటకం",
    weed: "కలుపు",
    safeWildlifeRecommendation:
      "సురక్షిత దూరాన్ని పాటించి, తగిన వన్యప్రాణి భద్రతా విధానాలను అనుసరించండి.",
    pestRecommendation:
      "సమీపంలోని పంటలను పరిశీలించి, పురుగు నియంత్రణ చర్యలకు ముందు గుర్తింపును నిర్ధారించండి.",
    weedRecommendation:
      "ప్రభావిత ప్రాంతాన్ని పరిశీలించి, నియంత్రణ చర్యలకు ముందు గుర్తింపును నిర్ధారించండి.",
    generalRecommendation:
      "పరిశీలనను సమీక్షించి, పరిసర ప్రాంతాన్ని పర్యవేక్షించండి.",
  },

  Hindi: {
    riskAssessment: "जोखिम आकलन",
    riskIntelligence: "AgroBioGuard जोखिम इंटेलिजेंस",
    description:
      "हाल की टिप्पणियों की समीक्षा करें, उच्च जोखिम वाली घटनाओं की पहचान करें और अनुशंसित अगले कदम को समझें।",
    highRiskEvents: "उच्च जोखिम घटनाएँ",
    requiresAttention: "ध्यान आवश्यक",
    moderateEvents: "मध्यम जोखिम घटनाएँ",
    continueMonitoring: "निगरानी जारी रखें",
    totalObservations: "कुल अवलोकन",
    storedLocally: "स्थानीय रूप से संग्रहीत",
    highPriorityEvent: "उच्च प्राथमिकता घटना",
    highRiskObservationStored:
      "एक उच्च जोखिम वाला अवलोकन वर्तमान में AgroBioGuard में संग्रहीत है।",
    category: "श्रेणी",
    source: "स्रोत",
    localObservation: "स्थानीय अवलोकन",
    detected: "पता चला",
    recommendedAction: "अनुशंसित कार्रवाई",
    openCctvMonitoring: "CCTV निगरानी खोलें",
    viewFarmDashboard: "फार्म डैशबोर्ड देखें",
    noHighRiskEvent: "कोई उच्च जोखिम घटना सक्रिय नहीं है",
    newObservationsAppear:
      "नई स्थानीय टिप्पणियाँ बनने पर यहाँ दिखाई देंगी।",
    observationHistory: "अवलोकन इतिहास",
    recentRiskEvents: "हाल की जोखिम घटनाएँ",
    stored: "संग्रहीत",
    noLocalObservations:
      "कोई स्थानीय अवलोकन उपलब्ध नहीं है।",
    latestObservation: "नवीनतम अवलोकन",
    high: "उच्च",
    moderate: "मध्यम",
    low: "कम",
    unknown: "अज्ञात",
    flora: "वनस्पति",
    fauna: "जीव-जंतु",
    pest: "कीट",
    insect: "कीट",
    weed: "खरपतवार",
    safeWildlifeRecommendation:
      "सुरक्षित दूरी बनाए रखें और उचित वन्यजीव सुरक्षा प्रक्रियाओं का पालन करें।",
    pestRecommendation:
      "पास की फसलों का निरीक्षण करें और कीट नियंत्रण उपाय करने से पहले पहचान की पुष्टि करें।",
    weedRecommendation:
      "प्रभावित क्षेत्र का निरीक्षण करें और नियंत्रण उपाय करने से पहले पहचान की पुष्टि करें।",
    generalRecommendation:
      "अवलोकन की समीक्षा करें और आसपास के क्षेत्र की निगरानी करें।",
  },

  Kannada: {
    riskAssessment: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
    riskIntelligence: "AgroBioGuard ಅಪಾಯ ಬುದ್ಧಿವಂತಿಕೆ",
    description:
      "ಇತ್ತೀಚಿನ ವೀಕ್ಷಣೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಹೆಚ್ಚಿನ ಅಪಾಯದ ಘಟನೆಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಿದ ಮುಂದಿನ ಹಂತವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    highRiskEvents: "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಘಟನೆಗಳು",
    requiresAttention: "ಗಮನ ಅಗತ್ಯ",
    moderateEvents: "ಮಧ್ಯಮ ಅಪಾಯದ ಘಟನೆಗಳು",
    continueMonitoring: "ಮೇಲ್ವಿಚಾರಣೆ ಮುಂದುವರಿಸಿ",
    totalObservations: "ಒಟ್ಟು ವೀಕ್ಷಣೆಗಳು",
    storedLocally: "ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
    highPriorityEvent: "ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಘಟನೆ",
    highRiskObservationStored:
      "ಹೆಚ್ಚಿನ ಅಪಾಯದ ವೀಕ್ಷಣೆಯನ್ನು ಪ್ರಸ್ತುತ AgroBioGuard ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.",
    category: "ವರ್ಗ",
    source: "ಮೂಲ",
    localObservation: "ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆ",
    detected: "ಪತ್ತೆಯಾಗಿದೆ",
    recommendedAction: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    openCctvMonitoring: "CCTV ಮೇಲ್ವಿಚಾರಣೆ ತೆರೆಯಿರಿ",
    viewFarmDashboard: "ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ",
    noHighRiskEvent: "ಪ್ರಸ್ತುತ ಹೆಚ್ಚಿನ ಅಪಾಯದ ಘಟನೆ ಇಲ್ಲ",
    newObservationsAppear:
      "ಹೊಸ ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆಗಳು ರಚನೆಯಾದಾಗ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    observationHistory: "ವೀಕ್ಷಣೆ ಇತಿಹಾಸ",
    recentRiskEvents: "ಇತ್ತೀಚಿನ ಅಪಾಯ ಘಟನೆಗಳು",
    stored: "ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
    noLocalObservations:
      "ಯಾವುದೇ ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    latestObservation: "ಇತ್ತೀಚಿನ ವೀಕ್ಷಣೆ",
    high: "ಹೆಚ್ಚು",
    moderate: "ಮಧ್ಯಮ",
    low: "ಕಡಿಮೆ",
    unknown: "ಅಜ್ಞಾತ",
    flora: "ಸಸ್ಯಜಾಲ",
    fauna: "ಪ್ರಾಣಿಜಾಲ",
    pest: "ಕೀಟ",
    insect: "ಕೀಟ",
    weed: "ಕಳೆ",
    safeWildlifeRecommendation:
      "ಸುರಕ್ಷಿತ ಅಂತರದಲ್ಲಿರಿ ಮತ್ತು ಸೂಕ್ತ ವನ್ಯಜೀವಿ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ.",
    pestRecommendation:
      "ಸಮೀಪದ ಬೆಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೀಟ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ದೃಢಪಡಿಸಿ.",
    weedRecommendation:
      "ಪರಿಣಾಮಿತ ಪ್ರದೇಶವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳ ಮೊದಲು ಗುರುತಿಸುವಿಕೆಯನ್ನು ದೃಢಪಡಿಸಿ.",
    generalRecommendation:
      "ವೀಕ್ಷಣೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರದೇಶವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.",
  },

  Malayalam: {
    riskAssessment: "അപകട വിലയിരുത്തൽ",
    riskIntelligence: "AgroBioGuard അപകട ബുദ്ധിവിവരം",
    description:
      "സമീപകാല നിരീക്ഷണങ്ങൾ പരിശോധിക്കുകയും ഉയർന്ന അപകടസാധ്യതയുള്ള സംഭവങ്ങൾ തിരിച്ചറിയുകയും ശുപാർശ ചെയ്യുന്ന അടുത്ത ഘട്ടം മനസ്സിലാക്കുകയും ചെയ്യുക.",
    highRiskEvents: "ഉയർന്ന അപകട സംഭവങ്ങൾ",
    requiresAttention: "ശ്രദ്ധ ആവശ്യമാണ്",
    moderateEvents: "മിതമായ അപകട സംഭവങ്ങൾ",
    continueMonitoring: "നിരീക്ഷണം തുടരുക",
    totalObservations: "മൊത്തം നിരീക്ഷണങ്ങൾ",
    storedLocally: "പ്രാദേശികമായി സംഭരിച്ചു",
    highPriorityEvent: "ഉയർന്ന മുൻഗണനാ സംഭവം",
    highRiskObservationStored:
      "ഉയർന്ന അപകടസാധ്യതയുള്ള ഒരു നിരീക്ഷണം നിലവിൽ AgroBioGuard-ൽ സംഭരിച്ചിരിക്കുന്നു.",
    category: "വിഭാഗം",
    source: "ഉറവിടം",
    localObservation: "പ്രാദേശിക നിരീക്ഷണം",
    detected: "കണ്ടെത്തി",
    recommendedAction: "ശുപാർശ ചെയ്യുന്ന നടപടി",
    openCctvMonitoring: "CCTV നിരീക്ഷണം തുറക്കുക",
    viewFarmDashboard: "ഫാം ഡാഷ്‌ബോർഡ് കാണുക",
    noHighRiskEvent: "നിലവിൽ ഉയർന്ന അപകട സംഭവമില്ല",
    newObservationsAppear:
      "പുതിയ പ്രാദേശിക നിരീക്ഷണങ്ങൾ സൃഷ്ടിക്കുമ്പോൾ ഇവിടെ പ്രത്യക്ഷപ്പെടും.",
    observationHistory: "നിരീക്ഷണ ചരിത്രം",
    recentRiskEvents: "സമീപകാല അപകട സംഭവങ്ങൾ",
    stored: "സംഭരിച്ചത്",
    noLocalObservations:
      "പ്രാദേശിക നിരീക്ഷണങ്ങളൊന്നും ലഭ്യമല്ല.",
    latestObservation: "ഏറ്റവും പുതിയ നിരീക്ഷണം",
    high: "ഉയർന്ന",
    moderate: "മിതമായ",
    low: "കുറഞ്ഞ",
    unknown: "അജ്ഞാതം",
    flora: "സസ്യജാലം",
    fauna: "ജീവജാലം",
    pest: "കീടം",
    insect: "കീടം",
    weed: "കള",
    safeWildlifeRecommendation:
      "സുരക്ഷിതമായ അകലം പാലിക്കുകയും അനുയോജ്യമായ വന്യജീവി സുരക്ഷാ നടപടികൾ പിന്തുടരുകയും ചെയ്യുക.",
    pestRecommendation:
      "സമീപത്തെ വിളകൾ പരിശോധിക്കുകയും കീടനിയന്ത്രണ നടപടികൾക്ക് മുമ്പ് തിരിച്ചറിയൽ സ്ഥിരീകരിക്കുകയും ചെയ്യുക.",
    weedRecommendation:
      "ബാധിത പ്രദേശം പരിശോധിക്കുകയും നിയന്ത്രണ നടപടികൾക്ക് മുമ്പ് തിരിച്ചറിയൽ സ്ഥിരീകരിക്കുകയും ചെയ്യുക.",
    generalRecommendation:
      "നിരീക്ഷണം പരിശോധിച്ച് ചുറ്റുപാടിലുള്ള പ്രദേശം നിരീക്ഷിക്കുക.",
  },
};

function getRiskClass(risk: string) {
  switch (risk.toLowerCase()) {
    case "high":
      return "risk-level-high";
    case "moderate":
      return "risk-level-moderate";
    case "low":
      return "risk-level-low";
    default:
      return "risk-level-unknown";
  }
}

function getCategoryLabel(
  category: string,
  t: RiskUiText,
) {
  switch (category) {
    case "Flora":
      return t.flora;
    case "Fauna":
      return t.fauna;
    case "Pest":
      return t.pest;
    case "Insect":
      return t.insect;
    case "Weed":
      return t.weed;
    default:
      return category;
  }
}

function getRiskLabel(
  risk: string,
  t: RiskUiText,
) {
  switch (risk.toLowerCase()) {
    case "high":
      return t.high;
    case "moderate":
      return t.moderate;
    case "low":
      return t.low;
    default:
      return t.unknown;
  }
}

function getRecommendation(
  observation: SavedObservation,
  t: RiskUiText,
) {
  if (observation.category === "Fauna") {
    return t.safeWildlifeRecommendation;
  }

  if (
    observation.category === "Pest" ||
    observation.category === "Insect"
  ) {
    return t.pestRecommendation;
  }

  if (observation.category === "Weed") {
    return t.weedRecommendation;
  }

  return t.generalRecommendation;
}

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

export function RiskDashboard() {
  const { language } = useLanguage();
  const baseTranslations = getTranslations(language);
  const t = riskUiTranslations[language];

  const [observations, setObservations] =
    useState<SavedObservation[]>([]);

  function loadObservations() {
    const saved = localStorage.getItem(
      "agrobioguard-observations",
    );

    if (!saved) {
      setObservations([]);
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setObservations(parsed);
      } else {
        setObservations([]);
      }
    } catch {
      setObservations([]);
    }
  }

  useEffect(() => {
    loadObservations();

    window.addEventListener(
      "agrobioguard-observation-saved",
      loadObservations,
    );

    window.addEventListener(
      "agrobioguard-observations-synced",
      loadObservations,
    );

    window.addEventListener(
      "storage",
      loadObservations,
    );

    return () => {
      window.removeEventListener(
        "agrobioguard-observation-saved",
        loadObservations,
      );

      window.removeEventListener(
        "agrobioguard-observations-synced",
        loadObservations,
      );

      window.removeEventListener(
        "storage",
        loadObservations,
      );
    };
  }, []);

  const highRiskCount = observations.filter(
    (observation) =>
      observation.risk.toLowerCase() === "high",
  ).length;

  const moderateRiskCount =
    observations.filter(
      (observation) =>
        observation.risk.toLowerCase() ===
        "moderate",
    ).length;

  const latestObservation =
    observations[0];

  const latestHighRisk =
    observations.find(
      (observation) =>
        observation.risk.toLowerCase() ===
        "high",
    );

  return (
    <section className="risk-dashboard-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> {t.riskAssessment}
          </p>

          <h1>
            {t.riskIntelligence}
          </h1>

          <p>
            {t.description}
          </p>
        </div>

        <div className="risk-summary-grid">
          <div className="risk-summary-card">
            <small>{t.highRiskEvents}</small>

            <strong>
              {String(highRiskCount).padStart(
                2,
                "0",
              )}
            </strong>

            <span>
              {t.requiresAttention}
            </span>
          </div>

          <div className="risk-summary-card">
            <small>{t.moderateEvents}</small>

            <strong>
              {String(
                moderateRiskCount,
              ).padStart(2, "0")}
            </strong>

            <span>
              {t.continueMonitoring}
            </span>
          </div>

          <div className="risk-summary-card">
            <small>{t.totalObservations}</small>

            <strong>
              {String(
                observations.length,
              ).padStart(2, "0")}
            </strong>

            <span>
              {t.storedLocally}
            </span>
          </div>
        </div>

        {latestHighRisk ? (
          <div className="risk-priority-card">
            <div className="risk-priority-header">
              <div>
                <small>
                  {t.highPriorityEvent}
                </small>

                <strong>
                  🚨 {latestHighRisk.species}
                </strong>
              </div>

              <span>
                {t.high}
              </span>
            </div>

            <p>
              {t.highRiskObservationStored}
            </p>

            <div className="risk-priority-details">
              <span>
                {t.category}
                <strong>
                  {getCategoryLabel(
                    latestHighRisk.category,
                    t,
                  )}
                </strong>
              </span>

              <span>
                {t.source}
                <strong>
                  {t.localObservation}
                </strong>
              </span>

              <span>
                {t.detected}
                <strong>
                  {new Date(
                    latestHighRisk.savedAt,
                  ).toLocaleString(
                    localeMap[language],
                  )}
                </strong>
              </span>
            </div>

            <div className="risk-recommendation-box">
              <b>
                {t.recommendedAction}
              </b>

              <span>
                {getRecommendation(
                  latestHighRisk,
                  t,
                )}
              </span>
            </div>

            {latestHighRisk.category ===
            "Fauna" ? (
              <div className="risk-action-row">
                <Link
                  className="button primary"
                  href="/cctv"
                >
                  {t.openCctvMonitoring} →
                </Link>

                <Link
                  className="button outline"
                  href="/farm"
                >
                  {t.viewFarmDashboard} →
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="risk-empty-card">
            <span>◌</span>

            <strong>
              {t.noHighRiskEvent}
            </strong>

            <small>
              {t.newObservationsAppear}
            </small>
          </div>
        )}

        <div className="risk-observation-card">
          <div className="risk-section-header">
            <div>
              <small>
                {t.observationHistory}
              </small>

              <strong>
                {t.recentRiskEvents}
              </strong>
            </div>

            <span>
              {observations.length} {t.stored}
            </span>
          </div>

          {observations.length === 0 ? (
            <div className="risk-empty-history">
              {t.noLocalObservations}
            </div>
          ) : (
            <div className="risk-observation-list">
              {observations
                .slice(0, 10)
                .map((observation) => (
                  <div
                    className="risk-observation-row"
                    key={observation.id}
                  >
                    <div>
                      <strong>
                        {observation.species}
                      </strong>

                      <small>
                        {getCategoryLabel(
                          observation.category,
                          t,
                        )}{" "}
                        ·{" "}
                        {new Date(
                          observation.savedAt,
                        ).toLocaleString(
                          localeMap[language],
                        )}
                      </small>
                    </div>

                    <span
                      className={getRiskClass(
                        observation.risk,
                      )}
                    >
                      {getRiskLabel(
                        observation.risk,
                        t,
                      )}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {latestObservation ? (
          <div className="risk-note">
            {t.latestObservation}:{" "}
            <strong>
              {latestObservation.species}
            </strong>
            {" · "}
            {getRiskLabel(
              latestObservation.risk,
              t,
            )}
          </div>
        ) : null}

        <div className="risk-navigation">
          <Link
            className="button outline"
            href="/community"
          >
            ← {baseTranslations.backToCommunity}
          </Link>

          <Link
            className="button outline"
            href="/farm"
          >
            {baseTranslations.smartAgriculture} →
          </Link>
        </div>
      </div>
    </section>
  );
}