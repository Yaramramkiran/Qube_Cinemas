export interface Collection {
    id: string;
    name: string;
    artist?: string;
    releasedOn?: string;
    durationInSeconds?: number;
    sizeInBytes?: number;
    performers?: string;
    type?: string;
    songs?: Collection[];
}