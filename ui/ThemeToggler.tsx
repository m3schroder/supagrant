import {useContext} from 'react';
import {ThemeProvider, ThemeContext} from "@lib/themeContext";
import {Moon, Sun} from "react-feather"

const ThemeToggler = ({cx}:any) => {
    const {theme, toggleTheme} = useContext(ThemeContext)
    return (
        <button className={cx + " text-slate-900 dark:text-white dark:bg-slate-900 bg-white p-2 rounded-md"} onClick={toggleTheme}>
            {
                theme === 'dark' ?
                    <Sun className={''}/>
                    :
                    <Moon className={''}/>
            }
        </button>
    )
}
export default ThemeToggler