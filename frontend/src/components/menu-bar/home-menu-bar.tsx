import {MenuBar} from "@/components/menu-bar/menu-bar";
import {SendFileModal} from "@/components";

interface Props {
    dict: {
        upload: string;
        title: string;
        description: string;
        language: string;
        rights: string;
    }
}
function HomeMenuBar(props: Props) {
    return (
        <>
            <MenuBar>
                <SendFileModal dict={props.dict}/>
            </MenuBar>
        </>
    );
}

export {HomeMenuBar};