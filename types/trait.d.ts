export interface Identifiable {
    id: string;
}

export interface Ownable {
    owners: Identifiable[];
}
