import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../../font/Pretendard-Light.subset.woff2",
      weight: "300",
    },
    {
      path: "../../font/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../../font/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../../font/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "../../font/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
    {
      path: "../../font/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
  ],
  display: "swap",
  variable: '--font-pretendard'
});
