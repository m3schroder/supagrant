import {useMemo} from 'react'
import {useTable} from 'react-table'
import ThemeToggler from "@ui/ThemeToggler.tsx";
import {Eye, Edit} from 'react-feather'

const Table = () => {

    const data = useMemo(
        () => [
            {
                title: 'Acme Corp',
                service: 'Mail Chimp',
                last: 'May 26, 2019',
                active: "False",
                items: [<h3>Eye</h3>, <h3>Pencil</h3>]
            },
            {
                title: 'Acme Corp',
                service: 'Mail Chimp',
                last: 'May 26, 2019',
                active: "False",
                items: [<h3>Eye</h3>, <h3>Pencil</h3>]
            },
            {
                title: 'Acme Corp',
                service: 'Mail Chimp',
                last: 'May 26, 2019',
                active: "True",
                items: [<h3>Eye</h3>, <h3>Pencil</h3>]
            },
            {
                title: 'Acme Corp',
                service: 'Mail Chimp',
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
                Header: 'Title',
                accessor: 'title', // accessor is the "key" in the data
            },
            {
                Header: 'Service',
                accessor: 'service',
            },
            {
                Header: 'Last Updated',
                accessor: 'last',
            },
            {
                Header: 'Active',
                accessor: 'active',
                Cell: ({cell: {value}}) => {
                    const cx = 'dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-lg inline-block p-2 h-10 w-10'
                    return (
                        <span className={'text bg-accent px-4 py-[2px] rounded-full flex justify-between gap-5'}>
                            {value}
                        </span>
                    )
                }
            },
            {
                width: 300,
                Header: "Actions",
                Cell: ({cell}) => {
                    const cx = 'dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-lg inline-block p-2 h-10 w-10'
                    return (
                        <div className={'text flex justify-between gap-5'}>
                            <Eye className={cx}/>
                            <Edit className={cx}/>
                        </div>
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
                <table {...getTableProps()} class={"bg-white dark:bg-neutral-900"}>
                    <thead className={'pb-10'}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={'border-neutral-900 dark:text-neutral-400'}>
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
                                            class={'dark:text-neutral-50 h-fit px-9 py-5'}
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