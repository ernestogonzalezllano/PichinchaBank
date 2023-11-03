import {GapsNames} from './types/api';

export const BASE_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const GAPS: {
  [key in GapsNames]: {label: string; disabled?: boolean};
} = {
  id: {label: 'ID'},
  name: {label: 'Nombre'},
  description: {label: 'Descripción'},
  logo: {label: 'Logo'},
  date_release: {label: 'Fecha liberación'},
  date_revision: {label: 'Fecha revisión', disabled: true},
};

export const gapsCreator = (isEdit?: boolean) => {
  const gaps = {...GAPS};
  if (isEdit) {
    gaps.id = {...gaps.id, disabled: true};
  }
  return gaps;
};
