"use client"

import styles from "./modal.module.css"

import {ComponentPropsWithoutRef, forwardRef, HTMLProps, ReactNode, useRef, useState} from "react";
import {Button} from "@/components";

const ModalButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<"button">>((props, ref) => {
    return <Button {...props} ref={ref}>{props.children}</Button>
});

ModalButton.displayName = 'ModalButton';

const exit =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill"
         viewBox="0 0 16 16">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
    </svg>

interface Props extends HTMLProps<HTMLDivElement> {
    buttonLabel: ReactNode;
}

function Modal(props: Props) {
    const [show, setShow] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const onClick = () => {
        setShow(prev => !prev);
    }

    return (
        <>
            <ModalButton onClick={onClick}>{props.buttonLabel}</ModalButton>
            {show ?
                <div className={styles.modal} ref={modalRef}>
                    <div className={styles.innerModal}>
                        <div style={{display: "flex", justifyContent: "end"}}>
                            <button className={styles.exitButton} onClick={onClick}>{exit}</button>
                        </div>
                        <div style={{overflowX: "hidden", overflowY: "auto"}}>
                            {props.children}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
}

export { Modal };