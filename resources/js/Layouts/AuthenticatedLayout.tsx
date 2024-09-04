import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { PageProps, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showNavBar, setShowNavBar] = useState(false);

    const { menus, menuId } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-white text-gray-900 dark:text-gray-200 dark:bg-gray-900 3xl:container mx-auto">
            <div className="py-4 px-5 lg:hidden">
                <button
                    onClick={() => setShowNavBar((prevState) => !prevState)}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 7H12.5M4 12H14.5M4 17H12.5"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.5 8.5L20 12L16.5 15.5"
                            stroke="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:grid-rows-[7.5rem_1fr] lg:min-h-screen">
                <nav
                    className={`fixed left-0 flex flex-col h-full overflow-y-auto duration-300 ease-linear lg:static ${
                        showNavBar ? "translate-x-0" : "-translate-x-full"
                    } top-0 w-60 z-20 lg:w-72 lg:translate-x-0 lg:p-6 lg:row-span-2`}
                >
                    <div className="bg-gray-900 p-4 rounded-3xl border-b border-gray-100 dark:border-gray-700 h-full">
                        <div className="shrink-0 flex items-center justify-between p-4 mb-7">
                            <Link href="/">
                                <ApplicationLogo className="block w-auto fill-current text-gray-200" />
                            </Link>

                            <button
                                onClick={() =>
                                    setShowNavBar((prevState) => !prevState)
                                }
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 18V16H16V18H3ZM19.6 17L14.6 12L19.6 7L21 8.4L17.4 12L21 15.6L19.6 17ZM3 13V11H13V13H3ZM3 8V6H16V8H3Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="">
                            {menus[0]?.children &&
                                menus[0]?.children[0]?.children &&
                                menus[0]?.children[0]?.children.map((menu) => (
                                    <NavLink
                                        key={menu.id}
                                        active={menuId == menu.menu_id}
                                        href={route("menu", menu.menu_id)}
                                        menu={menu}
                                    />
                                ))}
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="lg:mt-6 flex justify-between py-7 px-4">
                        {header}

                        <div className="flex items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-400 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
