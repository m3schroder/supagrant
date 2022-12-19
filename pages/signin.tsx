import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import ThemeToggler from '@/ui/ThemeToggler';
import Link from 'next/link';
import {ArrowLeft} from "react-feather"

const Home = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div className="center flex-col h-screen">
            <div className={'w-fit flex flex-col gap-5'}>
                <Link className={'mt-10 mr-auto'} href={"/"}><ArrowLeft className={'text text-xl'}/></Link>
                {!session ? (
                    <div className={"px-10 py-4 border-1 border-neutral-200 dark:border-0 dark:bg-neutral-900 bg-white rounded-lg shadow-lg"}>
                        <Auth supabaseClient={supabase} appearance={{
                            theme: ThemeSupa, className: {
                                input: "!text !rounded-lg",
                                button:"!rounded-lg",
                                anchor: "!text-accent font-semibold"
                            }
                        }}/>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
    )
}


export default Home