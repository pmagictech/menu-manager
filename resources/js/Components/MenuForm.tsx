import { Menu, PageProps } from "@/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Page, Errors, ErrorBag } from "@inertiajs/core";
import { FormEventHandler, useEffect, useState } from "react";

interface menuFromProps {
    menu: Menu;
    showForm: boolean;
    hideForm: () => void;
}

export default function MenuForm({ menu, showForm, hideForm }: menuFromProps) {
    const [menuID, setMenuID] = useState("");
    const [depth, setDepth] = useState(0);
    const [parentData, setParentData] = useState("");
    const [msg, setMsg] = useState("");
    const [isMsgOpen, setIsMsgOpen] = useState(false);

    const { data, setData, post } = useForm({
        id: "",
        name: "",
        parent_id: "0",
    });

    useEffect(() => {
        setMenuID(menu.menu_id);
        setDepth(menu.depth);
        setParentData(menu.parent);
        setData({
            id: menu.id,
            parent_id: menu.parent_id,
            name: menu.name,
        });
    }, [menu]);

    const closeMsg = () => {
        setIsMsgOpen(false);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("menu.update"), {
            only: ['menus'],
            onSuccess: ({ props }) => {
                setMsg(
                    (props as PageProps & { errors: Errors & ErrorBag }).flash
                        .message
                );
                setIsMsgOpen(true);
                setTimeout(() => {
                    closeMsg();
                    hideForm();
                }, 3000);
            },
        });
    };

    return showForm ? (
        <form onSubmit={submit}>
            <label htmlFor="menu-id" className="block mb-2 text-gray-600">
                MenuID
            </label>
            <div
                id="menu-id"
                className="input bg-gray-50 py-3.5 px-4 min-w-80 rounded-2xl mb-4 min-h-12"
            >
                {menuID}
            </div>
            <label htmlFor="depth" className="block mb-2 text-gray-600">
                Depth
            </label>
            <input
                type="text"
                name="depth"
                id="depth"
                className="input bg-gray-200 py-3.5 px-4 min-w-80 rounded-2xl border-0 mb-4 focus:ring-0"
                value={depth}
                readOnly
            />
            <label htmlFor="parent" className="block mb-2 text-gray-600">
                Parent Data
            </label>
            <input
                type="text"
                name="parent"
                id="parent"
                className="input bg-gray-50 py-3.5 px-4 min-w-80 rounded-2xl border-0 mb-4 focus:ring-0"
                value={parentData}
                readOnly
            />
            <label htmlFor="name" className="block mb-2 text-gray-600">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="name"
                className="input bg-gray-50 py-3.5 px-4 min-w-80 rounded-2xl border-0 mb-4"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
            />
            <button className="block font-bold tracking-tight text-white bg-blue-600 py-3 px-8 rounded-full min-w-80">
                Save
            </button>
            <Dialog
                open={isMsgOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={closeMsg}
                role="alertdialog"
            >
                <div className="fixed top-0 right-0 h-fit z-10 w-full overflow-y-auto">
                    <div className="flex min-h-full items-start justify-end p-4">
                        <DialogPanel
                            transition
                            className="relative w-full max-w-sm rounded-xl bg-white/5 shadow-lg p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <button
                                type="button"
                                onClick={closeMsg}
                                className="absolute top-1 right-1 p-4 block text-gray-900 z-10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5"
                                >
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                                </svg>
                            </button>
                            <DialogTitle as="h3">{msg}</DialogTitle>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </form>
    ) : null;
}
