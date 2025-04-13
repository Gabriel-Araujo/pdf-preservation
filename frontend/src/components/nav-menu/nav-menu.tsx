"use client"

import {forwardRef, HTMLProps, useCallback, useRef} from "react";
import styles from "../components.module.css"
import Link from "next/link";

type Props = HTMLProps<HTMLDivElement>

const menu =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list"
         viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>

function NavMenu(props: Props) {
    const navRef = useRef(null);

    const buttonToggle = useCallback(() => {
        if (!navRef.current) { return; }

        const navElement = navRef.current as Element;

        if (!navElement) {return;}

        const isShow = navElement.classList.contains(styles.show);

        if (isShow) { navElement.classList.remove(styles.show); }
        else { navElement.classList.add(styles.show); }
    }, [navRef]);

    return (
        <div ref={navRef} {...props} className={`${styles.nav} ${props.className ? props.className: ""}`}>
            <button className={styles.navButton} onClick={buttonToggle}>{menu}</button>
            <div>
                {props.children}
            </div>
        </div>
    )
}

interface ItemProps extends HTMLProps<HTMLDivElement> {
    href: string;
}

const NavItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
    return (
        <div ref={ref} {...props} className={`${styles.navItem} ${props.className ? props.className : ""}`}>
            <Link href={props.href}>
                {props.children}
            </Link>
        </div>
    );
})


NavItem.displayName = 'NavItem'

export { NavMenu, NavItem}