import {useMemo} from 'react'
import {useTable} from 'react-table'
import ThemeToggler from "@ui/ThemeToggler.tsx";
import {Eye, Edit} from 'react-feather'

const Table = () => {

    const handle = {
        getAuthUrl: (provider: string, title: string = 'primary') => {
            const url = new URL("https://azmzvdpframywobqkjmz.functions.supabase.co/authorize");
            url.searchParams.append('integration', provider.toUpperCase());
            url.searchParams.append('title', title);
            return url.toString()
        }

    }
    const data = useMemo(
        () => [
            {
                provider: 'MailChimp',
                last: 'May 26, 2019',
                active: "False",
                items: [<h3>Eye</h3>, <h3>Pencil</h3>]
            },
            {
                provider: 'Aweber',
                last: 'May 26, 2019',
                active: "False",
                items: [<h3>Eye</h3>, <h3>Pencil</h3>]
            },
        ],
        []
    )
    const columns = useMemo(
        () => [
            {
                Header: 'Provider',
                accessor: 'provider',
            },
            {
                Header: 'Last Updated',
                accessor: 'last',
            },
            {
                Header: 'Active',
                accessor: 'active',
                Cell: ({cell: {value}}) => {
                    return (
                        <span
                            className={`text  w-5 h-5 rounded-full flex justify-between gap-5 ${value === "True" ? "bg-emerald-400" : "bg-red-400"}`}/>
                    )
                }
            },
            {
                width: 300,
                Header: "Actions",
                Cell: ({cell}) => {
                    const cx = 'dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-lg inline-block p-2 h-10 w-10'
                    return (
                        cell.active ? (
                            <div className={'text flex justify-between gap-5'}>
                                <Eye className={cx}/>
                                <Edit className={cx}/>
                            </div>
                        ) : (
                            <a href={handle.getAuthUrl(cell.row.cells[0].value)} _target="blank"
                               className={'text dark:bg-emerald-600 bg-accent px-4 py-[2px] rounded-full flex justify-between gap-5'}>
                                Connect
                            </a>
                        )
                    )
                }
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});
    return (
        <div className={'screen center flex-col'}>
            <h3 className={'mb-12 text font-bold text-2xl font-mono'}>Configuration List</h3>
            <section
                className={"border-1 border-neutral-200 dark:bg-neutral-900 bg-white rounded-lg shadow-lg w-fit h-fit overflow-clip py-8"}>
                <table {...getTableProps()} className={"bg-white dark:bg-neutral-900"}>
                    <thead className={'pb-10'}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}
                            className={'border-neutral-900 dark:text-neutral-400'}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className={'dark:text-neutral-50 h-fit px-9 py-5'}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </section>
            <ThemeToggler cx={"fixed bottom-5 right-5"}/>
        </div>
    )
}
export default Table