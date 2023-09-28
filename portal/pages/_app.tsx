import "@/styles/globals.css";
import "@glideapps/glide-data-grid/dist/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "driver.js/dist/driver.css";
import 'react-day-picker/dist/style.css';
import type { AppProps } from "next/app";
import type { NextPage, Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { lightTheme } from "@/util/themes";
import NProgress from "nprogress";
import Router from "next/router";
import { SnackbarProvider, useSnackbar } from "notistack";
import dynamic from "next/dynamic";
import { Loading } from "@/components";
import { Provider } from "react-redux";
import { store } from "@/store";
import OnBoardingProvider from "@/providers/OnBoarding";
import siteMetadata from "@/data/siteMetadata";
import { Inter,  } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const DashboardLayout = dynamic(
  () => import("../layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: true,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.image],
    locale: 'en_US',
    type: 'website',
  },
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => <DashboardLayout>{page}</DashboardLayout>);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={lightTheme}>
          {/* <OnBoardingProvider> */}
            <SnackbarProvider
               anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <main className={`${inter.className}`}>
                {getLayout(<Component {...pageProps} />)}
              </main>
            </SnackbarProvider>
          {/* </OnBoardingProvider> */}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
