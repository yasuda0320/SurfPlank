// types.ts

export interface CategoryItem {
  category_number: string;
  category_name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BbsMenu {
  menu_list: CategoryItem[];
}
