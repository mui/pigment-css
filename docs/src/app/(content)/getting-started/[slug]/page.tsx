import * as React from 'react';
import { notFound } from 'next/navigation';
import { getSlugs } from '@data/pages';
import { Metadata } from 'next';
import { getMarkdownPage, getMarkdownPageMetadata } from '@data/getMarkdownPage';
import { TableOfContents } from '@/components/TableOfContents';
import { Description } from '@/components/mdx/Description';
import { components } from '@/components/mdx/MDXComponents';
import { MainContent } from '@/components/MainContent';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEGMENT = 'getting-started';

export default async function GettingStartedPage(props: Props) {
  const { slug } = await props.params;
  try {
    const { MDXContent, metadata, tableOfContents } = await getMarkdownPage(SEGMENT, slug);
    const allComponents = {
      ...components,
      Description: () => <Description className="description" text={metadata.description} />,
      Demo: () => null,
    };

    return (
      <React.Fragment>
        <MainContent as="main">
          <MDXContent components={allComponents} />
          {/* <div>
            <div
              sx={{
                padding: 'var(--space-9) 0',
              }}
            >
              <EditPageOnGithub category={SEGMENT} slug={slug} />
            </div>
            <div>
              <SiblingPageLinks currentSlug={`/${SEGMENT}/${slug}`} pages={routes} />
            </div>
          </div> */}
        </MainContent>

        <TableOfContents toc={tableOfContents} />
      </React.Fragment>
    );
  } catch (ex) {
    if ((ex as Error).message === '404') {
      return notFound();
    }
    throw ex;
  }
}

export function generateStaticParams() {
  return getSlugs(`/${SEGMENT}`).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { title = 'Getting started', description } = await getMarkdownPageMetadata(SEGMENT, slug);

  return {
    title: {
      absolute: title,
      template: '%s | Pigment CSS',
    },
    description,
    twitter: {
      title,
      description,
    },
    openGraph: {
      title,
      description,
    },
  };
}
