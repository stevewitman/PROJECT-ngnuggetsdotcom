export interface Post {
  slug: string;
  url: string;
  type: string; // 'video' | 'blog' | 'podcast' | 'community' | 'release';
  dur?: string | null;
  title: string;
  desc: string;
  dAdd: string;
  dSrc: string;
  srcSite: string;
  srcUrl: string;
  aName: string;
  aUrl: string;
  spkrs: string[];
  tags: string[];
  imgUrl?: string;
}

export interface DailyPost {
  date: string;
  dailyPosts: Post[] | [];
}