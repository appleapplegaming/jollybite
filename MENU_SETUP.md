# Menu PDF Setup Instructions

## For Development (localhost)

1. Place your menu PDF file in the `public/` directory as `menu.pdf`
2. The download button will serve this file during development

## For Production (Cloudflare Workers)

1. Upload your menu PDF to your Cloudflare R2 bucket named "jollybite"
2. The file should be named `menu.pdf` in the bucket root
3. The download button will automatically serve from R2 when deployed

## How to upload to R2 bucket

### Option 1: Using Wrangler CLI

```bash
# Upload the file to your R2 bucket
npx wrangler r2 object put jollybite/menu.pdf --file=./public/menu.pdf --remote
```

### Option 2: Using Cloudflare Dashboard

1. Go to Cloudflare Dashboard > R2 Object Storage
2. Select your "jollybite" bucket
3. Upload `menu.pdf` to the root of the bucket

## How it works

- **Development**: Serves from `public/menu.pdf`
- **Production**: Serves from R2 bucket via the Hono API endpoint `/menu.pdf`
- The download button on your homepage will work in both environments
