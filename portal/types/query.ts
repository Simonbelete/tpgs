export type Query = Object;

export type CreateFormData<T> = {
  id: number;
  data: Partial<T>;
};
