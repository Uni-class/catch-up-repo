import localFont from "next/font/local";

const dirPrefix = "../../font/"
export const pretendard = localFont({
  src: [
    {
      path: dirPrefix + "font/Pretendard-Light.subset.woff2",
      weight: "300",
    },
    {
      path: dirPrefix + "Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: dirPrefix + "Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: dirPrefix + "Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: dirPrefix + "Pretendard-Bold.subset.woff2",
      weight: "700",
    },
    {
      path: dirPrefix + "Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
  ],
  display: "swap",
});
