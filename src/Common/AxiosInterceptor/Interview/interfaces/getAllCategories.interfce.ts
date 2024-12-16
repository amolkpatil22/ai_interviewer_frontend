export interface getAllCategoriesHttpsData {
  _id: string;
  name: string;
  description: string;
}
export interface getAllCategoriesHttpsResponse {
  headers: Object;
  data: getAllCategoriesHttpsData[];
}
