import React, { useMemo } from "react";
import { Modal,  useWindowDimensions, ScrollView, Linking, StyleSheet, Text } from "react-native";
import { Dialog, Button, useTheme } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import useAppConfig from "../useAppConfig";
import i18next from "i18next";
import { settingStyles } from "./ProfileSettings";

const PrivacyPolicyModal = ({ privacyVis, setPrivacyVis }) => {
    const { t } = useTranslation();
    const { height: windowHeight } = useWindowDimensions();
    const { colors } = useTheme();
    const { appConfig, loading } = useAppConfig();
    
    const getTemplateText = function(configObject) {
        if (configObject && (configObject.name)) {
            return configObject.intro.translated_text[i18next.language];
        }
    }

    let opCodeText;
    if(appConfig?.opcode?.autogen) {
        opCodeText = <Text style={styles.text}>{t('consent-text.opcode.autogen')}</Text>;
        
    } else {
        opCodeText = <Text style={styles.text}>{t('consent-text.opcode.not-autogen')}</Text>;
    }

    let yourRightsText;
    if(appConfig?.intro?.app_required) {
        yourRightsText = <Text style={styles.text}>{t('consent-text.rights.app-required', {program_admin_contact: appConfig?.intro?.program_admin_contact})}</Text>;

    } else {
        yourRightsText = <Text style={styles.text}>{t('consent-text.rights.app-not-required', {program_or_study: appConfig?.intro?.program_or_study})}</Text>;
    }

    const templateText = useMemo(() => getTemplateText(appConfig), [appConfig]);

    return (
        <>
            <Modal visible={privacyVis} onDismiss={() => setPrivacyVis(false)} transparent={true}>
                <Dialog visible={privacyVis} 
                        onDismiss={() => setPrivacyVis(false)} 
                        style={settingStyles.dialog(colors.elevation.level3)}>
                    <Dialog.Title>{t('consent-text.title')}</Dialog.Title>
                    <Dialog.Content style={{maxHeight: windowHeight/1.5, paddingBottom: 0}}>
                        <ScrollView persistentScrollbar={true}>
                            <Text style={styles.header}>{t('consent-text.introduction.header')}</Text>
                            <Text style={styles.text}>{templateText?.short_textual_description}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.introduction.what-is-openpath')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.introduction.what-is-NREL', {program_or_study: appConfig?.intro?.program_or_study})}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.introduction.if-disagree')}</Text>
                            <Text>{'\n'}</Text>

                            <Text style={styles.header}>{t('consent-text.why.header')}</Text>
                            <Text style={styles.text}>{templateText?.why_we_collect}</Text>
                            <Text>{'\n'}</Text>

                            <Text style={styles.header}>{t('consent-text.what.header')}</Text>
                            <Text style={styles.text}>{t('consent-text.what.no-pii')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.what.phone-sensor')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.what.labeling')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.what.demographics')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.what.on-nrel-site')}</Text>
                            {/* Linking is broken, look into enabling after migration
                            <Text style={styles.text}>
                                {t('consent-text.what.open-source-data')}
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://github.com/e-mission/e-mission-data-collection.git');
                                    }}>
                                    {' '}https://github.com/e-mission/e-mission-data-collection.git{' '}
                                </Text>
                                {t('consent-text.what.open-source-analysis')}
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://github.com/e-mission/e-mission-server.git');
                                    }}>
                                    {' '}https://github.com/e-mission/e-mission-server.git{' '}
                                </Text>
                                {t('consent-text.what.open-source-dashboard')}
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://github.com/e-mission/em-public-dashboard.git');
                                    }}>
                                    {' '}https://github.com/e-mission/em-public-dashboard.git{' '}
                                </Text>
                            </Text> */}
                            <Text>{'\n'}</Text>

                            <Text style={styles.header}>{t('consent-text.opcode.header')}</Text>
                            {opCodeText}
                            <Text>{'\n'}</Text>

                            <Text style={styles.header}>{t('consent-text.who-sees.header')}</Text>
                            <Text style={styles.text}>{t('consent-text.who-sees.public-dash')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.who-sees.individual-info')}</Text>
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.who-sees.program-admins', {
                                deployment_partner_name: appConfig?.intro?.deployment_partner_name, 
                                raw_data_use: templateText?.raw_data_use})}</Text>
                            <Text style={styles.text}>{t('consent-text.who-sees.nrel-devs')}</Text>
                            <Text>{'\n'}</Text>                            
                            <Text style={styles.text}>{t('consent-text.who-sees.TSDC-info')}
                                {/* Linking is broken, look into enabling after migration
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://nrel.gov/tsdc');
                                    }}>
                                    {t('consent-text.who-sees.on-website')}
                                </Text>
                                {t('consent-text.who-sees.and-in')}
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://www.sciencedirect.com/science/article/pii/S2352146515002999');
                                    }}>
                                    {t('consent-text.who-sees.this-pub')}
                                </Text>
                                {t('consent-text.who-sees.and')}
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL('https://www.nrel.gov/docs/fy18osti/70723.pdf');
                                    }}>
                                    {t('consent-text.who-sees.fact-sheet')}
                                </Text> */}
                                <Text style={styles.text}>{t('consent-text.who-sees.on-nrel-site')}</Text>
                            </Text>
                            <Text>{'\n'}</Text>  

                            <Text style={styles.header}>{t('consent-text.rights.header')}</Text>
                            {yourRightsText}
                            <Text>{'\n'}</Text>
                            <Text style={styles.text}>{t('consent-text.rights.destroy-data-pt1')}
                                {/* Linking is broken, look into enabling after migration
                                <Text
                                    style={styles.hyperlinkStyle(colors.primary)}
                                    onPress={() => {
                                        Linking.openURL("mailto:k.shankari@nrel.gov");
                                    }}>
                                    k.shankari@nrel.gov
                                </Text> */}
                                <Text style={styles.text}>(k.shankari@nrel.gov)</Text>
                                {t('consent-text.rights.destroy-data-pt2')}
                            </Text>
                            <Text>{'\n'}</Text>
                            
                            <Text style={styles.header}>{t('consent-text.questions.header')}</Text>
                            <Text style={styles.text}>{t('consent-text.questions.for-questions', {program_admin_contact: appConfig?.intro?.program_admin_contact})}</Text>
                            <Text>{'\n'}</Text>
                            
                            <Text style={styles.header}>{t('consent-text.consent.header')}</Text>
                            <Text style={styles.text}>{t('consent-text.consent.press-button-to-consent', {program_or_study: appConfig?.intro?.program_or_study})}</Text>

                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button 
                            onPress={() => setPrivacyVis(false)}>
                            {t('join.close')}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    hyperlinkStyle: (linkColor) => ({
        color: linkColor
    }),
    text: {
        fontSize: 14
    },
    header: {
        fontWeight: "bold",
        fontSize: 18
    }
  });

export default PrivacyPolicyModal;