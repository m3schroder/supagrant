import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from "@ui/Account";
import ThemeToggler from '@ui/ThemeToggler';
import Link from 'next/link';
import {ArrowLeft} from "react-feather"

const Home = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div className="center h-screen">
            <div className={'w-fit flex flex-col gap-5'}>
            <Link className={'mt-10'} href={"/"}><ArrowLeft className={'text text-xl'}/></Link>
            {!session ? (
                <div className={"px-10 py-5 transition-all dark:bg-slate-900 bg-white rounded-md drop-shadow-2xl"}>
                <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa, className:{
                    button: "!btn dark:!bg-white !bg-slate-900 !border-none",
                        input: "!text"
                    }}} />
                </div>
            ) : (
                <Account session={session}/>
            )}
            </div>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
    )
}


export default Home