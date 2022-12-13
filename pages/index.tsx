import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Link from 'next/link'
import {useEffect, useState} from 'react';
import {TypeAnimation} from 'react-type-animation';
import {firstToUpper} from "@lib/stringUtils";
import ThemeToggler from "@ui/ThemeToggler";
import Image from "next/image"


const Home = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const sectionClass= 'min-h-full py-10 flex flex-col  justify-center mx-auto w-full  xl:w-full px-5 py-8 rounded-md snap-center'

    return (
        <div className={'snap-y w-full snap-always snap-mandatory flex flex-col gap-12 px-5 h-screen overflow-auto'}>
            <section className={'full center h-screen  flex-col'}>
                <h3 className={'text-emerald-600 text-5xl'}>Supabase Newsletter</h3>
                <Link href={"/signin"}>
                    <button className={"btn mt-20 px-6 py-3 rounded-lg text-2xl font-semibold"}>Signin</button>
                </Link>
                <Link href={"/table"}>
                    <button className={"btn mt-20 px-6 py-3 rounded-lg text-2xl font-semibold"}>Configurations</button>
                </Link>
            </section>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
)
}

export default Home