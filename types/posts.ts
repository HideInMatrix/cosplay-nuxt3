export interface Cosplay {
  id: number;
  title: string;
  cover?: string;
  content?: string;
  tag_id?: number;
  onload?: boolean;
  tags?: {
    id: number;
    name: string;
  };
}
