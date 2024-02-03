import tailwindConfig from "@/tailwind.config";
import type { ThemeConfig } from "antd";

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;

export const theme: ThemeConfig = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorInfo: PRIMARY_COLOR,
    colorLink: PRIMARY_COLOR,
    colorLinkHover: PRIMARY_COLOR,
    colorLinkActive: PRIMARY_COLOR,
  },
};
