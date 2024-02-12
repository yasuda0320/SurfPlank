// types.ts

export interface CategoryContent {
  url: string;
  category: number;
  category_name: string;
  directory_name: string;
  category_order: number;
  board_name: string;
}

export interface CategoryItem {
  category_number: string;
  category_name: string;
  category_content: CategoryContent[];
}

export interface Category {
  id: string;
  name: string;
  content?: CategoryContent[];
}

export interface BbsMenu {
  menu_list: CategoryItem[];
}

export type RootStackParamList = {
  CategoryList: undefined; // 他のスクリーンの定義があればここに追加
  BoardList: { categoryContent: CategoryContent[] }; // 必要に応じて型を修正
};
