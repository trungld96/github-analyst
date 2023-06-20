export interface ItemStyle {
  createdAt: string
  key: string
  name: string
  prompt: string
  updatedAt: string
}

export interface PagingResponse {
  items: Array<ItemStyle>;
  limit?: number;
  page?: number;
  totalItems?: number;
  totalPages?: number;
}
