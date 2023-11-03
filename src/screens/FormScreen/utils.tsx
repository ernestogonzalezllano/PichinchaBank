import {GAPS} from '../../constants';
import {isActualDate, isValidDate, isValidUrl} from '../../utils/validators';
import {FormGaps} from './types';

export const validations = (formData: FormGaps) => {
  let errors = {};

  for (const key in formData) {
    if (!formData[key as keyof typeof GAPS]) {
      errors = {...errors, [key]: 'Este campo es requerido'};
    }
  }
  if (formData.id) {
    const length = formData.id.length;
    if (length < 3 || length > 10) {
      errors = {...errors, id: 'Debe tener entre 3 y 10 caracteres'};
    }
  }
  if (formData.name) {
    const length = formData.name.length;
    if (length < 5 || length > 100) {
      errors = {...errors, name: 'Debe tener entre 5 y 100 caracteres'};
    }
  }
  if (formData.description) {
    const length = formData.description.length;
    if (length < 10 || length > 200) {
      errors = {...errors, description: 'Debe tener entre 10 y 200 caracteres'};
    }
  }
  if (formData.date_release) {
    const date = isValidDate(formData.date_release);
    if (!date) {
      errors = {...errors, date_release: "El formato debe ser 'yyyy-mm-dd'"};
    } else {
      if (!isActualDate(new Date(formData.date_release))) {
        errors = {
          ...errors,
          date_release: 'La fecha debe ser posterior o igual a hoy',
        };
      }
    }
  }
  if (formData.logo) {
    if (!isValidUrl(formData.logo)) {
      errors = {...errors, logo: 'Debes ingresar una URL valida'};
    }
  }
  return errors;
};
