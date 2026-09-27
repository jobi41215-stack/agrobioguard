"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTranslations,
  type SupportedLanguage,
} from "@/lib/translations";
import { useLanguage } from "@/components/language-provider";
import { getCurrentLocation } from "@/lib/analysis/location-service";
import type { LocationContext } from "@/lib/analysis/risk-types";

type SavedObservation = {
  id: string;
  species: string;
  category: string;
  risk: string;
  source: "local";
  savedAt: string;
};

type LocationUiText = {
  eyebrow: string;
  title: string;
  description: string;
  deviceLocation: string;
  locationStatus: string;
  available: string;
  notConnected: string;
  noLocationShared: string;
  useLocationDescription: string;
  gettingLocation: string;
  useMyLocation: string;
  unavailable: string;
  latitude: string;
  longitude: string;
  updating: string;
  updateLocation: string;
  openMaps: string;
  howItWorks: string;
  locationAwareRisk: string;
  captureLocation: string;
  captureLocationText: string;
  connectObservation: string;
  connectObservationText: string;
  assessRisk: string;
  assessRiskText: string;
  localObservations: string;
  recentEvents: string;
  refresh: string;
  noSavedObservations: string;
  noSavedObservationsText: string;
  risk: string;
  community: string;
  riskAssessment: string;
  smartAgriculture: string;
  backHome: string;
};

const locationUiTranslations: Record<
  SupportedLanguage,
  LocationUiText
> = {
  English: {
    eyebrow: "LOCATION INTELLIGENCE",
    title: "Understand Where the Observation Happened",
    description:
      "AgroBioGuard connects observations with device location context to support agricultural and ecological assessment.",
    deviceLocation: "DEVICE LOCATION",
    locationStatus: "Location Status",
    available: "AVAILABLE",
    notConnected: "NOT CONNECTED",
    noLocationShared: "No location has been shared yet",
    useLocationDescription:
      "Use your device location to attach coordinates to AgroBioGuard observations.",
    gettingLocation: "Getting location...",
    useMyLocation: "Use My Location",
    unavailable: "Unavailable",
    latitude: "LATITUDE",
    longitude: "LONGITUDE",
    updating: "Updating...",
    updateLocation: "Update Location",
    openMaps: "Open in Maps",
    howItWorks: "HOW IT WORKS",
    locationAwareRisk: "Location-Aware Risk Context",
    captureLocation: "Capture location",
    captureLocationText:
      "Read device coordinates after user permission.",
    connectObservation: "Connect observation",
    connectObservationText:
      "Use location alongside flora, fauna, pest, or wildlife observations.",
    assessRisk: "Assess risk",
    assessRiskText:
      "AgroBioGuard uses the available context in its risk-assessment workflow.",
    localObservations: "LOCAL OBSERVATIONS",
    recentEvents: "Recent Location-Ready Events",
    refresh: "Refresh",
    noSavedObservations: "No saved observations found",
    noSavedObservationsText:
      "CCTV, offline, or other local observation events will appear here.",
    risk: "Risk",
    community: "Community",
    riskAssessment: "Risk Assessment",
    smartAgriculture: "Smart Agriculture",
    backHome: "Back to Home",
  },

  Tamil: {
    eyebrow: "இருப்பிட நுண்ணறிவு",
    title: "பதிவு எங்கு நடந்தது என்பதைப் புரிந்துகொள்ளுங்கள்",
    description:
      "AgroBioGuard சாதன இருப்பிடத் தகவலுடன் பதிவுகளை இணைத்து வேளாண் மற்றும் சூழலியல் மதிப்பீட்டிற்கு உதவுகிறது.",
    deviceLocation: "சாதன இருப்பிடம்",
    locationStatus: "இருப்பிட நிலை",
    available: "கிடைக்கிறது",
    notConnected: "இணைக்கப்படவில்லை",
    noLocationShared: "இன்னும் எந்த இருப்பிடமும் பகிரப்படவில்லை",
    useLocationDescription:
      "AgroBioGuard பதிவுகளுடன் ஆயத்தொலைவுகளை இணைக்க உங்கள் சாதன இருப்பிடத்தைப் பயன்படுத்தவும்.",
    gettingLocation: "இருப்பிடம் பெறப்படுகிறது...",
    useMyLocation: "என் இருப்பிடத்தைப் பயன்படுத்து",
    unavailable: "கிடைக்கவில்லை",
    latitude: "அட்சரேகை",
    longitude: "தீர்க்கரேகை",
    updating: "புதுப்பிக்கப்படுகிறது...",
    updateLocation: "இருப்பிடத்தைப் புதுப்பிக்கவும்",
    openMaps: "வரைபடத்தில் திறக்கவும்",
    howItWorks: "இது எப்படி செயல்படுகிறது",
    locationAwareRisk: "இருப்பிட அடிப்படையிலான அபாயச் சூழல்",
    captureLocation: "இருப்பிடத்தைப் பெறுதல்",
    captureLocationText:
      "பயனர் அனுமதிக்குப் பிறகு சாதன ஆயத்தொலைவுகளைப் பெறுகிறது.",
    connectObservation: "பதிவை இணைத்தல்",
    connectObservationText:
      "தாவரங்கள், விலங்குகள், பூச்சிகள் அல்லது வனவிலங்கு பதிவுகளுடன் இருப்பிடத்தைப் பயன்படுத்தவும்.",
    assessRisk: "அபாயத்தை மதிப்பிடுதல்",
    assessRiskText:
      "AgroBioGuard கிடைக்கும் சூழல் தகவலை அபாய மதிப்பீட்டுச் செயல்பாட்டில் பயன்படுத்துகிறது.",
    localObservations: "உள்ளூர் பதிவுகள்",
    recentEvents: "சமீபத்திய இருப்பிடத் தயாரான நிகழ்வுகள்",
    refresh: "புதுப்பிக்கவும்",
    noSavedObservations: "சேமிக்கப்பட்ட பதிவுகள் எதுவும் இல்லை",
    noSavedObservationsText:
      "CCTV, ஆஃப்லைன் அல்லது பிற உள்ளூர் பதிவுகள் இங்கே தோன்றும்.",
    risk: "அபாயம்",
    community: "சமூகம்",
    riskAssessment: "அபாய மதிப்பீடு",
    smartAgriculture: "ஸ்மார்ட் வேளாண்மை",
    backHome: "முகப்புக்குத் திரும்பு",
  },

  Telugu: {
    eyebrow: "స్థాన నిఘా",
    title: "పరిశీలన ఎక్కడ జరిగిందో అర్థం చేసుకోండి",
    description:
      "AgroBioGuard పరికరం స్థాన సందర్భంతో పరిశీలనలను అనుసంధానించి వ్యవసాయ మరియు పర్యావరణ అంచనాకు సహాయపడుతుంది.",
    deviceLocation: "పరికరం స్థానం",
    locationStatus: "స్థాన స్థితి",
    available: "అందుబాటులో ఉంది",
    notConnected: "కనెక్ట్ కాలేదు",
    noLocationShared: "ఇంకా ఏ స్థానం భాగస్వామ్యం చేయబడలేదు",
    useLocationDescription:
      "AgroBioGuard పరిశీలనలకు కోఆర్డినేట్లను జోడించడానికి మీ పరికరం స్థానాన్ని ఉపయోగించండి.",
    gettingLocation: "స్థానం పొందుతోంది...",
    useMyLocation: "నా స్థానాన్ని ఉపయోగించండి",
    unavailable: "అందుబాటులో లేదు",
    latitude: "అక్షాంశం",
    longitude: "రేఖాంశం",
    updating: "నవీకరిస్తోంది...",
    updateLocation: "స్థానాన్ని నవీకరించండి",
    openMaps: "మ్యాప్స్‌లో తెరవండి",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    locationAwareRisk: "స్థాన ఆధారిత ప్రమాద సందర్భం",
    captureLocation: "స్థానాన్ని పొందండి",
    captureLocationText:
      "వినియోగదారు అనుమతి ఇచ్చిన తర్వాత పరికర కోఆర్డినేట్లను చదువుతుంది.",
    connectObservation: "పరిశీలనను అనుసంధానించండి",
    connectObservationText:
      "వృక్షజాలం, జంతుజాలం, కీటకాలు లేదా వన్యప్రాణి పరిశీలనలతో స్థానాన్ని ఉపయోగించండి.",
    assessRisk: "ప్రమాదాన్ని అంచనా వేయండి",
    assessRiskText:
      "AgroBioGuard అందుబాటులో ఉన్న సందర్భాన్ని ప్రమాద అంచనా ప్రక్రియలో ఉపయోగిస్తుంది.",
    localObservations: "స్థానిక పరిశీలనలు",
    recentEvents: "ఇటీవలి స్థాన సిద్ధమైన సంఘటనలు",
    refresh: "రిఫ్రెష్",
    noSavedObservations: "నిల్వ చేసిన పరిశీలనలు లేవు",
    noSavedObservationsText:
      "CCTV, ఆఫ్‌లైన్ లేదా ఇతర స్థానిక పరిశీలనలు ఇక్కడ కనిపిస్తాయి.",
    risk: "ప్రమాదం",
    community: "సమాజం",
    riskAssessment: "ప్రమాద అంచనా",
    smartAgriculture: "స్మార్ట్ వ్యవసాయం",
    backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
  },

  Hindi: {
    eyebrow: "स्थान इंटेलिजेंस",
    title: "समझें कि अवलोकन कहाँ हुआ",
    description:
      "AgroBioGuard डिवाइस स्थान संदर्भ के साथ अवलोकनों को जोड़कर कृषि और पारिस्थितिक आकलन में सहायता करता है।",
    deviceLocation: "डिवाइस स्थान",
    locationStatus: "स्थान स्थिति",
    available: "उपलब्ध",
    notConnected: "कनेक्ट नहीं है",
    noLocationShared: "अभी तक कोई स्थान साझा नहीं किया गया है",
    useLocationDescription:
      "AgroBioGuard अवलोकनों के साथ निर्देशांक जोड़ने के लिए अपने डिवाइस स्थान का उपयोग करें।",
    gettingLocation: "स्थान प्राप्त किया जा रहा है...",
    useMyLocation: "मेरा स्थान उपयोग करें",
    unavailable: "उपलब्ध नहीं",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    updating: "अपडेट हो रहा है...",
    updateLocation: "स्थान अपडेट करें",
    openMaps: "मैप्स में खोलें",
    howItWorks: "यह कैसे काम करता है",
    locationAwareRisk: "स्थान-आधारित जोखिम संदर्भ",
    captureLocation: "स्थान प्राप्त करें",
    captureLocationText:
      "उपयोगकर्ता की अनुमति के बाद डिवाइस निर्देशांक पढ़ें।",
    connectObservation: "अवलोकन जोड़ें",
    connectObservationText:
      "वनस्पति, जीव-जंतु, कीट या वन्यजीव अवलोकनों के साथ स्थान का उपयोग करें।",
    assessRisk: "जोखिम का आकलन करें",
    assessRiskText:
      "AgroBioGuard उपलब्ध संदर्भ का उपयोग अपनी जोखिम आकलन प्रक्रिया में करता है।",
    localObservations: "स्थानीय अवलोकन",
    recentEvents: "हाल की स्थान-तैयार घटनाएँ",
    refresh: "रीफ्रेश",
    noSavedObservations: "कोई सहेजे गए अवलोकन नहीं मिले",
    noSavedObservationsText:
      "CCTV, ऑफ़लाइन या अन्य स्थानीय अवलोकन यहाँ दिखाई देंगे।",
    risk: "जोखिम",
    community: "समुदाय",
    riskAssessment: "जोखिम आकलन",
    smartAgriculture: "स्मार्ट कृषि",
    backHome: "होम पर वापस जाएँ",
  },

  Kannada: {
    eyebrow: "ಸ್ಥಳ ಮಾಹಿತಿ",
    title: "ವೀಕ್ಷಣೆ ಎಲ್ಲಿ ಸಂಭವಿಸಿತು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    description:
      "AgroBioGuard ಸಾಧನದ ಸ್ಥಳ ಸಂದರ್ಭದೊಂದಿಗೆ ವೀಕ್ಷಣೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ ಕೃಷಿ ಮತ್ತು ಪರಿಸರ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    deviceLocation: "ಸಾಧನದ ಸ್ಥಳ",
    locationStatus: "ಸ್ಥಳ ಸ್ಥಿತಿ",
    available: "ಲಭ್ಯವಿದೆ",
    notConnected: "ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ",
    noLocationShared: "ಇನ್ನೂ ಯಾವುದೇ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗಿಲ್ಲ",
    useLocationDescription:
      "AgroBioGuard ವೀಕ್ಷಣೆಗಳಿಗೆ ಸಂಯೋಜನೆಗಳನ್ನು ಸೇರಿಸಲು ನಿಮ್ಮ ಸಾಧನದ ಸ್ಥಳವನ್ನು ಬಳಸಿ.",
    gettingLocation: "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    unavailable: "ಲಭ್ಯವಿಲ್ಲ",
    latitude: "ಅಕ್ಷಾಂಶ",
    longitude: "ರೇಖಾಂಶ",
    updating: "ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
    updateLocation: "ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ",
    openMaps: "Maps ನಲ್ಲಿ ತೆರೆಯಿರಿ",
    howItWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    locationAwareRisk: "ಸ್ಥಳ-ಆಧಾರಿತ ಅಪಾಯ ಸಂದರ್ಭ",
    captureLocation: "ಸ್ಥಳ ಪಡೆಯಿರಿ",
    captureLocationText:
      "ಬಳಕೆದಾರರ ಅನುಮತಿಯ ನಂತರ ಸಾಧನದ ಸ್ಥಳ ಸಂಯೋಜನೆಗಳನ್ನು ಓದಿ.",
    connectObservation: "ವೀಕ್ಷಣೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ",
    connectObservationText:
      "ಸಸ್ಯಜಾಲ, ಪ್ರಾಣಿಜಾಲ, ಕೀಟ ಅಥವಾ ವನ್ಯಜೀವಿ ವೀಕ್ಷಣೆಗಳೊಂದಿಗೆ ಸ್ಥಳವನ್ನು ಬಳಸಿ.",
    assessRisk: "ಅಪಾಯವನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ",
    assessRiskText:
      "AgroBioGuard ಲಭ್ಯವಿರುವ ಸಂದರ್ಭವನ್ನು ತನ್ನ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಬಳಸುತ್ತದೆ.",
    localObservations: "ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆಗಳು",
    recentEvents: "ಇತ್ತೀಚಿನ ಸ್ಥಳ-ಸಿದ್ಧ ಘಟನೆಗಳು",
    refresh: "ರಿಫ್ರೆಶ್",
    noSavedObservations: "ಯಾವುದೇ ಉಳಿಸಿದ ವೀಕ್ಷಣೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noSavedObservationsText:
      "CCTV, ಆಫ್‌ಲೈನ್ ಅಥವಾ ಇತರ ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    risk: "ಅಪಾಯ",
    community: "ಸಮುದಾಯ",
    riskAssessment: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
    smartAgriculture: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
    backHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  },

  Malayalam: {
    eyebrow: "ലൊക്കേഷൻ ഇന്റലിജൻസ്",
    title: "നിരീക്ഷണം എവിടെ നടന്നുവെന്ന് മനസ്സിലാക്കുക",
    description:
      "AgroBioGuard ഉപകരണ ലൊക്കേഷൻ സന്ദർഭവുമായി നിരീക്ഷണങ്ങളെ ബന്ധിപ്പിച്ച് കാർഷികവും പരിസ്ഥിതിയുമായ വിലയിരുത്തലിന് സഹായിക്കുന്നു.",
    deviceLocation: "ഉപകരണ ലൊക്കേഷൻ",
    locationStatus: "ലൊക്കേഷൻ നില",
    available: "ലഭ്യമാണ്",
    notConnected: "ബന്ധിപ്പിച്ചിട്ടില്ല",
    noLocationShared: "ഇതുവരെ ലൊക്കേഷൻ പങ്കിട്ടിട്ടില്ല",
    useLocationDescription:
      "AgroBioGuard നിരീക്ഷണങ്ങളിലേക്ക് കോർഡിനേറ്റുകൾ ചേർക്കാൻ നിങ്ങളുടെ ഉപകരണ ലൊക്കേഷൻ ഉപയോഗിക്കുക.",
    gettingLocation: "ലൊക്കേഷൻ ലഭ്യമാക്കുന്നു...",
    useMyLocation: "എന്റെ ലൊക്കേഷൻ ഉപയോഗിക്കുക",
    unavailable: "ലഭ്യമല്ല",
    latitude: "അക്ഷാംശം",
    longitude: "രേഖാംശം",
    updating: "അപ്‌ഡേറ്റ് ചെയ്യുന്നു...",
    updateLocation: "ലൊക്കേഷൻ അപ്‌ഡേറ്റ് ചെയ്യുക",
    openMaps: "Maps ൽ തുറക്കുക",
    howItWorks: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    locationAwareRisk: "ലൊക്കേഷൻ അടിസ്ഥാനമാക്കിയ അപകട സന്ദർഭം",
    captureLocation: "ലൊക്കേഷൻ നേടുക",
    captureLocationText:
      "ഉപയോക്തൃ അനുമതിക്ക് ശേഷം ഉപകരണ കോർഡിനേറ്റുകൾ വായിക്കുക.",
    connectObservation: "നിരീക്ഷണം ബന്ധിപ്പിക്കുക",
    connectObservationText:
      "സസ്യജാലം, ജീവജാലം, കീടം അല്ലെങ്കിൽ വന്യജീവി നിരീക്ഷണങ്ങളോടൊപ്പം ലൊക്കേഷൻ ഉപയോഗിക്കുക.",
    assessRisk: "അപകടം വിലയിരുത്തുക",
    assessRiskText:
      "AgroBioGuard ലഭ്യമായ സന്ദർഭം അപകട വിലയിരുത്തൽ പ്രവർത്തനത്തിൽ ഉപയോഗിക്കുന്നു.",
    localObservations: "പ്രാദേശിക നിരീക്ഷണങ്ങൾ",
    recentEvents: "സമീപകാല ലൊക്കേഷൻ-സജ്ജമായ ഇവന്റുകൾ",
    refresh: "റിഫ്രെഷ്",
    noSavedObservations: "സംരക്ഷിച്ച നിരീക്ഷണങ്ങളൊന്നും കണ്ടെത്തിയില്ല",
    noSavedObservationsText:
      "CCTV, ഓഫ്‌ലൈൻ അല്ലെങ്കിൽ മറ്റ് പ്രാദേശിക നിരീക്ഷണങ്ങൾ ഇവിടെ പ്രത്യക്ഷപ്പെടും.",
    risk: "അപകടം",
    community: "സമൂഹം",
    riskAssessment: "അപകട വിലയിരുത്തൽ",
    smartAgriculture: "സ്മാർട്ട് കൃഷി",
    backHome: "ഹോമിലേക്ക് മടങ്ങുക",
  },
};

const localeMap: Record<SupportedLanguage, string> = {
  English: "en-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Hindi: "hi-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
};

function getCategoryLabel(
  category: string,
  language: SupportedLanguage,
) {
  const t = getTranslations(language);

  switch (category) {
    case "Flora":
      return t.flora;
    case "Fauna":
      return t.fauna;
    default:
      return category;
  }
}

export function LocationDashboard() {
  const { language } = useLanguage();
  const t = locationUiTranslations[language];

  const [location, setLocation] =
    useState<LocationContext>();

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [observations, setObservations] =
    useState<SavedObservation[]>([]);

  async function useMyLocation() {
    setLocationLoading(true);
    setMessage("");

    try {
      const currentLocation =
        await getCurrentLocation();

      const locationContext: LocationContext = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        source: "device",
      };

      setLocation(locationContext);
      setMessage(
        t.useLocationDescription,
      );
    } catch {
      setMessage(
        t.useLocationDescription,
      );
    } finally {
      setLocationLoading(false);
    }
  }

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

      setObservations(
        Array.isArray(parsed)
          ? parsed
          : [],
      );
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

  function refreshLocationData() {
    loadObservations();
    void useMyLocation();
  }

  return (
    <section className="location-dashboard-section">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow">
            <i /> {t.eyebrow}
          </p>

          <h1>{t.title}</h1>

          <p>{t.description}</p>
        </div>

        <div className="location-main-grid">
          <div className="location-main-card">
            <div className="location-card-top">
              <div>
                <small>{t.deviceLocation}</small>

                <strong>{t.locationStatus}</strong>
              </div>

              <span
                className={
                  location
                    ? "location-status active"
                    : "location-status"
                }
              >
                {location
                  ? t.available
                  : t.notConnected}
              </span>
            </div>

            {!location ? (
              <div className="location-empty-state">
                <span>📍</span>

                <strong>
                  {t.noLocationShared}
                </strong>

                <small>
                  {t.useLocationDescription}
                </small>

                <button
                  className="button primary"
                  type="button"
                  onClick={refreshLocationData}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? t.gettingLocation
                    : `${t.useMyLocation} →`}
                </button>
              </div>
            ) : (
              <div className="location-coordinate-card">
                <div>
                  <small>{t.latitude}</small>

                  <strong>
                    {location.latitude !==
                    undefined
                      ? location.latitude.toFixed(
                          6,
                        )
                      : t.unavailable}
                  </strong>
                </div>

                <div>
                  <small>{t.longitude}</small>

                  <strong>
                    {location.longitude !==
                    undefined
                      ? location.longitude.toFixed(
                          6,
                        )
                      : t.unavailable}
                  </strong>
                </div>
              </div>
            )}

            {message ? (
              <div className="location-page-message">
                {message}
              </div>
            ) : null}

            {location ? (
              <div className="location-actions">
                <button
                  className="button outline"
                  type="button"
                  onClick={refreshLocationData}
                  disabled={locationLoading}
                >
                  {locationLoading
                    ? t.updating
                    : t.updateLocation}
                </button>

                <a
                  className="button secondary"
                  href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.openMaps} →
                </a>
              </div>
            ) : null}
          </div>

          <div className="location-context-card">
            <small>{t.howItWorks}</small>

            <h2>{t.locationAwareRisk}</h2>

            <div className="location-step-list">
              <div>
                <span>01</span>

                <div>
                  <strong>
                    {t.captureLocation}
                  </strong>

                  <small>
                    {t.captureLocationText}
                  </small>
                </div>
              </div>

              <div>
                <span>02</span>

                <div>
                  <strong>
                    {t.connectObservation}
                  </strong>

                  <small>
                    {t.connectObservationText}
                  </small>
                </div>
              </div>

              <div>
                <span>03</span>

                <div>
                  <strong>
                    {t.assessRisk}
                  </strong>

                  <small>
                    {t.assessRiskText}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="location-observation-card">
          <div className="location-section-header">
            <div>
              <small>{t.localObservations}</small>

              <strong>{t.recentEvents}</strong>
            </div>

            <button
              type="button"
              className="button outline"
              onClick={loadObservations}
            >
              {t.refresh}
            </button>
          </div>

          {observations.length === 0 ? (
            <div className="location-no-observations">
              <span>◌</span>

              <strong>
                {t.noSavedObservations}
              </strong>

              <small>
                {t.noSavedObservationsText}
              </small>
            </div>
          ) : (
            <div className="location-observation-list">
              {observations
                .slice(0, 10)
                .map((observation) => (
                  <div
                    key={observation.id}
                    className="location-observation-row"
                  >
                    <div>
                      <strong>
                        {observation.species}
                      </strong>

                      <small>
                        {getCategoryLabel(
                          observation.category,
                          language,
                        )}{" "}
                        · {t.risk}{" "}
                        {observation.risk.toUpperCase()}
                      </small>
                    </div>

                    <span>
                      {new Date(
                        observation.savedAt,
                      ).toLocaleString(
                        localeMap[language],
                      )}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="location-navigation">
          <Link
            className="button outline"
            href="/community"
          >
            ← {t.community}
          </Link>

          <Link
            className="button outline"
            href="/risk"
          >
            {t.riskAssessment} →
          </Link>

          <Link
            className="button outline"
            href="/farm"
          >
            {t.smartAgriculture} →
          </Link>
        </div>
      </div>
    </section>
  );
}