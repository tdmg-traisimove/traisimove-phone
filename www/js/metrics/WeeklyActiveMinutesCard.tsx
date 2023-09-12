
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Card, Text, useTheme} from 'react-native-paper';
import { MetricsData } from './metricsTypes';
import { cardMargin, cardStyles } from './MetricsTab';
import { useImperialConfig } from '../config/useImperialConfig';
import { filterToRecentWeeks, formatDateRangeOfDays, secondsToMinutes } from './metricsHelper';
import { useTranslation } from 'react-i18next';
import BarChart from '../components/BarChart';
import { labelKeyToReadable, labelOptions } from '../survey/multilabel/confirmHelper';
import { getBaseModeByReadableLabel } from '../diary/diaryHelper';

export const ACTIVE_MODES = ['walk', 'bike'] as const;
type ActiveMode = typeof ACTIVE_MODES[number];

type Props = { userMetrics: MetricsData }
const WeeklyActiveMinutesCard = ({ userMetrics }: Props) => {

  const { colors } = useTheme();
  const { t } = useTranslation();


  const weeklyActiveMinutesRecords = useMemo(() => {
    const records = [];
    const [ recentWeek, prevWeek ] = filterToRecentWeeks(userMetrics?.duration);
    ACTIVE_MODES.forEach(mode => {
      const recentSum = recentWeek?.reduce((acc, day) => (
        acc + (day[`label_${mode}`] || 0)
      ), 0);
      if (recentSum) {
        const xLabel = `Past Week\n(${formatDateRangeOfDays(recentWeek)})`; // TODO: i18n
        records.push({label: labelKeyToReadable(mode), x: xLabel, y: recentSum / 60});
      }
      const prevSum = prevWeek?.reduce((acc, day) => (
        acc + (day[`label_${mode}`] || 0)
      ), 0);
      if (prevSum) {
        const xLabel = `Previous Week\n(${formatDateRangeOfDays(prevWeek)})`; // TODO: i18n
        records.push({label: labelKeyToReadable(mode), x: xLabel, y: prevSum / 60});
      }
    });
    return records as {label: ActiveMode, x: string, y: number}[];
  }, [userMetrics?.duration]);

  return (
    <Card style={cardStyles.card}
      contentStyle={{flex: 1}}>
      <Card.Title 
        title={t('main-metrics.active-minutes')}
        titleVariant='titleLarge'
        titleStyle={cardStyles.titleText(colors)}
        subtitle={t('main-metrics.weekly-active-minutes')}
        subtitleStyle={[cardStyles.titleText(colors), cardStyles.subtitleText]}
        style={cardStyles.title(colors)} />
      <Card.Content style={cardStyles.content}>
        { weeklyActiveMinutesRecords.length ?
          <BarChart records={weeklyActiveMinutesRecords} axisTitle={t('main-metrics.active-minutes')}
            isHorizontal={false} stacked={true}
            // TODO i18n
            lineAnnotations={[{ value: 150, label: 'Weekly Goal', position: 'center' }]}
            getColorForLabel={(l) => getBaseModeByReadableLabel(l, labelOptions).color} />
        :
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text variant='labelMedium' style={{textAlign: 'center'}}>
              {t('metrics.chart-no-data')}
            </Text>
          </View>
        }
      </Card.Content>
    </Card>
  )
}

export default WeeklyActiveMinutesCard;
