"use client";

import { ReactNode, useEffect } from "react";
import { css } from "@/styled-system/css";
import Sidebar from "@/app/(sidebar-pages)/_components/Sidebar";
import Header from "./_components/Header";
import NavTitle from "./_components/NavTitle";
import { useAccountController } from "@/hook/useAccount";
import { useRouter } from "@/hook/useRouter";
import PlaceholderLayout from "@/components/Placeholder/PlaceholderLayout";
import Placeholder from "@/components/Placeholder/Placeholder";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const controller = useAccountController();
  const router = useRouter();

  useEffect(() => {
    if (controller.isError) {
      const prevURL = `${router.pathname}?${router.query.toString()}`;
      const storage = window.sessionStorage;
      storage.setItem("prevURL", prevURL);
      router.push("/login");
    }
  }, [controller.isError, router]);

  if (controller.isLoading) {
    return (
      <div
        className={css({
          display: "flex",
          width: "100%",
          height: "100%",
        })}
      >
        <PlaceholderLayout type={"horizontal"} gap={0} alignItems={"center"}>
          <Sidebar />
          <PlaceholderLayout type={"vertical"} gap={0} alignItems={"center"}>
            <Header />
            <PlaceholderLayout
              type={"vertical"}
              padding={"2em"}
              gap={"1em"}
              alignItems={"flex-start"}
            >
              <Placeholder
                type={"text"}
                width={"10em"}
                height={"1.5em"}
                lineHeight={"1.5em"}
              />
              <Placeholder width={"100%"} height={"100%"} />
            </PlaceholderLayout>
          </PlaceholderLayout>
        </PlaceholderLayout>
      </div>
    );
  }

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: "100%",
      })}
    >
      <Sidebar />
      <div
        className={css({
          width: "100%",
          bg: "grey.50",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Header />
        <div
          className={css({
            padding: "0 2.625rem 3.96rem 2.625rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "scroll",
          })}
        >
          <NavTitle />
          <main
            className={css({
              bg: "#fff",
              borderRadius: "0.5rem",
              flex: 1,
              overflowY: "scroll",
              padding: "1.208rem 1.6875rem 1.41rem 1.6875rem",
            })}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
// 29 40.5 34 40.5
// 1.208 1.6875 1.41 1.6875
