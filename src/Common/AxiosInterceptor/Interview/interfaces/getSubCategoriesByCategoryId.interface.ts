export interface getSubCategoriesByCategoryIdHttpsData {
  _id: string;
  category_id: string;
  name: string;
}

export interface getSubCategoriesByCategoryIdHttpsResponse {
  header: Object;
  data: getSubCategoriesByCategoryIdHttpsData;
}
