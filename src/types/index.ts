export interface CategoriesDB {
    name: string;
    slug: string;
}

export interface RelatedPostDB {
    createdAt: string;
    featuredImage: FeaturedImageDB
    slug: string;
    title: string;
}

export interface FeaturedImageDB {
    url: string
}

export interface PostDB {
    author: AuthorDB;
    categories: Array<CategoriesDB>;
    createdAt: Date;
    excerpt: string;
    featuredImage: FeaturedImageDB
    slug: string;
    title: string;
}

export interface AuthorDB {
    bio: string;
    id: string;
    name: string;
    photo?: {
        url: string;
    } | null;
}