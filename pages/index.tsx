import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Link from 'next/link'
import {useEffect, useState} from 'react';
import {TypeAnimation} from 'react-type-animation';
import {firstToUpper} from "@lib/stringUtils";
import ThemeToggler from "@ui/ThemeToggler";


const Home = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const sectionClass= 'min-h-full py-10 flex flex-col  justify-center px-5 py-8 rounded-md bg-white dark:bg-slate-900'

    return (
        <div className={'snap-y snap-always snap-mandatory mx-auto w-full flex flex-col gap-12 px-5 h-screen overflow-auto'}>
            <section className={sectionClass + " mt-8 snap-center"}>
            <TypeAnimation
                sequence={[
                    'News Guru', // Types 'One'
                    750,
                    "Your news Your way"
                ]}
                speed={99}
                wrapper="h1"
                cursor={true}
                repeat={0}
                className={"text text-6xl"}
            />
            <p className={"whitespace-pre-wrap text-3xl mt-12 font-semibold text"}>Tired of algorithms dictating what you see?
                {"\n\n"}
                Good us too.
            </p>
            <Link href={"/signin"}>
                <button className={"btn mt-20 px-6 py-3 rounded-lg text-2xl font-semibold"}>Own your Algorithm</button>
            </Link>
            </section>
            <section className={sectionClass + " mb-8 snap-center"}>
                <TypeAnimation
                    sequence={[
                        'News Guru', // Types 'One'
                        750,
                        "Your news Your way"
                    ]}
                    speed={99}
                    wrapper="h1"
                    cursor={true}
                    repeat={0}
                    className={"text text-6xl"}
                />
                <p className={"whitespace-pre-wrap text-3xl mt-12 font-semibold text"}>Tired of algorithms dictating what you see?
                    {"\n\n"}
                    Good us too.
                </p>
                <Link href={"/signin"}>
                    <button className={"btn mt-20 px-6 py-3 rounded-lg text-2xl font-semibold"}>Own your Algorithm</button>
                </Link>
            </section>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
)
}

export default Home