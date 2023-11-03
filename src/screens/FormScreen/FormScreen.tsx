import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Input} from '../../components/Input';
import {ButtonTouchable} from '../../components/ButtonTouchable';
import {isValidDateString} from '../../utils/validators';
import {GapsNames} from '../../types/api';
import {GAPS} from '../../constants';
import {FormScreenProps} from './types';
import {Modal} from './components/Modal';
import {useFormScreen} from './hooks/useFormScreen';

export const FormScreen = ({
  navigation: {popToTop},
  route: {params: product},
}: FormScreenProps) => {
  const {
    data,
    error,
    errors,
    handleSubmit,
    loading,
    setFormData,
    formData,
    setErrors,
    defaultFormData,
  } = useFormScreen({product});

  return (
    <View style={styles.container}>
      <View>
        {(Object.keys(GAPS) as GapsNames[]).map(gap => (
          <Input
            key={gap}
            {...GAPS[gap]}
            errorLabel={errors[gap as keyof typeof errors]}
            value={formData[gap]}
            onChange={text => {
              const value = {[gap]: text};
              if (gap === 'date_release') {
                const isDate = isValidDateString(text);
                if (isDate) {
                  const revisionDate = new Date(isDate);
                  revisionDate.setFullYear(revisionDate.getFullYear() + 1);
                  value.date_revision = isValidDateString(
                    revisionDate.toString(),
                  ) as string;
                }
              }
              setFormData(oldState => ({
                ...oldState,
                ...value,
              }));
            }}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonTouchable
          loading={loading}
          label="Enviar"
          onPress={handleSubmit}
        />
        <ButtonTouchable
          loading={loading}
          label="Reiniciar"
          type="secondary"
          onPress={() => {
            setFormData(defaultFormData);
            setErrors({});
          }}
        />
        {(data || error) && <Modal {...{popToTop, error}} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
  },
});
