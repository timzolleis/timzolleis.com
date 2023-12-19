import type {MetaFunction} from "@remix-run/node";
import {Terminal, TerminalInput} from "~/components/terminal";
import {handleCommand} from "~/utils/command-handler";
import {ReactNode, useLayoutEffect, useRef, useState} from "react";
import {redirectTo} from "~/utils/redirectTo";
import {linkHandler} from "~/utils/redirect-handler";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    const [commandElements, setCommandElements] = useState<ReactNode[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const switchCommand = (command: string) => {
        setCommandHistory([...commandHistory, command]);
        switch (command) {
            case "clear": {
                setCommandElements([]);
                break;
            }
            case "github": {
                return linkHandler.GITHUB();
            }
            case "twitter": {
                return linkHandler.TWITTER();
            }
            default: {
                setCommandElements([...commandElements, handleCommand(command)]);
                break;
            }
        }
    }
    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }
    useLayoutEffect(() => {
        scrollToBottom();
    }, [commandElements]);


    return (
        <Terminal>
            <div>
                {commandElements.map((element, index) => (
                    <div key={index}>
                        {element}
                    </div>
                ))}
            </div>
            <TerminalInput commandHistory={commandHistory} onSubmit={command => switchCommand(command)}/>
        </Terminal>
    );
}
