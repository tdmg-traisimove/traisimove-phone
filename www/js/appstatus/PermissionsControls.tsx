//component to view and manage permission settings
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import PermissionItem from './PermissionItem';
import { refreshAllChecks } from '../usePermissionStatus';
import ExplainPermissions from './ExplainPermissions';
import { AlertManager } from '../components/AlertBar';
import { AppContext } from '../App';

const PermissionsControls = ({ onAccept }) => {
  const { t } = useTranslation();
  const [explainVis, setExplainVis] = useState<boolean>(false);
  const { permissionStatus } = useContext(AppContext);
  const { checkList, overallStatus, explanationList } = permissionStatus;

  return (
    <>
      <Text style={styles.title}>{t('consent.permissions')}</Text>
      <ScrollView persistentScrollbar={true}>
        <Text>{t('intro.appstatus.overall-description')}</Text>
        <Button onPress={() => setExplainVis(true)}>
          {t('intro.appstatus.explanation-title')}
        </Button>
        <ExplainPermissions
          explanationList={explanationList}
          visible={explainVis}
          setVisible={setExplainVis}></ExplainPermissions>
        {checkList?.map((lc) => <PermissionItem key={lc.name} check={lc}></PermissionItem>)}
      </ScrollView>
      <View style={styles.buttonBox}>
        <Button onPress={() => refreshAllChecks(checkList)}>{t('intro.appstatus.refresh')}</Button>
        <Button onPress={onAccept} disabled={!overallStatus}>
          {t('control.continue')}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 10,
  },
  buttonBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default PermissionsControls;
