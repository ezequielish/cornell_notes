export interface NoteCornell {
  id?: string | number;
  title: string;
  date: string;
  bookId: string | number;
  keywords: string[] | string;
  notes: string[] | string;
  aiSummary: string[] | string;
  summary: string[] | string;
  images: string[];
  theme?: string;
  startPage?: number;
  endPage?: number;
  frontPage?: string;
}

export interface NoteCornellProps {
  onSave: (libro: NoteCornell) => void;
  onCancel?: () => void;
  edit?: boolean;
  noteCornell?: NoteCornell;
}
