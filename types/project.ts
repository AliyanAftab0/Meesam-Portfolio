export interface Project {
  id: string; // Sanity IDs are strings
  title: string;
  description: string;
  category: string;
  video_url?: string;
  video_file?: string;
  image_url: string;
  is_featured: boolean;
  skills: string[];
  created_at: string;
}
