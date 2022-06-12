export interface Action {
    label: string;
    url: string;
}
export interface GenericEmail {
    topic: string;
    content: string;
    contentHeader: string;
    actions: Action[];
    address: string;
}
export declare const genericEmail: (stuff: GenericEmail) => string;
