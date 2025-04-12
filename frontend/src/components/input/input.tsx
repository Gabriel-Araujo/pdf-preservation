import {ComponentPropsWithoutRef, forwardRef} from "react";
import styles from "./../components.module.css"


const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>((props, ref) => {
    const classname = `${styles.input} ${props.className}`
    return <input ref={ref} {...props} className={classname} name={props.name}/>
});

Input.displayName = "Input";

export { Input };