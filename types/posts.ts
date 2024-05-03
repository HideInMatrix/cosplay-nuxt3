export interface Cosplay {
  id: number;
  title: string;
  cover?: string;
  content?: string;
  tag_id?: number;
  onload?: boolean;
  creation_date?: string;
  tags?: {
    id: number;
    name: string;
  };
}
