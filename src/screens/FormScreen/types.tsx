import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/screensTypes';
import {GapsNames} from '../../types/api';

export type FormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Form'
>;

export type FormGaps = {
  [key in GapsNames]: string | undefined;
};
