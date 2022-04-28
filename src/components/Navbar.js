import { SunIcon, MoonIcon, BookOpenIcon } from '@heroicons/react/solid';
import { useState } from 'react';

export default function Navbar(props) {
    const [darkMode, setDarkMode] = useState(Boolean(localStorage.getItem("darkMode")) || false);

    const toggleTheme = () => {
        localStorage.setItem("darkMode", !darkMode);
        setDarkMode(!darkMode);
        document.querySelector("html").classList.toggle("dark");
    }

    return (
        <div className="flex justify-center p-3 border-b mb-2 dark:border-zinc-700">
            <button onClick={props.onButtonRulesClick}><BookOpenIcon className='h-7 w-7 ml-4 hover:text-zinc-400' /></button>
            <div className='flex-1 text-center'><a href='/' className="text-3xl font-bold hover:text-zinc-400">WORDLE</a></div>
            <button onClick={toggleTheme}>
                {darkMode
                    ? <SunIcon className='h-7 w-7 ml-4 hover:text-zinc-400' />
                    : <MoonIcon className='h-7 w-7 ml-4 hover:text-zinc-400' />}
            </button>
        </div>
    );
}