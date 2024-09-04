import { Menu, PageProps } from "@/types";
import { InertiaLinkProps, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import ChildIcon from "./ChildIcon";
import ParentIcon from "./ParentIcon";

type NavLinkProps = InertiaLinkProps & { active: boolean; menu: Menu }

export default function NavLink({
    active = false,
    className = "",
    menu: { name, children },
    ...props
}: NavLinkProps) {
    const { menuId } = usePage<PageProps>().props;

    const [open, setOpen] = useState((children && children.length > 0 && children.some((child) => child.menu_id == menuId)) ?? false);

    return (
        <Link
            {...props}
            onClick={(e) => children && children.length > 0 && e.preventDefault()}
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
                        active={child.menu_id == menuId}
                        href={route("menu", child.menu_id)}
                        menu={child}
                    />
                ))}
        </Link>
    );
}
