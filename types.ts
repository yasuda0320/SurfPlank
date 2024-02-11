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
  category_content: CategoryContent[]; // 新しいフィールドを追加
}

export interface Category {
  id: string;
  name: string;
  content?: CategoryContent[]; // オプショナルで追加も検討できます
}

export interface BbsMenu {
  menu_list: CategoryItem[];
}
