import "@glideapps/glide-data-grid/dist/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { ReactElement, ReactNode } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Loading } from "@/components";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/util/themes";
import { SnackbarProvider, useSnackbar } from "notistack";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const DashboardLayout = dynamic(
  () => import("../components/layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: true,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <SessionProvider session={session}>
      <ThemeProvider theme={lightTheme}>
        <SnackbarProvider>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
