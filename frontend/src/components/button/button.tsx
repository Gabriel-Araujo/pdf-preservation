import {ComponentPropsWithoutRef, forwardRef} from "react";
import styles from "@/components/components.module.css"



const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<"button">>((props, ref) => {
    return <button {...props} className={styles.buttons} ref={ref}>{props.children}</button>
})

Button.displayName = "Button";

export { Button };