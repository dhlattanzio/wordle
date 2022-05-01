import { SunIcon, MoonIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/solid';
import { lang } from '../data/strings';

export default function Navbar(props) {
    return (
        <div className="relative flex justify-center mb-2 p-3 border-b border-zinc-300 dark:border-zinc-700">
            <button onClick={props.onButtonRulesClick}><BookOpenIcon className='h-7 w-7 ml-4 hover:text-zinc-400' /></button>
            <div className='flex-1'></div>
            <div className='absolute top-2 text-center'>
                <span className="text-3xl font-bold hover:text-zinc-400 cursor-pointer select-none">{lang.title}</span>
            </div>
            <button onClick={props.onButtonThemeClick}>
                {props.darkMode
                    ? <SunIcon className='h-7 w-7 ml-4 hover:text-zinc-400' />
                    : <MoonIcon className='h-7 w-7 ml-4 hover:text-zinc-400' />}
            </button>
            <button onClick={props.onButtonStatsClick}>{<ChartBarIcon className='h-7 w-7 ml-4 hover:text-zinc-400' />}</button>
        </div>
    );
}