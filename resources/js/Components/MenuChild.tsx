import { Menu } from "@/types";
import { useEffect, useState } from "react";
import AddMenuBtn from "./AddMenuBtn";
import { useForm } from "@inertiajs/react";

export default function MenuChild({
    menu,
    openAll,
    isLastChild,
    parent,
    depth,
    handleUpdate,
}: {
    menu: Menu;
    openAll: boolean;
    isLastChild: boolean;
    parent: string;
    depth: number;
    handleUpdate: (menu: Menu) => void;
}) {
    const [menuData, setMenuData] = useState(menu);
    const [isOpen, setIsOpen] = useState(openAll);

    const { id, parent_id, menu_id, name } = menu;

    useEffect(() => {
        if (!menu.children) {
            fetch(route("menu.get", id))
                .then((res) => res.json())
                .then((freshMenuData) => setMenuData(freshMenuData));
        }
    }, [menu]);

    useEffect(() => {
        setIsOpen(openAll);
    }, [openAll]);

    const { delete: destroy } = useForm({
        id,
    });

    const deleteMenu = () => {
        destroy(route("menu.destroy", { id }), {
            only: ["menus"],
        });
    }


    const hasChildren = menuData?.children && menuData.children.length > 0;

    return (
        <div className="relative">
            <div
                className={`absolute -top-7 left-3 border-l border-b border-gray-400 h-[2.625rem] ${
                    hasChildren ? "w-5" : "w-10"
                }`}
            ></div>
            <div
                className={`ml-3 px-3.5 mt-4 ${
                    isLastChild ? "" : "border-l border-gray-400"
                }`}
            >
                <div className={`flex gap-2 ${hasChildren ? "" : "ml-10"}`}>
                    {hasChildren && (
                        <button
                            type="button"
                            onClick={() => setIsOpen((prevState) => !prevState)}
                            className="bg-white z-10"
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    isOpen ? "" : "-rotate-180"
                                } transition-transform duration-300 ease-in-out`}
                            >
                                <rect
                                    width="26"
                                    height="26"
                                    rx="13"
                                    fill="white"
                                />
                                <path
                                    d="M9.5 11.25L13 14.75L16.5 11.25"
                                    stroke="#101828"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                    <span
                        className="cursor-pointer"
                        onClick={() =>
                            handleUpdate({
                                id,
                                parent_id,
                                menu_id,
                                name,
                                depth,
                                parent,
                            })
                        }
                    >
                        {name}
                    </span>
                    <div className="group flex items-center gap-2">
                        <AddMenuBtn
                            handleClick={() =>
                                handleUpdate({
                                    id: "",
                                    parent_id: id,
                                    menu_id: "",
                                    name: "",
                                    depth: depth + 1,
                                    parent: name,
                                })
                            }
                        />
                        <button type="button" onClick={deleteMenu}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-white group-hover:text-red-500"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {menuData?.children &&
                    isOpen &&
                    menuData.children.map((child, i) => (
                        <MenuChild
                            key={child.id}
                            parent={name}
                            openAll={openAll}
                            isLastChild={
                                i === (menuData?.children ?? []).length - 1
                            }
                            depth={depth + 1}
                            menu={child}
                            handleUpdate={(menu) => handleUpdate(menu)}
                        />
                    ))}
            </div>
        </div>
    );
}
