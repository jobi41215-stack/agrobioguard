"use client";

import { useEffect, useState } from "react";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";
import { assessRisk } from "@/lib/analysis/risk-assessment-service";
import {
  createAgroAlert,
  type AgroAlert,
} from "@/lib/analysis/alert-service";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { AnalysisResult } from "@/lib/analysis/types";
import type { LocationContext } from "@/lib/analysis/risk-types";

type CameraState = "monitoring" | "detected";

type CctvUiText = {
  eyebrow: string;
  title: string;
  description: string;
  farmCamera: string;
  wildlifePerimeter: string;
  demo: string;
  camera01: string;
  monitoring: string;
  awaitingWildlife: string;
  wildlifeDetected: string;
  asianElephant: string;
  highRisk: string;
  high: string;
  locationActive: string;
  locationOptional: string;
  cameraStatus: string;
  onlineDemo: string;
  motion: string;
  detected: string;
  clear: string;
  aiPipeline: string;
  simulated: string;
  cctvDemonstration: string;
  detectionControl: string;
  detectionDescription: string;
  simulateDetection: string;
  resetDemo: string;
  alertLocation: string;
  alertLocationDescription: string;
  gettingLocation: string;
  updateLocation: string;
  useMyLocation: string;
  highPriorityAlert: string;
  browserAlertTriggered: string;
  risk: string;
  source: string;
  cctvDemo: string;
  saved: string;
  localObservation: string;
  audibleAlert: string;
  browserNotification: string;
  viewFarmAlert: string;
  alertSystemReady: string;
  alertSystemReadyDescription: string;
  demonstrationNote: string;
  simulatedFeedDescription: string;
  locationAvailable: string;
  locationUnavailable: string;
};

const cctvUiTranslations: Record<
  SupportedLanguage,
  CctvUiText
> = {
  English: {
    eyebrow: "CAMERA & CCTV MONITORING",
    title: "Wildlife Camera Alert Demo",
    description:
      "Simulate a wildlife event and watch AgroBioGuard connect camera detection, risk assessment, local storage, and browser alerting.",
    farmCamera: "FARM CAMERA 01",
    wildlifePerimeter: "WILDLIFE PERIMETER",
    demo: "DEMO",
    camera01: "CAMERA 01",
    monitoring: "MONITORING",
    awaitingWildlife: "Awaiting wildlife event",
    wildlifeDetected: "WILDLIFE DETECTED",
    asianElephant: "Asian elephant",
    highRisk: "HIGH RISK",
    high: "HIGH",
    locationActive: "📍 LOCATION ACTIVE",
    locationOptional: "📍 LOCATION OPTIONAL",
    cameraStatus: "CAMERA STATUS",
    onlineDemo: "ONLINE DEMO",
    motion: "MOTION",
    detected: "DETECTED",
    clear: "CLEAR",
    aiPipeline: "AI PIPELINE",
    simulated: "SIMULATED",
    cctvDemonstration: "CCTV DEMONSTRATION",
    detectionControl: "Wildlife Detection Control",
    detectionDescription:
      "This demonstration simulates a camera detecting an elephant near an agricultural area.",
    simulateDetection: "Simulate Wildlife Detection",
    resetDemo: "Reset Camera Demo",
    alertLocation: "Alert location context",
    alertLocationDescription:
      "Add your device location to include coordinates in the simulated alert.",
    gettingLocation: "Getting location...",
    updateLocation: "Update location",
    useMyLocation: "Use my location",
    highPriorityAlert: "HIGH PRIORITY ALERT",
    browserAlertTriggered: "BROWSER ALERT TRIGGERED",
    risk: "Risk",
    source: "Source",
    cctvDemo: "CCTV Demo",
    saved: "Saved",
    localObservation: "Local observation",
    audibleAlert: "3-beep audible alert played",
    browserNotification: "Browser notification requested",
    viewFarmAlert: "View Farm Alert",
    alertSystemReady: "Alert system ready",
    alertSystemReadyDescription:
      "Press the detection button to trigger the complete demo.",
    demonstrationNote: "Demonstration note",
    simulatedFeedDescription:
      "The camera feed and wildlife detection are simulated for prototype demonstration. No physical CCTV camera is connected.",
    locationAvailable:
      "Device location available for CCTV alert context.",
    locationUnavailable:
      "Location unavailable. The CCTV demo can still run.",
  },

  Tamil: {
    eyebrow: "கேமரா மற்றும் CCTV கண்காணிப்பு",
    title: "வனவிலங்கு கேமரா எச்சரிக்கை டெமோ",
    description:
      "வனவிலங்கு நிகழ்வை உருவகப்படுத்தி, கேமரா கண்டறிதல், அபாய மதிப்பீடு, உள்ளூர் சேமிப்பு மற்றும் உலாவி எச்சரிக்கையை AgroBioGuard எவ்வாறு இணைக்கிறது என்பதைப் பாருங்கள்.",
    farmCamera: "பண்ணை கேமரா 01",
    wildlifePerimeter: "வனவிலங்கு எல்லை",
    demo: "டெமோ",
    camera01: "கேமரா 01",
    monitoring: "கண்காணிப்பு",
    awaitingWildlife: "வனவிலங்கு நிகழ்வுக்காக காத்திருக்கிறது",
    wildlifeDetected: "வனவிலங்கு கண்டறியப்பட்டது",
    asianElephant: "ஆசிய யானை",
    highRisk: "அதிக அபாயம்",
    high: "அதிகம்",
    locationActive: "📍 இருப்பிடம் செயலில் உள்ளது",
    locationOptional: "📍 இருப்பிடம் விருப்பம்",
    cameraStatus: "கேமரா நிலை",
    onlineDemo: "ஆன்லைன் டெமோ",
    motion: "இயக்கம்",
    detected: "கண்டறியப்பட்டது",
    clear: "தெளிவு",
    aiPipeline: "AI செயல்முறை",
    simulated: "உருவகப்படுத்தப்பட்டது",
    cctvDemonstration: "CCTV விளக்கக் காட்சி",
    detectionControl: "வனவிலங்கு கண்டறிதல் கட்டுப்பாடு",
    detectionDescription:
      "இந்த விளக்கக் காட்சி வேளாண் பகுதி அருகே யானையை கேமரா கண்டறிவதை உருவகப்படுத்துகிறது.",
    simulateDetection: "வனவிலங்கு கண்டறிதலை உருவகப்படுத்தவும்",
    resetDemo: "கேமரா டெமோவை மீட்டமைக்கவும்",
    alertLocation: "எச்சரிக்கை இருப்பிடச் சூழல்",
    alertLocationDescription:
      "உருவகப்படுத்தப்பட்ட எச்சரிக்கையில் ஆயத்தொலைவுகளைச் சேர்க்க உங்கள் சாதன இருப்பிடத்தைச் சேர்க்கவும்.",
    gettingLocation: "இருப்பிடம் பெறப்படுகிறது...",
    updateLocation: "இருப்பிடத்தைப் புதுப்பிக்கவும்",
    useMyLocation: "என் இருப்பிடத்தைப் பயன்படுத்தவும்",
    highPriorityAlert: "முக்கிய முன்னுரிமை எச்சரிக்கை",
    browserAlertTriggered: "உலாவி எச்சரிக்கை செயல்படுத்தப்பட்டது",
    risk: "அபாயம்",
    source: "மூலம்",
    cctvDemo: "CCTV டெமோ",
    saved: "சேமிக்கப்பட்டது",
    localObservation: "உள்ளூர் பதிவு",
    audibleAlert: "3-ஒலி எச்சரிக்கை இயக்கப்பட்டது",
    browserNotification: "உலாவி அறிவிப்பு கோரப்பட்டது",
    viewFarmAlert: "பண்ணை எச்சரிக்கையைப் பார்க்கவும்",
    alertSystemReady: "எச்சரிக்கை அமைப்பு தயாராக உள்ளது",
    alertSystemReadyDescription:
      "முழு டெமோவைத் தொடங்க கண்டறிதல் பொத்தானை அழுத்தவும்.",
    demonstrationNote: "விளக்கக் குறிப்பு",
    simulatedFeedDescription:
      "கேமரா காட்சி மற்றும் வனவிலங்கு கண்டறிதல் முன்மாதிரி விளக்கத்திற்காக உருவகப்படுத்தப்பட்டவை. எந்த உடல் CCTV கேமராவும் இணைக்கப்படவில்லை.",
    locationAvailable:
      "CCTV எச்சரிக்கைச் சூழலுக்கான சாதன இருப்பிடம் கிடைக்கிறது.",
    locationUnavailable:
      "இருப்பிடம் கிடைக்கவில்லை. CCTV டெமோவைத் தொடரலாம்.",
  },

  Telugu: {
    eyebrow: "కెమెరా & CCTV పర్యవేక్షణ",
    title: "వన్యప్రాణి కెమెరా హెచ్చరిక డెమో",
    description:
      "వన్యప్రాణి సంఘటనను అనుకరించి, కెమెరా గుర్తింపు, ప్రమాద అంచనా, స్థానిక నిల్వ మరియు బ్రౌజర్ హెచ్చరికలను AgroBioGuard ఎలా అనుసంధానిస్తుందో చూడండి.",
    farmCamera: "వ్యవసాయ కెమెరా 01",
    wildlifePerimeter: "వన్యప్రాణి పరిధి",
    demo: "డెమో",
    camera01: "కెమెరా 01",
    monitoring: "పర్యవేక్షణ",
    awaitingWildlife: "వన్యప్రాణి సంఘటన కోసం వేచి ఉంది",
    wildlifeDetected: "వన్యప్రాణి గుర్తించబడింది",
    asianElephant: "ఆసియా ఏనుగు",
    highRisk: "అధిక ప్రమాదం",
    high: "అధిక",
    locationActive: "📍 స్థానం యాక్టివ్",
    locationOptional: "📍 స్థానం ఐచ్ఛికం",
    cameraStatus: "కెమెరా స్థితి",
    onlineDemo: "ఆన్‌లైన్ డెమో",
    motion: "చలనం",
    detected: "గుర్తించబడింది",
    clear: "స్పష్టంగా ఉంది",
    aiPipeline: "AI పైప్‌లైన్",
    simulated: "అనుకరించబడింది",
    cctvDemonstration: "CCTV ప్రదర్శన",
    detectionControl: "వన్యప్రాణి గుర్తింపు నియంత్రణ",
    detectionDescription:
      "ఈ ప్రదర్శన వ్యవసాయ ప్రాంతం సమీపంలో కెమెరా ఏనుగును గుర్తించడాన్ని అనుకరిస్తుంది.",
    simulateDetection: "వన్యప్రాణి గుర్తింపును అనుకరించండి",
    resetDemo: "కెమెరా డెమోను రీసెట్ చేయండి",
    alertLocation: "హెచ్చరిక స్థాన సందర్భం",
    alertLocationDescription:
      "అనుకరణ హెచ్చరికలో కోఆర్డినేట్లను చేర్చడానికి మీ పరికరం స్థానాన్ని జోడించండి.",
    gettingLocation: "స్థానం పొందుతోంది...",
    updateLocation: "స్థానాన్ని నవీకరించండి",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించండి",
    highPriorityAlert: "అధిక ప్రాధాన్యత హెచ్చరిక",
    browserAlertTriggered: "బ్రౌజర్ హెచ్చరిక ప్రారంభించబడింది",
    risk: "ప్రమాదం",
    source: "మూలం",
    cctvDemo: "CCTV డెమో",
    saved: "నిల్వ చేయబడింది",
    localObservation: "స్థానిక పరిశీలన",
    audibleAlert: "3-బీప్ శబ్ద హెచ్చరిక ప్లే చేయబడింది",
    browserNotification: "బ్రౌజర్ నోటిఫికేషన్ అభ్యర్థించబడింది",
    viewFarmAlert: "వ్యవసాయ హెచ్చరికను చూడండి",
    alertSystemReady: "హెచ్చరిక వ్యవస్థ సిద్ధంగా ఉంది",
    alertSystemReadyDescription:
      "పూర్తి డెమోను ప్రారంభించడానికి గుర్తింపు బటన్‌ను నొక్కండి.",
    demonstrationNote: "ప్రదర్శన గమనిక",
    simulatedFeedDescription:
      "కెమెరా ఫీడ్ మరియు వన్యప్రాణి గుర్తింపు ప్రోటోటైప్ ప్రదర్శన కోసం అనుకరించబడ్డాయి. భౌతిక CCTV కెమెరా ఏదీ అనుసంధానించబడలేదు.",
    locationAvailable:
      "CCTV హెచ్చరిక సందర్భానికి పరికరం స్థానం అందుబాటులో ఉంది.",
    locationUnavailable:
      "స్థానం అందుబాటులో లేదు. CCTV డెమో కొనసాగించవచ్చు.",
  },

  Hindi: {
    eyebrow: "कैमरा और CCTV निगरानी",
    title: "वन्यजीव कैमरा चेतावनी डेमो",
    description:
      "वन्यजीव घटना का अनुकरण करें और देखें कि AgroBioGuard कैमरा पहचान, जोखिम आकलन, स्थानीय भंडारण और ब्राउज़र चेतावनी को कैसे जोड़ता है।",
    farmCamera: "फार्म कैमरा 01",
    wildlifePerimeter: "वन्यजीव सीमा",
    demo: "डेमो",
    camera01: "कैमरा 01",
    monitoring: "निगरानी",
    awaitingWildlife: "वन्यजीव घटना की प्रतीक्षा",
    wildlifeDetected: "वन्यजीव का पता चला",
    asianElephant: "एशियाई हाथी",
    highRisk: "उच्च जोखिम",
    high: "उच्च",
    locationActive: "📍 स्थान सक्रिय",
    locationOptional: "📍 स्थान वैकल्पिक",
    cameraStatus: "कैमरा स्थिति",
    onlineDemo: "ऑनलाइन डेमो",
    motion: "गतिविधि",
    detected: "पता चला",
    clear: "साफ",
    aiPipeline: "AI पाइपलाइन",
    simulated: "सिम्युलेटेड",
    cctvDemonstration: "CCTV प्रदर्शन",
    detectionControl: "वन्यजीव पहचान नियंत्रण",
    detectionDescription:
      "यह प्रदर्शन कृषि क्षेत्र के पास कैमरे द्वारा हाथी की पहचान का अनुकरण करता है।",
    simulateDetection: "वन्यजीव पहचान सिम्युलेट करें",
    resetDemo: "कैमरा डेमो रीसेट करें",
    alertLocation: "चेतावनी स्थान संदर्भ",
    alertLocationDescription:
      "सिम्युलेटेड चेतावनी में निर्देशांक शामिल करने के लिए अपने डिवाइस का स्थान जोड़ें।",
    gettingLocation: "स्थान प्राप्त हो रहा है...",
    updateLocation: "स्थान अपडेट करें",
    useMyLocation: "मेरा स्थान उपयोग करें",
    highPriorityAlert: "उच्च प्राथमिकता चेतावनी",
    browserAlertTriggered: "ब्राउज़र चेतावनी सक्रिय",
    risk: "जोखिम",
    source: "स्रोत",
    cctvDemo: "CCTV डेमो",
    saved: "सहेजा गया",
    localObservation: "स्थानीय अवलोकन",
    audibleAlert: "3-बीप श्रव्य चेतावनी बजाई गई",
    browserNotification: "ब्राउज़र सूचना का अनुरोध किया गया",
    viewFarmAlert: "फार्म चेतावनी देखें",
    alertSystemReady: "चेतावनी प्रणाली तैयार है",
    alertSystemReadyDescription:
      "पूरा डेमो शुरू करने के लिए पहचान बटन दबाएँ।",
    demonstrationNote: "प्रदर्शन नोट",
    simulatedFeedDescription:
      "कैमरा फ़ीड और वन्यजीव पहचान प्रोटोटाइप प्रदर्शन के लिए सिम्युलेटेड हैं। कोई भौतिक CCTV कैमरा जुड़ा नहीं है।",
    locationAvailable:
      "CCTV चेतावनी संदर्भ के लिए डिवाइस स्थान उपलब्ध है।",
    locationUnavailable:
      "स्थान उपलब्ध नहीं है। CCTV डेमो फिर भी चल सकता है।",
  },

  Kannada: {
    eyebrow: "ಕ್ಯಾಮೆರಾ ಮತ್ತು CCTV ಮೇಲ್ವಿಚಾರಣೆ",
    title: "ವನ್ಯಜೀವಿ ಕ್ಯಾಮೆರಾ ಎಚ್ಚರಿಕೆ ಡೆಮೊ",
    description:
      "ವನ್ಯಜೀವಿ ಘಟನೆಯನ್ನು ಅನುಕರಿಸಿ ಮತ್ತು AgroBioGuard ಕ್ಯಾಮೆರಾ ಪತ್ತೆ, ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ, ಸ್ಥಳೀಯ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಬ್ರೌಸರ್ ಎಚ್ಚರಿಕೆಯನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ನೋಡಿ.",
    farmCamera: "ಕೃಷಿ ಕ್ಯಾಮೆರಾ 01",
    wildlifePerimeter: "ವನ್ಯಜೀವಿ ಗಡಿ",
    demo: "ಡೆಮೋ",
    camera01: "ಕ್ಯಾಮೆರಾ 01",
    monitoring: "ಮೇಲ್ವಿಚಾರಣೆ",
    awaitingWildlife: "ವನ್ಯಜೀವಿ ಘಟನೆಯಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ",
    wildlifeDetected: "ವನ್ಯಜೀವಿ ಪತ್ತೆಯಾಗಿದೆ",
    asianElephant: "ಏಷ್ಯನ್ ಆನೆ",
    highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    high: "ಹೆಚ್ಚು",
    locationActive: "📍 ಸ್ಥಳ ಸಕ್ರಿಯವಾಗಿದೆ",
    locationOptional: "📍 ಸ್ಥಳ ಐಚ್ಛಿಕ",
    cameraStatus: "ಕ್ಯಾಮೆರಾ ಸ್ಥಿತಿ",
    onlineDemo: "ಆನ್‌ಲೈನ್ ಡೆಮೋ",
    motion: "ಚಲನೆ",
    detected: "ಪತ್ತೆಯಾಗಿದೆ",
    clear: "ಸ್ಪಷ್ಟ",
    aiPipeline: "AI ಪೈಪ್‌ಲೈನ್",
    simulated: "ಅನುಕರಿಸಲಾಗಿದೆ",
    cctvDemonstration: "CCTV ಪ್ರದರ್ಶನ",
    detectionControl: "ವನ್ಯಜೀವಿ ಪತ್ತೆ ನಿಯಂತ್ರಣ",
    detectionDescription:
      "ಈ ಪ್ರದರ್ಶನವು ಕೃಷಿ ಪ್ರದೇಶದ ಸಮೀಪ ಕ್ಯಾಮೆರಾ ಆನೆಯನ್ನು ಪತ್ತೆಹಚ್ಚುವುದನ್ನು ಅನುಕರಿಸುತ್ತದೆ.",
    simulateDetection: "ವನ್ಯಜೀವಿ ಪತ್ತೆಯನ್ನು ಅನುಕರಿಸಿ",
    resetDemo: "ಕ್ಯಾಮೆರಾ ಡೆಮೋ ಮರುಹೊಂದಿಸಿ",
    alertLocation: "ಎಚ್ಚರಿಕೆ ಸ್ಥಳ ಸಂದರ್ಭ",
    alertLocationDescription:
      "ಅನುಕರಿಸಿದ ಎಚ್ಚರಿಕೆಯಲ್ಲಿ ಸಂಯೋಜನೆಗಳನ್ನು ಸೇರಿಸಲು ನಿಮ್ಮ ಸಾಧನದ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ.",
    gettingLocation: "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    updateLocation: "ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    highPriorityAlert: "ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಎಚ್ಚರಿಕೆ",
    browserAlertTriggered: "ಬ್ರೌಸರ್ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ",
    risk: "ಅಪಾಯ",
    source: "ಮೂಲ",
    cctvDemo: "CCTV ಡೆಮೋ",
    saved: "ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
    localObservation: "ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆ",
    audibleAlert: "3-ಬೀಪ್ ಶ್ರವ್ಯ ಎಚ್ಚರಿಕೆ ಪ್ಲೇ ಮಾಡಲಾಗಿದೆ",
    browserNotification: "ಬ್ರೌಸರ್ ಅಧಿಸೂಚನೆ ವಿನಂತಿಸಲಾಗಿದೆ",
    viewFarmAlert: "ಫಾರ್ಮ್ ಎಚ್ಚರಿಕೆಯನ್ನು ವೀಕ್ಷಿಸಿ",
    alertSystemReady: "ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ ಸಿದ್ಧವಾಗಿದೆ",
    alertSystemReadyDescription:
      "ಸಂಪೂರ್ಣ ಡೆಮೋವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಪತ್ತೆ ಬಟನ್ ಒತ್ತಿರಿ.",
    demonstrationNote: "ಪ್ರದರ್ಶನ ಟಿಪ್ಪಣಿ",
    simulatedFeedDescription:
      "ಕ್ಯಾಮೆರಾ ಫೀಡ್ ಮತ್ತು ವನ್ಯಜೀವಿ ಪತ್ತೆ ಪ್ರೋಟೋಟೈಪ್ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಅನುಕರಿಸಲಾಗಿದೆ. ಯಾವುದೇ ಭೌತಿಕ CCTV ಕ್ಯಾಮೆರಾ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.",
    locationAvailable:
      "CCTV ಎಚ್ಚರಿಕೆ ಸಂದರ್ಭಕ್ಕಾಗಿ ಸಾಧನದ ಸ್ಥಳ ಲಭ್ಯವಿದೆ.",
    locationUnavailable:
      "ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ. CCTV ಡೆಮೋ ಮುಂದುವರಿಯಬಹುದು.",
  },

  Malayalam: {
    eyebrow: "ക്യാമറയും CCTV നിരീക്ഷണവും",
    title: "വന്യജീവി ക്യാമറ മുന്നറിയിപ്പ് ഡെമോ",
    description:
      "വന്യജീവി സംഭവത്തെ അനുകരിച്ച് ക്യാമറ കണ്ടെത്തൽ, അപകട വിലയിരുത്തൽ, പ്രാദേശിക സംഭരണം, ബ്രൗസർ മുന്നറിയിപ്പ് എന്നിവ AgroBioGuard എങ്ങനെ ബന്ധിപ്പിക്കുന്നു എന്ന് കാണുക.",
    farmCamera: "ഫാം ക്യാമറ 01",
    wildlifePerimeter: "വന്യജീവി പരിധി",
    demo: "ഡെമോ",
    camera01: "ക്യാമറ 01",
    monitoring: "നിരീക്ഷണം",
    awaitingWildlife: "വന്യജീവി സംഭവത്തിനായി കാത്തിരിക്കുന്നു",
    wildlifeDetected: "വന്യജീവിയെ കണ്ടെത്തി",
    asianElephant: "ഏഷ്യൻ ആന",
    highRisk: "ഉയർന്ന അപകടസാധ്യത",
    high: "ഉയർന്ന",
    locationActive: "📍 ലൊക്കേഷൻ സജീവമാണ്",
    locationOptional: "📍 ലൊക്കേഷൻ ഐച്ഛികം",
    cameraStatus: "ക്യാമറ നില",
    onlineDemo: "ഓൺലൈൻ ഡെമോ",
    motion: "ചലനം",
    detected: "കണ്ടെത്തി",
    clear: "വ്യക്തം",
    aiPipeline: "AI പൈപ്പ്‌ലൈൻ",
    simulated: "അനുകരിച്ചത്",
    cctvDemonstration: "CCTV ഡെമോ",
    detectionControl: "വന്യജീവി കണ്ടെത്തൽ നിയന്ത്രണം",
    detectionDescription:
      "കൃഷിയിടത്തിന് സമീപം ക്യാമറ ഒരു ആനയെ കണ്ടെത്തുന്നതിനെ ഈ ഡെമോ അനുകരിക്കുന്നു.",
    simulateDetection: "വന്യജീവി കണ്ടെത്തൽ അനുകരിക്കുക",
    resetDemo: "ക്യാമറ ഡെമോ റീസെറ്റ് ചെയ്യുക",
    alertLocation: "മുന്നറിയിപ്പ് ലൊക്കേഷൻ സന്ദർഭം",
    alertLocationDescription:
      "അനുകരിച്ച മുന്നറിയിപ്പിൽ കോർഡിനേറ്റുകൾ ഉൾപ്പെടുത്താൻ നിങ്ങളുടെ ഉപകരണ ലൊക്കേഷൻ ചേർക്കുക.",
    gettingLocation: "ലൊക്കേഷൻ ലഭ്യമാക്കുന്നു...",
    updateLocation: "ലൊക്കേഷൻ അപ്‌ഡേറ്റ് ചെയ്യുക",
    useMyLocation: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക",
    highPriorityAlert: "ഉയർന്ന മുൻഗണനാ മുന്നറിയിപ്പ്",
    browserAlertTriggered: "ബ്രൗസർ മുന്നറിയിപ്പ് സജീവമാക്കി",
    risk: "അപകടം",
    source: "ഉറവിടം",
    cctvDemo: "CCTV ഡെമോ",
    saved: "സംഭരിച്ചു",
    localObservation: "പ്രാദേശിക നിരീക്ഷണം",
    audibleAlert: "3-ബീപ്പ് ശബ്ദ മുന്നറിയിപ്പ് പ്ലേ ചെയ്തു",
    browserNotification: "ബ്രൗസർ അറിയിപ്പ് അഭ്യർത്ഥിച്ചു",
    viewFarmAlert: "ഫാം മുന്നറിയിപ്പ് കാണുക",
    alertSystemReady: "മുന്നറിയിപ്പ് സംവിധാനം തയ്യാറാണ്",
    alertSystemReadyDescription:
      "പൂർണ്ണ ഡെമോ ആരംഭിക്കാൻ കണ്ടെത്തൽ ബട്ടൺ അമർത്തുക.",
    demonstrationNote: "ഡെമോ കുറിപ്പ്",
    simulatedFeedDescription:
      "ക്യാമറ ഫീഡും വന്യജീവി കണ്ടെത്തലും പ്രോട്ടോടൈപ്പ് ഡെമോയ്ക്കായി അനുകരിച്ചവയാണ്. ഭൗതിക CCTV ക്യാമറ ബന്ധിപ്പിച്ചിട്ടില്ല.",
    locationAvailable:
      "CCTV മുന്നറിയിപ്പ് സന്ദർഭത്തിനായി ഉപകരണ ലൊക്കേഷൻ ലഭ്യമാണ്.",
    locationUnavailable:
      "ലൊക്കേഷൻ ലഭ്യമല്ല. CCTV ഡെമോ തുടരാം.",
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

export function CctvDemo() {
  const { language } = useLanguage();
  const baseTranslations = getTranslations(language);
  const t = cctvUiTranslations[language];

  const [cameraState, setCameraState] =
    useState<CameraState>("monitoring");

  const [alert, setAlert] =
    useState<AgroAlert>();

  const [location, setLocation] =
    useState<LocationContext>();

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [locationMessage, setLocationMessage] =
    useState("");

  const [currentTime, setCurrentTime] =
    useState("");

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleTimeString(
          localeMap[language],
        ),
      );
    }

    updateTime();

    const timer = window.setInterval(
      updateTime,
      1000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [language]);

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
        t.locationAvailable,
      );
    } catch {
      setLocationMessage(
        t.locationUnavailable,
      );
    } finally {
      setLocationLoading(false);
    }
  }

  async function playAlertBeep() {
    if (
      typeof window === "undefined" ||
      !window.AudioContext
    ) {
      return;
    }

    const audioContext =
      new window.AudioContext();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const startTime =
      audioContext.currentTime + 0.05;

    const beepDuration = 0.18;
    const gap = 0.16;

    const frequencies = [
      820,
      820,
      620,
    ];

    frequencies.forEach(
      (frequency, index) => {
        const start =
          startTime +
          index *
            (beepDuration + gap);

        const oscillator =
          audioContext.createOscillator();

        const gain =
          audioContext.createGain();

        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(
          frequency,
          start,
        );

        gain.gain.setValueAtTime(
          0.0001,
          start,
        );

        gain.gain.exponentialRampToValueAtTime(
          0.22,
          start + 0.015,
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          start + beepDuration,
        );

        oscillator.connect(gain);
        gain.connect(
          audioContext.destination,
        );

        oscillator.start(start);
        oscillator.stop(
          start +
            beepDuration +
            0.02,
        );
      },
    );

    window.setTimeout(
      () => {
        void audioContext.close();
      },
      1200,
    );
  }

  async function sendBrowserAlert(
    generatedAlert: AgroAlert,
  ) {
    if (
      !("Notification" in window)
    ) {
      return;
    }

    if (
      Notification.permission === "default"
    ) {
      await Notification.requestPermission();
    }

    if (
      Notification.permission === "granted"
    ) {
      new Notification(
        `${baseTranslations.formalTitle}`,
        {
          body:
            `${generatedAlert.species}: ` +
            generatedAlert.message,
        },
      );
    }
  }

  function saveObservation(
    analysis: AnalysisResult,
    riskLevel: string,
  ) {
    const saved =
      localStorage.getItem(
        "agrobioguard-observations",
      );

    let existing: Array<{
      id: string;
      species: string;
      category: string;
      risk: string;
      source: "local";
      savedAt: string;
    }> = [];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      } catch {
        existing = [];
      }
    }

    const observation = {
      id: `cctv-${Date.now()}`,
      species: analysis.identifiedName,
      category: analysis.category,
      risk: riskLevel,
      source: "local" as const,
      savedAt:
        new Date().toISOString(),
    };

    const updated = [
      observation,
      ...existing,
    ].slice(0, 10);

    localStorage.setItem(
      "agrobioguard-observations",
      JSON.stringify(updated),
    );

    const latestAlert = {
      id: observation.id,
      species: observation.species,
      category: observation.category,
      risk: observation.risk,
      source: "local" as const,
      savedAt: observation.savedAt,
    };

    localStorage.setItem(
      "agrobioguard-latest-alert",
      JSON.stringify(latestAlert),
    );

    window.dispatchEvent(
      new Event(
        "agrobioguard-observation-saved",
      ),
    );
  }

  async function simulateDetection() {
    const analysis: AnalysisResult = {
      category: "Fauna",
      identifiedName: "Asian elephant",
      commonName: "Asian elephant",
      scientificName: "Elephas maximus",
      confidence: 97,
      description:
        "CCTV demonstration detection generated by AgroBioGuard.",
      riskLevel: "unknown",
      riskDescription:
        "Risk is assessed separately by AgroBioGuard.",
      recommendation:
        "Maintain a safe distance and follow appropriate wildlife-safety procedures.",
      locationContext:
        "CCTV demo detection can use device location context.",
      analysisSource: "demo",
      provider: {
        id: "agrobioguard-cctv-demo",
        model: "CCTV Simulation",
      },
      status: "complete",
    };

    const assessment = assessRisk(
      analysis,
      location,
      language === "English"
        ? "English"
        : language,
    );

    const generatedAlert =
      createAgroAlert(
        analysis,
        assessment,
        location,
      );

    setCameraState("detected");

    setAlert(
      generatedAlert ?? undefined,
    );

    saveObservation(
      analysis,
      assessment.level,
    );

    await playAlertBeep();

    if (generatedAlert) {
      await sendBrowserAlert(
        generatedAlert,
      );
    }
  }

  function resetDetection() {
    setCameraState("monitoring");
    setAlert(undefined);
  }

  return (
    <section className="cctv-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> {t.eyebrow}
          </p>

          <h1>{t.title}</h1>

          <p>{t.description}</p>
        </div>

        <div className="cctv-grid">
          <div className="cctv-camera-card">
            <div className="cctv-camera-header">
              <div>
                <small>
                  {t.farmCamera}
                </small>

                <strong>
                  {t.wildlifePerimeter}
                </strong>
              </div>

              <span className="cctv-live">
                ● {t.demo}
              </span>
            </div>

            <div
              className={
                cameraState === "detected"
                  ? "cctv-screen detected"
                  : "cctv-screen"
              }
            >
              <div className="cctv-grid-lines" />

              <div className="cctv-scan-line" />

              <div className="cctv-camera-label">
                {t.camera01}
              </div>

              <div className="cctv-time">
                {currentTime}
              </div>

              {cameraState ===
              "monitoring" ? (
                <div className="cctv-monitoring">
                  <span>◉</span>

                  <strong>
                    {t.monitoring}
                  </strong>

                  <small>
                    {t.awaitingWildlife}
                  </small>
                </div>
              ) : (
                <div className="cctv-detection-overlay">
                  <span className="detection-box">
                    🐘
                  </span>

                  <strong>
                    {t.wildlifeDetected}
                  </strong>

                  <small>
                    {t.asianElephant}
                  </small>

                  <b>
                    {t.highRisk}
                  </b>
                </div>
              )}

              <div className="cctv-location-chip">
                {location
                  ? t.locationActive
                  : t.locationOptional}
              </div>
            </div>

            <div className="cctv-camera-status">
              <div>
                <span>
                  {t.cameraStatus}
                </span>

                <strong>
                  {t.onlineDemo}
                </strong>
              </div>

              <div>
                <span>{t.motion}</span>

                <strong>
                  {cameraState ===
                  "detected"
                    ? t.detected
                    : t.clear}
                </strong>
              </div>

              <div>
                <span>
                  {t.aiPipeline}
                </span>

                <strong>
                  {t.simulated}
                </strong>
              </div>
            </div>
          </div>

          <div className="cctv-control-card">
            <span className="cctv-demo-badge">
              {t.cctvDemonstration}
            </span>

            <h2>{t.detectionControl}</h2>

            <p>
              {t.detectionDescription}
            </p>

            <div className="cctv-control-actions">
              {cameraState ===
              "monitoring" ? (
                <button
                  className="button primary"
                  type="button"
                  onClick={
                    simulateDetection
                  }
                >
                  🚨{" "}
                  {t.simulateDetection}
                </button>
              ) : (
                <button
                  className="button outline"
                  type="button"
                  onClick={
                    resetDetection
                  }
                >
                  {t.resetDemo}
                </button>
              )}
            </div>

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
                      {t.alertLocation}
                    </strong>

                    <p>
                      {
                        t.alertLocationDescription
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

            {alert ? (
              <div className="cctv-alert-card">
                <div className="risk-card-header">
                  <span
                    className="warning-icon"
                    aria-hidden="true"
                  >
                    🚨
                  </span>

                  <div>
                    <b>
                      {t.highPriorityAlert}
                    </b>

                    <small>
                      {
                        t.browserAlertTriggered
                      }
                    </small>
                  </div>
                </div>

                <h3>
                  {alert.species}
                </h3>

                <p>
                  {alert.message}
                </p>

                <div className="cctv-alert-details">
                  <span>
                    {t.risk}

                    <strong>
                      {t.high}
                    </strong>
                  </span>

                  <span>
                    {t.source}

                    <strong>
                      {t.cctvDemo}
                    </strong>
                  </span>

                  <span>
                    {t.saved}

                    <strong>
                      {t.localObservation}
                    </strong>
                  </span>
                </div>

                {location?.latitude !==
                  undefined &&
                location?.longitude !==
                  undefined ? (
                  <small>
                    📍{" "}
                    {location.latitude.toFixed(
                      6,
                    )}
                    ,{" "}
                    {location.longitude.toFixed(
                      6,
                    )}
                  </small>
                ) : null}

                <div className="cctv-alert-signal">
                  🔊 {t.audibleAlert}
                  <span>•</span>
                  🔔{" "}
                  {
                    t.browserNotification
                  }
                </div>

                <a
                  href="/farm"
                  className="button secondary cctv-farm-alert-button"
                >
                  {t.viewFarmAlert}{" "}
                  <span>→</span>
                </a>
              </div>
            ) : (
              <div className="cctv-ready-card">
                <span>◉</span>

                <strong>
                  {t.alertSystemReady}
                </strong>

                <small>
                  {
                    t.alertSystemReadyDescription
                  }
                </small>
              </div>
            )}
          </div>
        </div>

        <div className="cctv-disclaimer">
          <strong>
            {t.demonstrationNote}
          </strong>

          <span>
            {t.simulatedFeedDescription}
          </span>
        </div>
      </div>
    </section>
  );
}