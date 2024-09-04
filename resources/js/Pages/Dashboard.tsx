import AddMenuBtn from "@/Components/AddMenuBtn";
import MenuChild from "@/Components/MenuChild";
import MenuForm from "@/Components/MenuForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, menus }: PageProps) {
    const [showForm, setShowForm] = useState(false);
    const [openAll, setOpenAll] = useState(true);
    const [menu, setMenu] = useState<Menu>({
        id: "",
        parent_id: "0",
        menu_id: "",
        name: "",
        depth: 0,
        parent: "",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold leading-tight flex items-center gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                            fill="#D0D5DD"
                        />
                    </svg>
                    <div className="pt-1 text-gray-300">/</div>
                    <div className="pt-1 tracking-tight">Menus</div>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-4 hidden lg:flex items-center">
                <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="26" cy="26" r="26" fill="#253BFF" />
                    <rect
                        x="17.6562"
                        y="17.6699"
                        width="6.69214"
                        height="6.69336"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="17.6562"
                        y="27.6523"
                        width="6.69214"
                        height="6.69336"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="27.6539"
                        y="27.6523"
                        width="6.69214"
                        height="6.69336"
                        rx="1"
                        fill="white"
                    />
                    <circle cx="30.9871" cy="21.041" r="3.69067" fill="white" />
                </svg>
                <span className="ms-4 text-3xl tracking-tight font-extrabold">
                    Menus
                </span>
            </div>
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <label htmlFor="menus" className="block mb-2 text-gray-600">
                        Menu
                    </label>
                    <select
                        name="menus"
                        id="menus"
                        className="input bg-gray-50 py-3.5 px-4 min-w-80 rounded-2xl border-0 mb-7"
                    >
                        <option value="">Select Menu</option>
                        {menus.map((menu) => (
                            <option key={menu.id} value={menu.id}>
                                {menu.name}
                            </option>
                        ))}
                    </select>
                    <div className="mb-7 flex gap-2">
                        <button
                            className="font-bold tracking-tight text-white bg-gray-800 py-3 px-8 rounded-full"
                            onClick={() => setOpenAll(true)}
                        >
                            Expand All
                        </button>
                        <button
                            className="font-bold tracking-tight text-gray-600 border border-gray-300 py-3 px-8 rounded-full"
                            onClick={() => setOpenAll(false)}
                        >
                            Collapse All
                        </button>
                    </div>
                    <div>
                        {menus.map(
                            ({ id, name, parent_id, menu_id, children }) => (
                                <div className="relative" key={id}>
                                    <div className="flex gap-2">
                                        {children && children.length > 0 && (
                                            <svg
                                                width="26"
                                                height="26"
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="bg-white z-10"
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
                                        )}
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setMenu({
                                                    id,
                                                    parent_id,
                                                    menu_id,
                                                    name,
                                                    depth: 0,
                                                    parent: "",
                                                });
                                                setShowForm(true);
                                            }}
                                        >
                                            {name}
                                        </span>
                                        <AddMenuBtn
                                            handleClick={() => {
                                                setMenu({
                                                    id: "",
                                                    parent_id: id,
                                                    menu_id: "",
                                                    name: "",
                                                    depth: 1,
                                                    parent: name,
                                                });
                                                setShowForm(true);
                                            }}
                                        />
                                    </div>
                                    {children &&
                                        children.map((child, i) => (
                                            <MenuChild
                                                key={child.id}
                                                openAll={openAll}
                                                isLastChild={
                                                    i === children.length - 1
                                                }
                                                parent={name}
                                                depth={1}
                                                menu={child}
                                                handleUpdate={(menu: Menu) => {
                                                    setMenu(menu);
                                                    setShowForm(true);
                                                }}
                                            />
                                        ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div>
                    <MenuForm
                        menu={menu}
                        showForm={showForm}
                        hideForm={() => setShowForm(false)}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
