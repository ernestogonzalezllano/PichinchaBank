import React from 'react';
import {Skeleton} from '../../../components/Skeleton';
import {CardList} from './CardList';
import {productMocked} from '../../../../__mocks__/productMocked';

export const SkeletonLoading = () =>
  Array.from({length: 10})
    .map(() => Math.random().toString())
    .map(e => (
      <Skeleton
        testID={'HomeCardSkeleton'}
        RenderElement={() => (
          <CardList
            index={1}
            handleOnPress={() => {}}
            separators={{} as any}
            item={productMocked}
          />
        )}
        key={e}
      />
    ));
