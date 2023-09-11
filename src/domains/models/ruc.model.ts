import { Id } from "../interfaces";
import { BaseModel } from "./base.model";

export class RucModel extends BaseModel<RucModel> implements Id {
    constructor(
        partial?: Partial<RucModel>
    ) {
        super(partial);
        Object.assign(this, partial);
        this.splitDocumento();
        this.splitRazonSocial();
    }

    public nombre?: string;
    public apellido?: string;
    public estado?: string;
    public documento?: string;
    public razon_social?: string;
    public ruc?: string;
    public ruc_anterior?: string;

    public splitRazonSocial(): void {
        if (this.razon_social) {
            const splitNames = this.razon_social.split(",");
            this.nombre = splitNames[1]?.trim() || '';
            this.apellido = splitNames[0]?.trim() || '';
        } else {
            this.nombre = '';
            this.apellido = '';
        }
    }

    public splitDocumento(): void {
        if (this.ruc) {
            const splitNames = this.ruc.split("-");
            this.documento = splitNames[0]?.trim() || '';
        } else {
            this.documento = '';
        }
    }
}