import {ActivityIndicator, ColorValue} from 'react-native';

interface Props {
  color?: ColorValue;
  size?: number | 'small' | 'large' | undefined;
}
export const Spinner = (props: Props) => {
  return <ActivityIndicator {...props} />;
};
