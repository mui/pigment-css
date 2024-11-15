import * as React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import routes, { getSlugs } from '@data/pages';
import { EditPageOnGithub } from '@/components/EditPageOnGithub';
import { SiblingPageLinks } from '@/components/SiblingPageLinks';
import { TableOfContents } from '@/components/TableOfContents';
import { Description } from '@/components/mdx/Description';
import { components } from '@/components/mdx/MDXComponents';
import { MainContentContainer, MainContent } from '@/components/MainContent';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEGMENT = 'getting-started';

export default async function GettingStartedPage(props: Props) {
  const { slug } = await props.params;
  const { getMarkdownPage } = await import('@/utils/getMarkdownPage');
  try {
    const { isMd, MDXContent, metadata, tableOfContents } = await getMarkdownPage(SEGMENT, slug);
    const allComponents = {
      ...components,
      Description: () => <Description className="description" text={metadata.description} />,
      Demo: () => null,
    };

    return (
      <React.Fragment>
        <MainContentContainer as="main">
          <MainContent>
            <MDXContent components={allComponents} />
          </MainContent>
          <footer
            sx={{
              padding: 'var(--space-9) 0',
            }}
          >
            <div>
              <EditPageOnGithub category={SEGMENT} slug={slug} isMd={isMd} />
            </div>
            <hr
              sx={{
                margin: 'var(--space-4) 0',
                borderWidth: '0 0 thin',
                borderStyle: 'solid',
                borderColor: 'var(--gray-outline-1)',
              }}
            />
            <div>
              <SiblingPageLinks currentSlug={`/${SEGMENT}/${slug}`} pages={routes} />
            </div>
          </footer>
        </MainContentContainer>
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
  const { getMarkdownPageMetadata } = await import('@/utils/getMarkdownPage');
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
