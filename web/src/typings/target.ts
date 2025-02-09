export interface Option {
    label: string;
    icon: string;
    name: string;
    hide?: boolean;
    distance?: number;
    iconColor?: string;
    menuName?: string;
    openMenu?: string;
}

export interface TargetData {
    options?: Record<string, Option[]>;
    zones?: Option[][];
}

export interface VisibilityData {
    state: boolean;
}