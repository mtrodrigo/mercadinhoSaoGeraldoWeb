import type { PropsWithChildren } from "react";

const LoginRegisterContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <section className="mx-3 flex max-w-2xl flex-col items-center justify-center rounded-3xl border border-green-100 bg-white px-8 py-12 shadow-sm">
      {children}
    </section>
  );
};

export default LoginRegisterContainer;
