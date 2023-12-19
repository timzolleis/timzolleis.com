type Command = {
    name: string;
    description: string;
    link?: string;
}

export const commands: Command[] = [
    {
        name: "about",
        description: "Learn more about me.",
    }, {
        name: "projects",
        description: "View a list of my projects!",
    }
]