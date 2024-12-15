import React from 'react';
import { Modal, ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, Dialog, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const PrePermissionsModal = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();

  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)}>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Permissions</Dialog.Title>
        <Dialog.Content style={{ maxHeight: windowHeight / 1.5, paddingBottom: 0 }}>
          <ScrollView>
            <Text variant="bodyMedium">TRAISI Move always requires your permission to access the location and health & fitness data on your mobile device. This access is essential to accurately collect travel pattern data, which supports research into human mobility. Specifically, the collection of GPS data enables analyses of mobility patterns, route choice modeling, transport mode recognition, trip purposes, and urban passenger activity-travel behaviour. The insights gained will assist researchers, policymakers, and planners in making informed decisions regarding transportation infrastructure and policy development.</Text>
            <Text variant="bodyMedium"> </Text>
            <Text variant="bodyMedium">This study is conducted anonymously and does not collect personally identifiable information. While the app gathers location data, including details about your trip destinations, all such information will be aggregated to a broader geographical level (e.g., census tract) before being used for analysis. This ensures that no specific location or individual can be identified. All detailed location data will be securely stored indefinitely and will be used exclusively for non-commercial research purposes. Any results from this research will be reported only in an aggregated format.</Text>
            <Text variant="bodyMedium"> </Text>
            <Text variant="bodyMedium">Participation in this study is entirely voluntary. You may withdraw your consent at any time by uninstalling the app from your device. By providing access to your location and health data, you are contributing to research that has the potential to inform sustainable urban development and evidence-based transportation planning.</Text>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>{t('control.continue')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
};

export default PrePermissionsModal;
