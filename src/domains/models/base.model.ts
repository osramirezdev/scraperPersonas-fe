import { Id } from "../interfaces";


export class BaseModel<T> implements Id {
    constructor(
        partial?: Partial<T>
    ) {
        Object.assign(this, partial);
    }

    public id?: string;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    getAtributos(exclude: string[] = []): string[] {
        let no = Object.keys(this).filter((f) => !exclude.filter((i) => i == f)[0]);
        let upper = no.map((m) => m.charAt(0).toLocaleUpperCase() + m.slice(1).replace(/[_]+/g, " "))
        return upper;
    }
}