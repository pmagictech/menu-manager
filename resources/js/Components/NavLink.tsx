import { Menu } from "@/types";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { useState } from "react";
import ParentIcon from "./ParentIcon";
import ChildIcon from "./ChildIcon";

export default function NavLink({
    active = false,
    className = "",
    menu: { name, children },
    ...props
}: InertiaLinkProps & { active: boolean; menu: Menu }) {
    const [open, setOpen] = useState(false);

    return (
        <Link
            {...props}
            onClick={(e) => children && e.preventDefault()}
            className={`focus:outline-none rounded-2xl transition duration-150 ease-in-out ${className} ${
                open ? "block bg-gray-800" : ""
            }`}
        >
            <div
                className={`flex items-center p-3 gap-4 tracking-tight rounded-2xl text-gray-500 hover:text-gray-700 ${
                    active ? "bg-lime-400 text-gray-900" : ""
                } ${open ? "text-white" : ""} font-bold`}
                onClick={() =>
                    children ? setOpen((prevState) => !prevState) : null
                }
            >
                {children ? (
                    <ParentIcon open={open} />
                ) : (
                    <ChildIcon active={active} />
                )}
                {name}
            </div>
            {children &&
                open &&
                children.map((child) => (
                    <NavLink
                        key={child.id}
                        active={child.name == "Menus"}
                        href="#"
                        menu={child}
                    />
                ))}
        </Link>
    );
}
