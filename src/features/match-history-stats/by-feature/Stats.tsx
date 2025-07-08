import React from 'react';
import { View } from 'react-native';
import StatsBar from '../../../shared/ui/stats-bar/StatsBar';
import { statsBarColorMap } from '../../../shared/ui/stats-bar/colorMap';
import { durationMap } from '../mappings/matchStatsMappings';
import Typography from '../../../shared/ui/typography/Typography';

export interface StatItem {
  label: string;
  home: string | number;
  away: string | number;
  disabled?: boolean;
}

export interface StatsProps {
  stats: StatItem[];
}

// Статистика матча (счёт, таймы, пенальти, победитель, статус, тип матча, моки)
export const Stats: React.FC<StatsProps> = ({ stats }) => {
  if (!stats.length) return null;
  return (
    <View style={{ padding: 16 }}>
      {stats.map( ( s ) =>
      {
        let leftValue = s.home;
        let rightValue = s.away;
        let label = s.label;
        let isTypeOrStatus = false;
        if ( label === 'Тип матча' )
        {
          leftValue = durationMap[ String( s.home ) ] || s.home;
          rightValue = durationMap[ String( s.away ) ] || s.away;
          isTypeOrStatus = true;
        }
        if ( label === 'Статус' )
        {
          const statusMap: Record<string, string> = {
            TIMED: 'Запланирован',
            SCHEDULED: 'Запланирован',
            IN_PLAY: 'Идёт',
            PAUSED: 'Перерыв',
            FINISHED: 'Завершён',
            POSTPONED: 'Перенесён',
            SUSPENDED: 'Остановлен',
            CANCELED: 'Отменён',
          };
          leftValue = statusMap[ String( s.home ) ] || s.home;
          rightValue = statusMap[ String( s.away ) ] || s.away;
          isTypeOrStatus = true;
        }
        return (
          <View key={label}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Typography
                variant="body"
                style={{
                  minWidth: 36,
                  fontWeight: isTypeOrStatus ? '400' : 'bold',
                  fontSize: isTypeOrStatus ? 14 : undefined,
                  color: '#3B3BFF',
                }}
              >
                {leftValue}
              </Typography>
              <Typography variant="caption" style={{ flex: 1, textAlign: 'center', color: '#888' }}>{label}</Typography>
              <Typography
                variant="body"
                style={{
                  minWidth: 36,
                  fontWeight: isTypeOrStatus ? '400' : 'bold',
                  fontSize: isTypeOrStatus ? 14 : undefined,
                  color: '#E94057',
                  textAlign: 'right',
                }}
              >
                {rightValue}
              </Typography>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1, height: 6, borderRadius: 6, overflow: 'hidden', backgroundColor: s.disabled ? '#f2f2f2' : statsBarColorMap.background }}>
                <View style={{ width: `${ typeof s.home === 'number' ? ( s.home / Math.max( Number( s.home ), Number( s.away ), 1 ) ) * 100 : 0 }%`, backgroundColor: s.disabled ? '#ccc' : statsBarColorMap.left, height: 6, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} />
              </View>
              <View style={{ flex: 1, height: 6, borderRadius: 6, overflow: 'hidden', backgroundColor: s.disabled ? '#f2f2f2' : statsBarColorMap.background }}>
                <View style={{ width: `${ typeof s.away === 'number' ? ( s.away / Math.max( Number( s.home ), Number( s.away ), 1 ) ) * 100 : 0 }%`, backgroundColor: s.disabled ? '#ccc' : statsBarColorMap.right, height: 6, borderTopRightRadius: 6, borderBottomRightRadius: 6, marginLeft: 'auto' }} />
              </View>
            </View>
          </View>
        );
      } )}
    </View>
  );
};

export default Stats; 