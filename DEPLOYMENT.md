# Environment Variables Setup for Vercel Deployment

## Required Environment Variables

Add these in your Vercel project settings:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Optional (if using Sanity Studio)

```bash
SANITY_API_TOKEN=your-token-here
```

## Getting Your Sanity Credentials

1. Go to https://www.sanity.io/manage
2. Select your project
3. Copy the Project ID from Settings → API
4. For the dataset, use "production" (default)

## Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Post-Deployment

Don't forget to update:

- `robots.txt` with your actual domain
- `app/layout.tsx` NEXT_PUBLIC_SITE_URL references
- Social media OG image paths
