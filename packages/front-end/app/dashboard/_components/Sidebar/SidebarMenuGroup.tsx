import { ReactNode } from "react";
import { Paragraph } from "@/components/Text";
import { css, cx } from "@/styled-system/css";


interface PropType {
    className?: string;
    name?: string;
    children: ReactNode;
}

export default function SidebarMenuGroup({className, name, children}: PropType) {
    return (
        <div className={className}>
            {
                name === ""
                ?
                    undefined
                    :
                    <Paragraph variant="sub3" className={css({ margin: "0.3em 0" })}>
                        {name}
                    </Paragraph>
            }
            {children}
        </div>
    );
}
