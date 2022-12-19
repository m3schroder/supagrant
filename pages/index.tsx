import {useState} from 'react'
import ThemeToggler from "@/ui/ThemeToggler";
import Provider from "@/ui/Provider";
import {Combobox, Transition} from "@headlessui/react"
import Details from "@/ui/ProviderDetails";

const Home = () => {
    const [list, setList] = useState(["Aweber", "MailChimp"]);
    const [query, setQuery] = useState(undefined);
    const [selected, setSelected] = useState(undefined);

    const handle = {
        select: (name: any) => {
            setSelected(name)
        },
        setQ: (s: any) => {
            setQuery(s)
        }
    }
    return (
        <div className={'screen center flex-col'}>
            <section className={"flex-col center mb-12"}>
                <h3 className={'mb-5 text font-bold text-2xl font-mono'}>Configurations</h3>
                <input onChange={(event) => handle.setQ(event.target.value)}
                       className={"bg-white shadow-sm border-1 border-neutral-200 px-2  focus:outline-none focus:border-neutral-300 flex mb-1 flex-col py-1 rounded-lg  w-full gap-1"}/>
            </section>
            <div className={"grid grid-cols-3 grid-rows-auto gap-8"}>
                {list.filter(x => query === undefined ? true : x.includes(query)).map((provider, idx) => (
                    <Provider key={idx} provider={provider} onSelect={handle.select}/>
                ))}
                    <Details selected={selected} open={selected !== undefined} close={() => handle.select(undefined)}/>
            </div>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
    )
}
export default Home