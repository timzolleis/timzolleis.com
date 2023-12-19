import {Link} from "@remix-run/react";

const CommandWrapper = ({children}: { children: React.ReactNode }) => {
    return <div className={"grid w-full grid-cols-2"}>
        {children}
    </div>
}


export const About = () => {
    return <div>
        <p>Hi, I&apos;m Tim. I spend my time developing the web, studying computer science or just wandering around.</p>
        <div className={"grid-cols-2 mt-10"}>
            <CommandWrapper>
                <p className={"text-primary"}>Email</p>
                <Link target={"_blank"} className={"underline text-link"} to={'mailto:tim@zolleis.net'} rel="noreferrer">Email</Link>
            </CommandWrapper>
            <CommandWrapper>
                <p className={"text-primary"}>GitHub</p>
                <Link target={"_blank"} className={"underline text-link"}
                      to={'https://github.com/timzolleis'} rel="noreferrer">Github</Link>
            </CommandWrapper>
            <CommandWrapper>
                <p className={"text-primary"}>Twitter / X</p>
                <Link target={"_blank"} className={"underline text-link"}
                      to={'https://twitter.com/timzolleis'}>Twitter</Link>
            </CommandWrapper>
        </div>

    </div>


}