import { Id } from "../interfaces";
import { BaseModel } from "./base.model";

export class AsignacionDocenteModel extends BaseModel<AsignacionDocenteModel> implements Id {
    constructor(
        partial?: Partial<AsignacionDocenteModel>
    ) {
        super(partial);
    }

    public asignacion?: number;
    public asignacion_categoria?: number;
    public cantidad?: number;
    public cargo?: string;
    public categoria?: string;
    public concepto?: string;
    public devuelto?: string;
    public documento?: string;
    public institucion?: string;
}