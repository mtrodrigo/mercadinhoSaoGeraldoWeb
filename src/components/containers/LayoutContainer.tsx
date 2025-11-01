import type { PropsWithChildren } from "react";

export const LayoutContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center bg-white">
      {children}
    </main>
  );
};
