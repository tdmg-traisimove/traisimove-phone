import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import useAppConfig from '../useAppConfig';
import { getTemplateText } from './StudySummary';
import { useTheme } from 'react-native-paper';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const appConfig = useAppConfig();
  const { colors } = useTheme();

  let opCodeText;
  if (appConfig?.opcode?.autogen) {
    opCodeText = <Text style={styles.text}>{t('consent-text.opcode.autogen')}</Text>;
  } else {
    opCodeText = <Text style={styles.text}>{t('consent-text.opcode.not-autogen')}</Text>;
  }

  let yourRightsText;
  if (appConfig?.intro?.app_required) {
    yourRightsText = (
      <Text style={styles.text}>
        {t('consent-text.rights.app-required', {
          program_admin_contact: appConfig?.intro?.program_admin_contact,
        })}
      </Text>
    );
  } else {
    yourRightsText = (
      <Text style={styles.text}>
        {t('consent-text.rights.app-not-required', {
          program_or_study: appConfig?.intro?.program_or_study,
        })}
      </Text>
    );
  }

  // backwards compat hack to fill in the raw_data_use for programs that don't have it
  if (appConfig?.intro) {
    const default_raw_data_use = {
      en: `monitor the ${appConfig?.intro?.program_or_study}, send personalized surveys or provide recommendations to participants`,
      es: `monitorear el ${appConfig?.intro?.program_or_study}, enviar encuestas personalizadas o proporcionar recomendaciones a los participantes`,
    };
    Object.entries(appConfig?.intro?.translated_text).forEach(([lang, val]: [string, any]) => {
      val.raw_data_use = val.raw_data_use || default_raw_data_use[lang];
    });
  }

  const templateText = useMemo(
    () => getTemplateText(appConfig, i18n.resolvedLanguage),
    [appConfig],
  );

  return (
    <>
      <Text style={styles.title}>Term of use:</Text>
      <Text style={styles.header}>Introduction &amp; Purpose</Text>
      <Text style={styles.text}>Collecting GPS data via mobile devices is essential to understanding human mobility patterns.
This data enables researchers to analyze travel behavior with exceptional detail and accuracy,
supports informed infrastructure planning, provides real-time insights into mobility trends, and
facilitates the development of sustainable urban environments. To achieve these objectives, this
study requests that participants allow the TRAISI Move application (the “App”) on their
smartphones to collect travel history data.</Text>
      <Text>{'\n'}</Text>
      <Text style={styles.text}>If you do not consent to the terms outlined in this Privacy Policy, please delete the App.</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Purpose of Travel Survey Data Collection</Text>
      <Text style={styles.text}>The data collected will support research into mobility patterns, route choice modeling, transport
mode identification, trip origin-destination purposes, and analyses of urban passenger activity-
travel behavior. Insights gained from this survey will assist researchers, policymakers, and
planners in the Greater Toronto and Hamilton Area (GTHA) in making evidence-based policy
and infrastructure planning decisions related to transportation.</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Information We Collect</Text>
      <Text style={styles.text}>The App does not request or store Personally Identifiable Information (PII), such as your name
or phone number. Instead, it collects mobile device sensor data related to your location
(including background location), accelerometer readings, device-generated activity and mode
recognition, App usage duration, and battery consumption. The App will generate a “travel
diary” based on location data to help determine travel patterns and history.</Text>
      <Text>{'\n'}</Text>
      <Text style={styles.text}>You may also be asked to annotate these trips periodically with semantic labels, such as trip
mode, purpose, and alternative modes. Additionally, the App will request general
sociodemographic information such as approximate age, gender, and household type, which
helps contextualize travel behavior and enables generalization of results to broader populations.</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Data Access and Privacy Protections</Text>
      <Text style={styles.text}>This survey is conducted anonymously and will not collect any information that could directly
identify you or your family, such as names or unique identifiers. The App collects the location of
your home and trip destinations; however, this data will be aggregated into larger geographical
units (e.g., census tracts) before being made available for analysis to prevent identification of
specific locations.</Text>
      <Text>{'\n'}</Text>
      <Text style={styles.text}>Detailed location data will be securely stored at the University of Toronto (UofT) indefinitely
and will only be used for research purposes under the supervision of Professor Khandker Nurul
Habib. Any results from analyses will be reported in an aggregated format only. None of the data
collected by the App will be sold or used for commercial purposes, including advertising.</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Your Rights</Text>
      <Text style={styles.text}>Participation in this study is entirely voluntary. You have the right to decline participation or
withdraw from the study at any time without notice. To withdraw from the study, you may
simply delete the App from your device.</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Questions</Text>
      <Text style={styles.text}>If you have questions or require further information regarding this research, please contact the
      research team:</Text>
      <Text style={styles.text}>Professor Khandker Nurul Habib</Text>
      <Text style={styles.text}>Tel: 416-946-8027</Text>
      <Text style={styles.text}>Email: khandker.nurulhabib@utoronto.ca</Text>
      <Text>{'\n'}</Text>

      <Text style={styles.header}>Consent</Text>
      <Text style={styles.text}>Please select the button below to indicate that you have read, understood, and agree to this
      Privacy Policy, consent to the collection of your information, and wish to participate in the study.</Text>
    </>
  );
};

const styles = StyleSheet.create({
  hyperlinkStyle: (linkColor) => ({
    color: linkColor,
  }),
  text: {
    fontSize: 14,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 10,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 10,
  },
});

export default PrivacyPolicy;
