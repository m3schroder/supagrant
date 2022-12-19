import {useState, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {X, Loader as Load} from "react-feather"

const Details = ({selected, open, close}) => {
    const [loading, setLoading] = useState(false)
    const startAuth = async (provider: string, title: string = 'primary') => {
        const url = new URL("https://azmzvdpframywobqkjmz.functions.supabase.co/authorize");
        url.searchParams.append('integration', provider.toUpperCase());
        url.searchParams.append('title', title);
        await fetch(url).then(async res => {
            let result = await res.json()
            router.push(result.redirectUrl)
        })
    }
    const testConnection = async (e: any) => {
        setLoading(true)
        await startAuth(selected).then(() => {
            setLoading(false)
        })
        e.preventDefault()
    }

    return (
        <Dialog open={open} onClose={() => close(false)}>
            <div className={"fixed top-0 backdrop-blur-sm w-screen h-screen flex justify-center"}>
                <Dialog.Panel>
                    <Transition
                        appear={true}
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        as={Fragment}
                    >
                        <div
                            className={"bg-white shadow-lg relative px-8 py-5 rounded-md border-1 mt-60 border-neutral-200"}>
                            <X className={'-top-2 bg-neutral-200 dark:text-neutral-800 text rounded-full -right-2 absolute p-1 cursor-pointer hover:bg-neutral-300'}
                               onClick={() => close(undefined)}/>

                            <Dialog.Title className={"text text-2xl mb-2"}>{selected}</Dialog.Title>
                            <Dialog.Description>
                                Configurations for the {selected} Provider
                            </Dialog.Description>
                            <form className={"flex flex-col gap-4 py-8"} onSubmit={async (e) => testConnection()}>
                                <input placeholder={'Client ID'}
                                       className={"bg-white shadow-sm border-1 border-neutral-200 px-2  focus:outline-none focus:border-neutral-300 flex mb-1 flex-col py-1 rounded-lg  w-full gap-1"}/>
                                <input placeholder={'Client Secret'}
                                       className={"bg-white shadow-sm border-1 border-neutral-200 px-2  focus:outline-none focus:border-neutral-300 flex mb-1 flex-col py-1 rounded-lg  w-full gap-1"}/>
                                <input placeholder={'Redirect'}
                                       className={"bg-white shadow-sm border-1 border-neutral-200 px-2  focus:outline-none focus:border-neutral-300 flex mb-1 flex-col py-1 rounded-lg  w-full gap-1"}/>
                                <button type={'submit'} className={"py-2 text-white rounded-md bg-neutral-800 center"}>
                                    {loading ?
                                        <Load className={'animate-spin text-white'}/> :
                                        "Test Connection"
                                    }
                                </button>
                            </form>

                        </div>
                    </Transition>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
export default Details
