'use client';
import { Sun, Moon } from "lucide-react";
import {useState, useEffect} from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch()
{
    const [mounted, setMounted] = useState(false);
    const {setTheme, resolvedTheme} = useTheme();

    useEffect(()=>{
        setMounted(true);
    }, []);

    console.log(`Value of resolved theme: ${resolvedTheme}`);

    if (!mounted)
    {
        return (<h1>Loading theme..</h1>)
    }
    if (resolvedTheme === 'light')
    {
        return <Sun color='#3e9392' onClick={()=>setTheme('dark')}/>
    }

    if (resolvedTheme === 'dark')
    {
        return (
            <Moon color='#3e9392' onClick={()=>{return setTheme('light')}}/>
        )
    }

}