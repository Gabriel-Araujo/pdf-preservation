import {ComponentPropsWithoutRef, forwardRef} from "react";
import styles from "@/components/components.module.css"

interface Props extends ComponentPropsWithoutRef<"button">{
    variant?: "primary" | "secondary" | "danger" | "success"
}

const Button = forwardRef<HTMLButtonElement, Props>(({variant = "primary", ...props}, ref) => {
    const variant_class = `${variant}Button`
    return <button {...props} className={`${styles.buttons} ${styles[variant_class]}`} ref={ref}>{props.children}</button>
})

Button.displayName = "Button";

export { Button };