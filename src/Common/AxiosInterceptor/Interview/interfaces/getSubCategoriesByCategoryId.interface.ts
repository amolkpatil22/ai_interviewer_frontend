export interface getSubCategoriesByCategoryIdHttpsData {
  _id: string;
  category_id: string;
  name: string;
}

export interface getSubCategoriesByCategoryIdHttpsResponse {
  headers: Object;
  data: getSubCategoriesByCategoryIdHttpsData[];
}
