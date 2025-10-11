import type { PropsWithChildren } from "react"

export const LayoutContainer = ({children}: PropsWithChildren<{}>) => {
    return(
        <main className="min-w-full min-h-screen flex flex-col items-center justify-between mx-auto">
            {children}
        </main>
    )
}