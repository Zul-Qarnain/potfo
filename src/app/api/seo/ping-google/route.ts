import { NextResponse } from 'next/server';

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shihab.vercel.app/';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  try {
    // Ping Google Search Console
    const googleResponse = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      { method: 'GET' }
    );

    // Ping Bing Webmaster Tools
    const bingResponse = await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      { method: 'GET' }
    );

    return NextResponse.json({
      success: true,
      message: 'Sitemap submitted to search engines',
      google: googleResponse.ok,
      bing: bingResponse.ok,
    });
  } catch (error) {
    console.error('Error pinging search engines:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to ping search engines',
    }, { status: 500 });
  }
}