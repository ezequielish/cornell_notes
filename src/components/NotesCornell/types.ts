interface Notes {
  title: string;
  notes: string[] | string;
}

export interface NoteCornell {
  id?: string | number;
  title: string;
  date: string;
  bookId: string | number;
  notes: Notes[] | [];
  aiSummary: string[] | string;
  summary: string[] | string;
  images: string[];
  theme?: string;
  pageStart: number;
  pageEnd: number;
  frontPage: string;
}

export interface NoteCornellProps {
  onSave: (libro: NoteCornell) => void;
  onCancel?: () => void;
  edit?: boolean;
  noteCornell?: NoteCornell;
  loading?: boolean;
}
