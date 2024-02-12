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
