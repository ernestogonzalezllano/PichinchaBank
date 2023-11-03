export type ApiRoutes = '/bp/products' | '/bp/products/verification';

export type GapsNames =
  | 'id'
  | 'name'
  | 'description'
  | 'logo'
  | 'date_release'
  | 'date_revision';

export interface Product {
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  id: string;
}
