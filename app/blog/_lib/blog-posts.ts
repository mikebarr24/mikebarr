import blogPostsData from "@/data/blog-posts.json";
import { z } from "zod";

const nonEmptyStringSchema = z.string().trim().min(1);
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: nonEmptyStringSchema,
});

const headingBlockSchema = z.object({
  type: z.literal("heading"),
  text: nonEmptyStringSchema,
});

const listBlockSchema = z.object({
  type: z.literal("list"),
  items: z.array(nonEmptyStringSchema).min(1),
});

export const blogPostContentBlockSchema = z.discriminatedUnion("type", [
  paragraphBlockSchema,
  headingBlockSchema,
  listBlockSchema,
]);

const blogPostBaseSchema = z.object({
  slug: slugSchema,
  title: nonEmptyStringSchema,
  summary: nonEmptyStringSchema,
  tags: z.array(nonEmptyStringSchema),
  readingTimeMinutes: z.number().int().positive(),
  featured: z.boolean().optional(),
  updatedAt: dateSchema.optional(),
  content: z.array(blogPostContentBlockSchema).min(1),
});

export const draftBlogPostSchema = blogPostBaseSchema.extend({
  status: z.literal("draft"),
});

export const publishedBlogPostSchema = blogPostBaseSchema.extend({
  status: z.literal("published"),
  publishedAt: dateSchema,
});

export const blogPostSchema = z.discriminatedUnion("status", [
  draftBlogPostSchema,
  publishedBlogPostSchema,
]);

export const blogPostsSchema = z.array(blogPostSchema).superRefine((posts, ctx) => {
  const slugs = new Set<string>();

  posts.forEach((post, index) => {
    if (slugs.has(post.slug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [index, "slug"],
        message: `Duplicate blog post slug "${post.slug}".`,
      });
      return;
    }

    slugs.add(post.slug);
  });
});

export type BlogPostContentBlock = z.infer<typeof blogPostContentBlockSchema>;
export type DraftBlogPost = z.infer<typeof draftBlogPostSchema>;
export type PublishedBlogPost = z.infer<typeof publishedBlogPostSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;

export const blogPosts = blogPostsSchema.parse(blogPostsData);

export function getPublishedBlogPosts(posts: BlogPost[] = blogPosts) {
  return [...blogPostsSchema.parse(posts)]
    .filter((post): post is PublishedBlogPost => post.status === "published")
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export function getPublishedBlogPostBySlug(
  slug: string,
  posts: BlogPost[] = blogPosts,
) {
  return getPublishedBlogPosts(posts).find((post) => post.slug === slug);
}
