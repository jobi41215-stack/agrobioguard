"use client";

import { useEffect, useState } from "react";
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

type FarmUiText = {
  demoBadge: string;
  healthy: string;
  needsReview: string;
  noActiveAlert: string;
  updated: string;
  pendingSync: string;
  offlineQueue: string;
  fieldMonitoring: string;
  farmRiskMap: string;
  demoMap: string;
  reviewRequired: string;
  wildlifeZone: string;
  monitor: string;
  alertPrefix: string;
  riskMonitoring: string;
  currentZones: string;
  zones: string;
  cropStable: string;
  fieldInspection: string;
  wildlifePerimeter: string;
  wildlifeDetected: string;
  monitorNearby: string;
  alert: string;
  watch: string;
  liveWildlifeAlert: string;
  highRiskDetected: string;
  monitoringStatus: string;
  dashboardData: string;
  farmDashboard: string;
};

const farmUiTranslations: Record<
  SupportedLanguage,
  FarmUiText
> = {
  English: {
    demoBadge: "SMART AGRICULTURE DEMO",
    healthy: "Healthy",
    needsReview: "Needs review",
    noActiveAlert: "No active alert",
    updated: "Updated",
    pendingSync: "Pending Sync",
    offlineQueue: "Offline queue",
    fieldMonitoring: "FIELD MONITORING",
    farmRiskMap: "Farm Risk Map",
    demoMap: "DEMO MAP",
    reviewRequired: "Review required",
    wildlifeZone: "Wildlife Zone",
    monitor: "Monitor",
    alertPrefix: "Alert",
    riskMonitoring: "RISK MONITORING",
    currentZones: "Current Zones",
    zones: "zones",
    cropStable: "Crop condition stable",
    fieldInspection: "Requires field inspection",
    wildlifePerimeter: "Wildlife Perimeter",
    wildlifeDetected: "detected",
    monitorNearby: "Monitor nearby activity",
    alert: "ALERT",
    watch: "WATCH",
    liveWildlifeAlert: "LIVE WILDLIFE ALERT",
    highRiskDetected:
      "High-risk local observation detected.",
    monitoringStatus:
      "AgroBioGuard monitoring status",
    dashboardData:
      "Demo dashboard uses local and sample monitoring data.",
    farmDashboard: "Farm Dashboard",
  },

  Tamil: {
    demoBadge: "ஸ்மார்ட் வேளாண்மை டெமோ",
    healthy: "ஆரோக்கியமாக உள்ளது",
    needsReview: "மதிப்பாய்வு தேவை",
    noActiveAlert: "செயலில் எச்சரிக்கை இல்லை",
    updated: "புதுப்பிக்கப்பட்டது",
    pendingSync: "ஒத்திசைவு நிலுவையில்",
    offlineQueue: "ஆஃப்லைன் வரிசை",
    fieldMonitoring: "வயல் கண்காணிப்பு",
    farmRiskMap: "பண்ணை அபாய வரைபடம்",
    demoMap: "டெமோ வரைபடம்",
    reviewRequired: "மதிப்பாய்வு தேவை",
    wildlifeZone: "வனவிலங்கு பகுதி",
    monitor: "கண்காணிக்கவும்",
    alertPrefix: "எச்சரிக்கை",
    riskMonitoring: "அபாய கண்காணிப்பு",
    currentZones: "தற்போதைய பகுதிகள்",
    zones: "பகுதிகள்",
    cropStable: "பயிர் நிலை சீராக உள்ளது",
    fieldInspection: "வயல் ஆய்வு தேவை",
    wildlifePerimeter: "வனவிலங்கு எல்லை",
    wildlifeDetected: "கண்டறியப்பட்டது",
    monitorNearby: "அருகிலுள்ள செயல்பாட்டைக் கண்காணிக்கவும்",
    alert: "எச்சரிக்கை",
    watch: "கண்காணிப்பு",
    liveWildlifeAlert: "நேரடி வனவிலங்கு எச்சரிக்கை",
    highRiskDetected:
      "அதிக அபாய உள்ளூர் பதிவு கண்டறியப்பட்டது.",
    monitoringStatus:
      "AgroBioGuard கண்காணிப்பு நிலை",
    dashboardData:
      "டெமோ டாஷ்போர்டு உள்ளூர் மற்றும் மாதிரி கண்காணிப்பு தரவைப் பயன்படுத்துகிறது.",
    farmDashboard: "பண்ணை டாஷ்போர்டு",
  },

  Telugu: {
    demoBadge: "స్మార్ట్ వ్యవసాయ డెమో",
    healthy: "ఆరోగ్యంగా ఉంది",
    needsReview: "సమీక్ష అవసరం",
    noActiveAlert: "క్రియాశీల హెచ్చరిక లేదు",
    updated: "నవీకరించబడింది",
    pendingSync: "సింక్ పెండింగ్‌లో ఉంది",
    offlineQueue: "ఆఫ్‌లైన్ క్యూ",
    fieldMonitoring: "వ్యవసాయ పర్యవేక్షణ",
    farmRiskMap: "వ్యవసాయ ప్రమాద మ్యాప్",
    demoMap: "డెమో మ్యాప్",
    reviewRequired: "సమీక్ష అవసరం",
    wildlifeZone: "వన్యప్రాణి ప్రాంతం",
    monitor: "పర్యవేక్షించండి",
    alertPrefix: "హెచ్చరిక",
    riskMonitoring: "ప్రమాద పర్యవేక్షణ",
    currentZones: "ప్రస్తుత ప్రాంతాలు",
    zones: "ప్రాంతాలు",
    cropStable: "పంట పరిస్థితి స్థిరంగా ఉంది",
    fieldInspection: "పొల పరిశీలన అవసరం",
    wildlifePerimeter: "వన్యప్రాణి పరిధి",
    wildlifeDetected: "గుర్తించబడింది",
    monitorNearby: "సమీప కార్యకలాపాలను పర్యవేక్షించండి",
    alert: "హెచ్చరిక",
    watch: "నిఘా",
    liveWildlifeAlert: "లైవ్ వన్యప్రాణి హెచ్చరిక",
    highRiskDetected:
      "అధిక ప్రమాద స్థానిక పరిశీలన గుర్తించబడింది.",
    monitoringStatus:
      "AgroBioGuard పర్యవేక్షణ స్థితి",
    dashboardData:
      "డెమో డాష్‌బోర్డ్ స్థానిక మరియు నమూనా పర్యవేక్షణ డేటాను ఉపయోగిస్తుంది.",
    farmDashboard: "వ్యవసాయ డాష్‌బోర్డ్",
  },

  Hindi: {
    demoBadge: "स्मार्ट कृषि डेमो",
    healthy: "स्वस्थ",
    needsReview: "समीक्षा आवश्यक",
    noActiveAlert: "कोई सक्रिय चेतावनी नहीं",
    updated: "अपडेट किया गया",
    pendingSync: "सिंक लंबित",
    offlineQueue: "ऑफ़लाइन कतार",
    fieldMonitoring: "खेत निगरानी",
    farmRiskMap: "फार्म जोखिम मानचित्र",
    demoMap: "डेमो मानचित्र",
    reviewRequired: "समीक्षा आवश्यक",
    wildlifeZone: "वन्यजीव क्षेत्र",
    monitor: "निगरानी करें",
    alertPrefix: "चेतावनी",
    riskMonitoring: "जोखिम निगरानी",
    currentZones: "वर्तमान क्षेत्र",
    zones: "क्षेत्र",
    cropStable: "फसल की स्थिति स्थिर है",
    fieldInspection: "खेत निरीक्षण आवश्यक",
    wildlifePerimeter: "वन्यजीव सीमा",
    wildlifeDetected: "पता चला",
    monitorNearby: "आसपास की गतिविधि की निगरानी करें",
    alert: "चेतावनी",
    watch: "निगरानी",
    liveWildlifeAlert: "लाइव वन्यजीव चेतावनी",
    highRiskDetected:
      "उच्च जोखिम वाला स्थानीय अवलोकन मिला।",
    monitoringStatus:
      "AgroBioGuard निगरानी स्थिति",
    dashboardData:
      "डेमो डैशबोर्ड स्थानीय और नमूना निगरानी डेटा का उपयोग करता है।",
    farmDashboard: "फार्म डैशबोर्ड",
  },

  Kannada: {
    demoBadge: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಡೆಮೊ",
    healthy: "ಆರೋಗ್ಯಕರ",
    needsReview: "ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    noActiveAlert: "ಯಾವುದೇ ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆ ಇಲ್ಲ",
    updated: "ನವೀಕರಿಸಲಾಗಿದೆ",
    pendingSync: "ಸಿಂಕ್ ಬಾಕಿಯಿದೆ",
    offlineQueue: "ಆಫ್‌ಲೈನ್ ಸರತಿ",
    fieldMonitoring: "ಕ್ಷೇತ್ರ ಮೇಲ್ವಿಚಾರಣೆ",
    farmRiskMap: "ಫಾರ್ಮ್ ಅಪಾಯ ನಕ್ಷೆ",
    demoMap: "ಡೆಮೋ ನಕ್ಷೆ",
    reviewRequired: "ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    wildlifeZone: "ವನ್ಯಜೀವಿ ಪ್ರದೇಶ",
    monitor: "ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    alertPrefix: "ಎಚ್ಚರಿಕೆ",
    riskMonitoring: "ಅಪಾಯ ಮೇಲ್ವಿಚಾರಣೆ",
    currentZones: "ಪ್ರಸ್ತುತ ಪ್ರದೇಶಗಳು",
    zones: "ಪ್ರದೇಶಗಳು",
    cropStable: "ಬೆಳೆ ಸ್ಥಿತಿ ಸ್ಥಿರವಾಗಿದೆ",
    fieldInspection: "ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    wildlifePerimeter: "ವನ್ಯಜೀವಿ ಗಡಿ",
    wildlifeDetected: "ಪತ್ತೆಯಾಗಿದೆ",
    monitorNearby: "ಸಮೀಪದ ಚಟುವಟಿಕೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    alert: "ಎಚ್ಚರಿಕೆ",
    watch: "ನಿಗಾವಹಿಸಿ",
    liveWildlifeAlert: "ಲೈವ್ ವನ್ಯಜೀವಿ ಎಚ್ಚರಿಕೆ",
    highRiskDetected:
      "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆ ಪತ್ತೆಯಾಗಿದೆ.",
    monitoringStatus:
      "AgroBioGuard ಮೇಲ್ವಿಚಾರಣಾ ಸ್ಥಿತಿ",
    dashboardData:
      "ಡೆಮೋ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸ್ಥಳೀಯ ಮತ್ತು ಮಾದರಿ ಮೇಲ್ವಿಚಾರಣಾ ಡೇಟಾವನ್ನು ಬಳಸುತ್ತದೆ.",
    farmDashboard: "ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  },

  Malayalam: {
    demoBadge: "സ്മാർട്ട് കൃഷി ഡെമോ",
    healthy: "ആരോഗ്യകരം",
    needsReview: "പരിശോധന ആവശ്യമാണ്",
    noActiveAlert: "സജീവ മുന്നറിയിപ്പില്ല",
    updated: "അപ്‌ഡേറ്റ് ചെയ്തു",
    pendingSync: "സിങ്ക് ബാക്കി",
    offlineQueue: "ഓഫ്‌ലൈൻ ക്യൂ",
    fieldMonitoring: "കൃഷിയിട നിരീക്ഷണം",
    farmRiskMap: "ഫാം അപകട ഭൂപടം",
    demoMap: "ഡെമോ മാപ്പ്",
    reviewRequired: "പരിശോധന ആവശ്യമാണ്",
    wildlifeZone: "വന്യജീവി മേഖല",
    monitor: "നിരീക്ഷിക്കുക",
    alertPrefix: "മുന്നറിയിപ്പ്",
    riskMonitoring: "അപകട നിരീക്ഷണം",
    currentZones: "നിലവിലെ മേഖലകൾ",
    zones: "മേഖലകൾ",
    cropStable: "വിളയുടെ നില സ്ഥിരമാണ്",
    fieldInspection: "കൃഷിയിട പരിശോധന ആവശ്യമാണ്",
    wildlifePerimeter: "വന്യജീവി പരിധി",
    wildlifeDetected: "കണ്ടെത്തി",
    monitorNearby: "സമീപത്തെ പ്രവർത്തനം നിരീക്ഷിക്കുക",
    alert: "മുന്നറിയിപ്പ്",
    watch: "നിരീക്ഷണം",
    liveWildlifeAlert: "ലൈവ് വന്യജീവി മുന്നറിയിപ്പ്",
    highRiskDetected:
      "ഉയർന്ന അപകടസാധ്യതയുള്ള പ്രാദേശിക നിരീക്ഷണം കണ്ടെത്തി.",
    monitoringStatus:
      "AgroBioGuard നിരീക്ഷണ നില",
    dashboardData:
      "ഡെമോ ഡാഷ്‌ബോർഡ് പ്രാദേശികവും മാതൃകാ നിരീക്ഷണ ഡാറ്റയും ഉപയോഗിക്കുന്നു.",
    farmDashboard: "ഫാം ഡാഷ്‌ബോർഡ്",
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

export function FarmDashboard() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const ui = farmUiTranslations[language];

  const [pendingObservations, setPendingObservations] =
    useState(0);

  const [activeAlerts, setActiveAlerts] =
    useState(0);

  const [latestWildlifeAlert, setLatestWildlifeAlert] =
    useState<SavedObservation>();

  useEffect(() => {
    function updatePendingCount() {
      const saved = localStorage.getItem(
        "agrobioguard-observations",
      );

      let observations: SavedObservation[] = [];

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            observations = parsed;
          }
        } catch {
          observations = [];
        }
      }

      setPendingObservations(
        observations.length,
      );

      const latestSavedAlert =
        localStorage.getItem(
          "agrobioguard-latest-alert",
        );

      let latestAlert:
        | SavedObservation
        | undefined;

      if (latestSavedAlert) {
        try {
          const parsed =
            JSON.parse(latestSavedAlert);

          if (
            parsed &&
            typeof parsed.species === "string"
          ) {
            latestAlert = parsed;
          }
        } catch {
          latestAlert = undefined;
        }
      }

      setLatestWildlifeAlert(
        latestAlert,
      );

      const alertCount =
        latestAlert?.risk.toLowerCase() ===
        "high"
          ? 1
          : 0;

      setActiveAlerts(alertCount);
    }

    window.addEventListener(
      "agrobioguard-observation-saved",
      updatePendingCount,
    );

    window.addEventListener(
      "agrobioguard-observations-synced",
      updatePendingCount,
    );

    window.addEventListener(
      "storage",
      updatePendingCount,
    );

    updatePendingCount();

    return () => {
      window.removeEventListener(
        "agrobioguard-observation-saved",
        updatePendingCount,
      );

      window.removeEventListener(
        "storage",
        updatePendingCount,
      );

      window.removeEventListener(
        "agrobioguard-observations-synced",
        updatePendingCount,
      );
    };
  }, []);

  return (
    <section
      className="farm-section wrap"
      id="farm-dashboard"
    >
      <div className="farm-copy">
        <p className="eyebrow">
          <i /> {t.smartAgricultureEyebrow}
        </p>

        <h2>{t.farmTitle}</h2>

        <p>{t.farmText}</p>

        <div className="farm-demo-badge">
          <span /> {ui.demoBadge}
        </div>
      </div>

      <div className="agri-dashboard">
        <div className="dashboard-header">
          <div>
            <small>
              {t.smartAgriculture}
            </small>

            <strong>
              {t.farmOverview}
            </strong>
          </div>

          <span>{t.demoData}</span>
        </div>

        <div className="dashboard-metrics">
          <div className="dashboard-metric">
            <small>{t.fieldHealth}</small>

            <strong>
              86<span>%</span>
            </strong>

            <b className="metric-good">
              {ui.healthy}
            </b>
          </div>

          <div className="dashboard-metric">
            <small>{t.activeAlerts}</small>

            <strong>
              {String(activeAlerts).padStart(
                2,
                "0",
              )}
            </strong>

            <b className="metric-alert">
              {activeAlerts > 0
                ? ui.needsReview
                : ui.noActiveAlert}
            </b>
          </div>

          <div className="dashboard-metric">
            <small>{t.lastScan}</small>

            <strong>{t.today}</strong>

            <b className="metric-good">
              {ui.updated}
            </b>
          </div>

          <div className="dashboard-metric">
            <small>{ui.pendingSync}</small>

            <strong>
              {pendingObservations}
            </strong>

            <b className="metric-pending">
              {ui.offlineQueue}
            </b>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-map-card">
            <div className="dashboard-card-header">
              <div>
                <small>
                  {ui.fieldMonitoring}
                </small>

                <strong>
                  {ui.farmRiskMap}
                </strong>
              </div>

              <span className="map-status">
                {ui.demoMap}
              </span>
            </div>

            <div className="dashboard-map">
              <span className="dashboard-map-pin pin-a">
                ●
              </span>

              <span className="dashboard-map-pin pin-b">
                ●
              </span>

              <span className="dashboard-map-pin pin-c">
                ●
              </span>

              <div className="dashboard-field north">
                <b>{t.northField}</b>

                <span>{ui.healthy}</span>
              </div>

              <div className="dashboard-field river">
                <b>{t.riverPlot}</b>

                <span>
                  {ui.reviewRequired}
                </span>
              </div>

              <div className="dashboard-field wildlife">
                <b>{ui.wildlifeZone}</b>

                <span>
                  {latestWildlifeAlert
                    ? `${ui.alertPrefix}: ${latestWildlifeAlert.species}`
                    : ui.monitor}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-risk-card">
            <div className="dashboard-card-header">
              <div>
                <small>
                  {ui.riskMonitoring}
                </small>

                <strong>
                  {ui.currentZones}
                </strong>
              </div>

              <span>
                3 {ui.zones}
              </span>
            </div>

            <div className="risk-zone">
              <div>
                <b>{t.northField}</b>

                <small>
                  {ui.cropStable}
                </small>
              </div>

              <strong className="zone-good">
                {ui.healthy.toUpperCase()}
              </strong>
            </div>

            <div className="risk-zone">
              <div>
                <b>{t.riverPlot}</b>

                <small>
                  {ui.fieldInspection}
                </small>
              </div>

              <strong className="zone-review">
                {t.review.toUpperCase()}
              </strong>
            </div>

            <div className="risk-zone">
              <div>
                <b>{ui.wildlifePerimeter}</b>

                <small>
                  {latestWildlifeAlert
                    ? `${latestWildlifeAlert.species} ${ui.wildlifeDetected}`
                    : ui.monitorNearby}
                </small>
              </div>

              <strong
                className={
                  latestWildlifeAlert
                    ? "zone-alert"
                    : "zone-watch"
                }
              >
                {latestWildlifeAlert
                  ? ui.alert
                  : ui.watch}
              </strong>
            </div>
          </div>
        </div>

        {latestWildlifeAlert ? (
          <div className="dashboard-live-alert">
            <div>
              <small>
                {ui.liveWildlifeAlert}
              </small>

              <strong>
                🚨{" "}
                {latestWildlifeAlert.species}
              </strong>

              <span>
                {ui.highRiskDetected}
              </span>
            </div>

            <small>
              {new Date(
                latestWildlifeAlert.savedAt,
              ).toLocaleString(
                localeMap[language],
              )}
            </small>
          </div>
        ) : null}

        <div className="dashboard-footer">
          <div>
            <b>{ui.monitoringStatus}</b>

            <span>
              {ui.dashboardData}
            </span>
          </div>

          <a
            href="/farm"
            className="button secondary"
          >
            {ui.farmDashboard}{" "}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}