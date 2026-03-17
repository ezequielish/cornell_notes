export interface Book {
  id?: string | number;
  title: string;
  author: string;
  frontPage: string;
  gender: number;
  pages: number;
  year: string | number;
  description: string;
  favorite?: boolean;
}

export interface BookFormProps {
  onSave: (libro: Book) => void;
  onCancel?: () => void;
  edit?: boolean;
  book?: Book;
}

// Interfaz para los errores
export interface FormErrors {
  title?: string;
  author?: string;
  year?: string;
}
