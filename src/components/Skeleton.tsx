import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {CardList} from './CardList';

export const Skeleton = ({testID}: {testID?: string}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1500,
      useNativeDriver: true,
      delay: Math.random() * 1000,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      pulseAnim.stopAnimation();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  return (
    <Animated.View
      testID={testID}
      style={[styles.skeletonItem, {opacity: opacityAnim}]}>
      <Animated.View style={styles.skeletonDetails}>
        <CardList
          index={1}
          handleOnPress={() => {}}
          separators={{} as any}
          item={{
            id: 'undefined',
            date_release: 'undefined',
            date_revision: 'undefined',
            description: 'undefined',
            logo: 'undefined',
            name: 'undefined',
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    backgroundColor: 'lightgray',
    zIndex: 1000,
    borderRadius: 5,
  },

  skeletonDetails: {opacity: 0},
});
