import type { PropsWithChildren } from "react";

const LoginRegisterContainer = ({children}: PropsWithChildren<{}>) => {
    return(
        <section className="flex flex-col justify-center items-center max-w-2xl mx-3 bg-amber-50 px-3 py-10 rounded-md shadow-md">
            {children}
        </section>
    )
}

export default LoginRegisterContainer;