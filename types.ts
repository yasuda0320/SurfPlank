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
  CategoryList: undefined;
  BoardList: { categoryContent: CategoryContent[]; categoryName: string }; // categoryNameを追加
  ThreadList: { item: CategoryContent };
  ResponseList: { boardUrl: string; datFileName: string };
};

export interface ThreadInfo {
  datFileName: string; // .datファイル名
  title: string; // スレッドのタイトル
}

export interface ResponseContent {
  authorName: string;
  email?: string; // Optional, as not all posts will include an email address
  dateIdBe: string; // A string that combines date, ID, and BE identifier, which can be parsed further if needed
  content: string;
  threadTitle?: string; // Optional, only present in the first post of a thread
}
