import type { PropsWithChildren } from "react"

export const MainContainer = ({children}: PropsWithChildren<{}>) => {
    return(
        <main className="max-w-6xl flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </main>
    )
}