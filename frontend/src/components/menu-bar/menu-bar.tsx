import {CSSProperties, HTMLProps} from "react";

type Props = HTMLProps<HTMLDivElement>

const MenubarStyle: CSSProperties = {
    display: "inline-flex",
    justifyContent: "end"
}
function MenuBar(props: Props) {
    return (<div style={MenubarStyle}>{props.children}</div>)
}

export { MenuBar };