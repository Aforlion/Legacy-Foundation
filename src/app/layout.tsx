import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sirjohnndukwelegacyfoundation.org'),
  title: {
    default: 'Sir John Ndukwe Legacy Foundation | Equity. Dignity. Humanity.',
    template: '%s | Sir John Ndukwe Legacy Foundation',
  },
  description:
    'A humanitarian and development-oriented NGO dedicated to advancing social justice, human dignity, and inclusive development in Nigeria and beyond.',
  keywords: [
    'NGO Nigeria',
    'humanitarian aid Abuja',
    'poverty alleviation',
    'women empowerment',
    'early childhood development',
    'volunteer Nigeria',
    'Sir John Ndukwe Legacy Foundation',
  ],
  authors: [{ name: 'Sir John Ndukwe Legacy Foundation' }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://www.sirjohnndukwelegacyfoundation.org',
    siteName: 'Sir John Ndukwe Legacy Foundation',
    title: 'Sir John Ndukwe Legacy Foundation | Equity. Dignity. Humanity.',
    description:
      'Dedicated to advancing social justice, human dignity, and inclusive development through humanitarian assistance, poverty alleviation, and community empowerment.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sir John Ndukwe Legacy Foundation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Sirjohnndukwe',
    creator: '@Sirjohnndukwe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// JSON-LD structured data for the NGO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Sir John Ndukwe Legacy Foundation',
  alternateName: 'SJN-LF',
  url: 'https://www.sirjohnndukwelegacyfoundation.org',
  logo: 'https://www.sirjohnndukwelegacyfoundation.org/logo.png',
  description:
    'A humanitarian and development-oriented organization dedicated to advancing social justice, human dignity, and inclusive development.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 87 Valington Royal Estate Jikwoyi',
    addressLocality: 'FCT, Abuja',
    addressCountry: 'NG',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+234-806-516-6127',
      contactType: 'customer service',
    },
  ],
  sameAs: [
    'https://www.facebook.com/Sir John Ndukwe Legacy Foundation',
    'https://www.instagram.com/sirjohnndukwelegacyfoundation',
    'https://twitter.com/Sirjohnndukwe',
    'https://www.youtube.com/@SirJohnNdukweLegacyFoundation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
