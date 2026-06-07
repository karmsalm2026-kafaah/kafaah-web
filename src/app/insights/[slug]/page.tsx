import { Metadata } from "next";
import { notFound } from "next/navigation";
import { insightsPage } from "@/lib/i18n";
import { slugify } from "@/lib/slugify";
import { ArticlePageClient } from "./ArticlePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render static pages for all semantic article slugs
export async function generateStaticParams() {
  return insightsPage.articles["en"].map((article) => ({
    slug: slugify(article.title),
  }));
}

// Generate meta data using the article title and excerpt for SEO compliance
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightsPage.articles["en"].find(
    (a) => slugify(a.title) === slug
  );
  if (!article) return {};

  return {
    title: `${article.title} — Kafaah Industrial Solutions`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Find matching article in the English catalog by slugifying titles
  const article = insightsPage.articles["en"].find(
    (a) => slugify(a.title) === slug
  );

  if (!article) {
    notFound();
  }

  return <ArticlePageClient articleId={article.id} />;
}
