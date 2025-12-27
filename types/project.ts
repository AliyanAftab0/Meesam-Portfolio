export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  video_url?: string;
  image_url: string;
  is_featured: boolean;
  skills: string[];
  created_at: string;
}
