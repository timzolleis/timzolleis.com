import {ReactNode, useEffect, useLayoutEffect, useRef, useState} from "react";


export const Terminal = ({children}: { children: ReactNode }) => {
    return (
        <div className={"p-3 min-h-screen inset-0 text-sm"}>
            <main className={"rounded-lg border h-full p-3"}>
                <div className={"flex items-center gap-2"}>
                    <div className={"w-3 h-3 rounded-full bg-red-500"}/>
                    <div className={"w-3 h-3 rounded-full bg-yellow-500"}/>
                    <div className={"w-3 h-3 rounded-full bg-green-500"}/>
                </div>
                <div className={"p-4 h-full"}>
                    {children}
                </div>
            </main>
        </div>
    )
}

type TerminalInputProps = {
    onSubmit: (command: string) => void
    disabled?: boolean
    defaultValue?: string
    commandHistory?: string[]
}

export const TerminalInput = ({onSubmit, disabled, defaultValue, commandHistory}: TerminalInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const backIndexRef = useRef<number>(0);
    useEffect(() => {
        window.addEventListener("mousedown", () => {
            inputRef.current?.focus();
        })
    }, []);

    return <div className={"flex items-center gap-2"}>
        <div className={"flex items-center"}>
            <span className={"text-primary"}>guest</span>
            <span>@</span>
            <span className={"text-secondary"}>timzolleis.com</span>
            <span className={"tracking-wider"}>:$~</span>
        </div>
        <input ref={inputRef} disabled={disabled} defaultValue={defaultValue} onKeyDown={(event) => {
            if (event.key === "Enter") {
                backIndexRef.current = 0;
                onSubmit(event.currentTarget.value);
                event.currentTarget.value = "";
            }
            if (inputRef.current && commandHistory && event.key === "ArrowUp") {
                event.preventDefault();
                if (backIndexRef.current < commandHistory?.length) {
                    backIndexRef.current = backIndexRef.current + 1;
                }
                const value = commandHistory[commandHistory.length - backIndexRef.current];
                value && (inputRef.current.value = value);
            }
            if (inputRef.current && commandHistory && event.key === "ArrowDown") {
                event.preventDefault();
                if (backIndexRef.current > 0) {
                    backIndexRef.current = backIndexRef.current - 1;
                }
                const value = commandHistory[commandHistory.length - backIndexRef.current];
                value && (inputRef.current.value = value);
            }
            if (inputRef.current && event.ctrlKey && event.key === "c") {
                event.preventDefault();
                inputRef.current.value = "";
            }
        }} spellCheck={false} autoComplete={"off"}
               className={"bg-transparent focus:border-none focus:outline-none w-full text-command caret-foreground"}/>
    </div>
}


export const ExecutedCommand = ({command}: { command: string }) => {
    return <TerminalInput onSubmit={() => void (0)} disabled={true} defaultValue={command}/>
}