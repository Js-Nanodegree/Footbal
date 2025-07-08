import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchEventTimelineProps } from './types';
import MatchEventCard from './MatchEventCard';
import Typography from '../typography/Typography';
import { matchEventColorMap } from './colorMap';

const MatchEventTimeline: React.FC<MatchEventTimelineProps> = ( { events, style } ) =>
{
    const [ openIds, setOpenIds ] = useState<( string | number )[]>( [] );
    const handleToggle = ( id: string | number ) =>
    {
        setOpenIds( ( prev ) =>
            prev.includes( id ) ? prev.filter( ( x ) => x !== id ) : [ ...prev, id ]
        );
    };
    return (
        <View style={[ styles.root, style ]}>
            {events.map( ( event, idx ) => (
                <View key={event.id} style={styles.row}>
                    <View style={styles.timelineCol}>
                        <Typography variant="caption" style={styles.time}>{event.time}'</Typography>
                        <View style={styles.timelineWrap}>
                            <View style={styles.timelineLine} />
                            <View style={styles.timelineDot} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <MatchEventCard
                            event={event}
                            collapsed={!openIds.includes( event.id )}
                            onToggle={() => handleToggle( event.id )}
                        />
                    </View>
                </View>
            ) )}
        </View>
    );
};

const styles = StyleSheet.create( {
    root: {
        flex: 1,
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 0,
    },
    timelineCol: {
        width: 44,
        alignItems: 'center',
        marginRight: 4,
    },
    time: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    timelineWrap: {
        width: 16,
        alignItems: 'center',
        position: 'relative',
    },
    timelineLine: {
        position: 'absolute',
        top: 8,
        left: 7,
        width: 2,
        height: 64,
        backgroundColor: matchEventColorMap.default,
        zIndex: 0,
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: matchEventColorMap.goal,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 0,
        zIndex: 1,
    },
} );

export default MatchEventTimeline; 