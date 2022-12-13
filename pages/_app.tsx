import {createContext, useContext, useEffect, useState} from 'react'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, Session} from '@supabase/auth-helpers-react'
import {AppProps} from 'next/app'
import {ThemeProvider, ThemeContext} from "@lib/themeContext";
import "@styles/globals.css"

function App({
                 Component,
                 pageProps,
             }: AppProps<{
    initialSession: Session,
}>) {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    const {theme,toggleTheme} = useContext(ThemeContext)

    return (
        <div className={"dark:bg-neutral-900 bg-white transition-colors duration-100 overflow-hidden"}>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionContextProvider>
        </div>
    )
}

export default App
