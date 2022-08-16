export interface Post {
  slug: string;
  url: string;
  type: string; // 'video' | 'blog' | 'podcast' | 'community' | 'release';
  duration?: string | null;
  title: string;
  description: string;
  datePosted: string;
  dateSource: string;
  sourceSite: string;
  sourceUrl: string;
  authorName: string;
  authorUrl: string;
  speakers: string[];
  tags: string[];
}

export interface DailyPosts {
  date: string;
  dailyPosts: Post[];
}