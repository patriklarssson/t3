import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superJson from 'superJson';
import { AppRouter } from '../server/route/app.router';
import { url } from '../constants';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to trpc-tutorial!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

// TODO add appRouter as generic
export default withTRPC<AppRouter>({
  config({ ctx }) {

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) return { ...ctx.req.headers, 'x-ssr': 1 };
        return {};
      },
      links,
      transformer: superJson,
    };
  },
  // TODO toggle serversiderendering
  ssr: false,
})(CustomApp);
