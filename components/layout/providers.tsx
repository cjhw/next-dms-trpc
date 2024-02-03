"use client";

import { API_ENDPOINT } from "@/constants/api";
import { theme } from "@/constants/theme";
import { trpc } from "@/libs/trpc";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, httpLink } from "@trpc/client";
import { App, ConfigProvider, message } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [msg, msgContext] = message.useMessage();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            retryDelay: (_, err) => {
              if (err instanceof TRPCClientError) {
                const content = JSON.parse(err.message)?.[0];
                msg.error(`${content.code}: ${content.message}`, 4.5);
              }
              return 0;
            },
          },
        },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: API_ENDPOINT,
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            locale={zhTW}
            theme={theme}
            autoInsertSpaceInButton={false}
          >
            <StyleProvider hashPriority="high">
              <App>
                {msgContext}
                {children}
              </App>
            </StyleProvider>
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
