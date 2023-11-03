import React from 'react';
import {Skeleton} from '../../../components/Skeleton';

export const SkeletonLoading = () =>
  Array.from({length: 10})
    .map(() => Math.random().toString())
    .map(e => <Skeleton testID={'HomeCardSkeleton'} key={e} />);
