import {commands} from "~/constants/commands";
import {ExecutedCommand} from "~/components/terminal";
import {About} from "~/components/commands/about";

const handleFunctions = {
    "help": () => {
        return <div>
            {commands.map((command) => (
                <div key={command.name} className={"grid grid-cols-2"}>
                    <p className={"text-left text-primary"}>{command.name}</p>
                    <span>
                        <p className={"text-left"}>{command.description}</p>
                   </span>

                </div>
            ))}
        </div>
    },
    "about": () => {
        return <About/>
    }
}
const notFound = () => {
    return <div>
        <p>COMMAND NOT FOUND</p>
        <span>Type <span className={"text-primary"}>help</span> for usage</span>
    </div>
}


export function handleCommand(command: string) {
    const handleFunction = handleFunctions?.[command as keyof typeof handleFunctions];
    if (handleFunction === undefined) {
        return <div className={"space-y-2"}>
            <ExecutedCommand command={command}/>
            <div className={"grid gap-2 text-left px-20 py-6 w-full"}>
                {notFound()}
            </div>
        </div>
    }
    return <div className={"space-y-2"}>
        <ExecutedCommand command={command}/>
        <div className={"grid gap-2 text-left px-20 py-6 w-full max-w-3xl"}>
            {handleFunction()}
        </div>
    </div>
}