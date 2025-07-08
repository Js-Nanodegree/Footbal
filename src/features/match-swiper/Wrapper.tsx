import React, { useRef, useState } from 'react';
import
{
  Alert,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { MatchCardProps } from './types';
import Card from './Card';
import SkeletonSwiper from './SkeletonSwiper';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import EmptyState from './EmptyState';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;

interface WrapperProps {
  data: MatchCardProps[];
  loading: boolean;
  error: string | null;
  onCardPress?: (index: number) => void;
}

const Wrapper: React.FC<WrapperProps> = ({ data, loading, error, onCardPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / CARD_WIDTH);
    setCurrentIndex(newIndex);
  };

  if ( loading )
    return (
      <View style={{ minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
        <SkeletonSwiper />
      </View>
    );
  if ( error )
    return (
      <View style={{ minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
        <ErrorState message={error} />
      </View>
    );
  if ( !data || data.length === 0 )
    return (
      <View style={{ minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
        <EmptyState message="Нет матчей" />
      </View>
    );

  return (
    <View style={{ minHeight: 250, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Card
            {...item}
            index={index}
            currentIndex={currentIndex}
            onPress={() =>
            {
              console.log( 'Card onPress item:', item );
              navigation.navigate('MatchHistory', {
                matchId: item.id,
                homeId: item.homeTeam?.id,
                awayId: item.awayTeam?.id,
                venue: 'home',
              });
            }}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={CARD_WIDTH}
        decelerationRate={0.92}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={{ flexGrow: 0 }}
      />
    </View>
  );
};

export default Wrapper;
