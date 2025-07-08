import React from 'react';
import { View } from 'react-native';
import Typography from '../../../shared/ui/typography/Typography';
import MatchEventTimeline from '../../../shared/ui/match-event-timeline/MatchEventTimeline';
import { MatchEvent } from '../../../shared/ui/match-event-timeline/types';

export interface SummaryProps {
  events: MatchEvent[];
}

// События матча (Summary)
export const Summary: React.FC<SummaryProps> = ({ events }) => (
  <View style={{ padding: 16 }}>
    {events.length > 0 ? (
      <MatchEventTimeline events={events} />
    ) : (
      <Typography variant="caption" style={{ textAlign: 'center' }}>
        Нет событий
      </Typography>
    )}
  </View>
);

export default Summary; 