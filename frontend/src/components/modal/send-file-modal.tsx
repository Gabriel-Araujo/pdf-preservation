"use client"
import styles from "./modal.module.css"
import {Modal} from "./modal";
import {Button, Input} from "@/components";
import {ChangeEvent, useCallback, useState} from "react";
import {upload} from "@/app/lib/endpoints/files";

const upload_icon =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-up"
         viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
        <path
            d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
    </svg>

interface Props {
    dict: {
        upload: string;
        title: string;
        description: string;
        language: string;
        rights: string;
    }
}

type inputType = "title" | "description" | "language" | "rights";

function SendFileModal(props: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [rights, setRights] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>, inputType: inputType) => {
        e.preventDefault();

        console.log(e.currentTarget.value);
        switch (inputType) {
            case "title":
                setTitle(e.currentTarget.value);
                break;
            case "description":
                setDescription(e.currentTarget.value);
                break;
            case "language":
                setLanguage(e.currentTarget.value);
                break
            case "rights":
                setRights(e.currentTarget.value);
                break;
        }
    }, []);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement)?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    }, [])

    const onSend = useCallback(() => {
        if (title.length === 0 || description.length === 0 || language.length === 0 || rights.length === 0|| !file ) {
            alert("missing fields;")
            return;
        }
        const metadata = `filename=objects/${file.name}&title=${title}&description=${description}&language=${language}&rights=${rights}`;

        upload(metadata, file)
            .then(r => console.log(r));

    }, [title, description, language, rights, file]);

    return (
        <Modal buttonLabel={<>{upload_icon}{props.dict.upload}</>}>
            <div className={styles.SendFileModal}>
                <div className={styles.metadataField}>
                    <label>{props.dict.title}</label>
                    <Input value={title} className={styles.input} onChange={(e) => handleChange(e, "title")}/>
                </div>
                <div className={styles.metadataField}>
                    <label>{props.dict.description}</label>
                    <Input value={description} className={styles.input} onChange={(e) => handleChange(e, "description")}/>
                </div>
                <div className={styles.metadataField}>
                    <label>{props.dict.language}</label>
                    <Input value={language} className={styles.input} onChange={(e) => handleChange(e, "language")}/>
                </div>
                <div className={styles.metadataField}>
                    <label>{props.dict.rights}</label>
                    <Input value={rights} className={styles.input} onChange={(e) => handleChange(e, "rights")}/>
                </div>
                <div>
                    <input style={{width: "100%"}} type={"file"} className={styles.input} onChange={handleFileChange}/>
                </div>
                <div style={{justifyContent: "end"}}>
                    <Button variant={"success"} onClick={onSend}>{props.dict.upload}</Button>
                </div>
            </div>
        </Modal>
    );
}

export { SendFileModal };