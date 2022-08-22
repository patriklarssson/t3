export const url = process.env.NEXT_PUBLIC_VERCEL_URL
? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
: 'http://localhost:4200/api/trpc';