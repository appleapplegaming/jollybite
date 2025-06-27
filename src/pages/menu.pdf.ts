import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const GET: APIRoute = async ({ request }) => {
  try {
    // In development, try to serve from public directory
    if (import.meta.env.DEV) {
      try {
        // Try to read from public/menu.pdf
        const filePath = join(process.cwd(), 'public', 'menu.pdf');
        const pdfBuffer = await readFile(filePath);
        
        return new Response(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=menu.pdf',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      } catch (fileError) {
        // File doesn't exist in public directory
        return new Response(
          'Menu PDF not found. Please add menu.pdf to your public/ directory for development, or it will be served from Cloudflare R2 in production.', 
          {
            status: 404,
            headers: {
              'Content-Type': 'text/plain'
            }
          }
        );
      }
    }
    
    // In production, this won't be reached as the worker handles it directly
    return new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('Error serving menu PDF:', error);
    return new Response('Error serving menu PDF', { status: 500 });
  }
};
