export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Menu {
    id: string;
    parent_id: string;
    menu_id: string;
    name: string;
    depth: number;
    parent: string;
    children?: Menu[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string;
    };
    menus: Menu[];
};
