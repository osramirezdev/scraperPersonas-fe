import { BaseModel } from ".";
import { Id } from "../interfaces";
import { AsignacionDocenteModel } from "./asignacionDocente.model";

export class DocenteModel extends BaseModel<DocenteModel> implements Id {
    constructor(
        partial?: Partial<DocenteModel>
    ) {
        super(partial);
    }

    public anho?: number;
    public mes?: string;
    public documento?: string;
    public nombre_completo?: string;
    public estado?: string;
    public objeto_gasto?: string;
    public antiguedad?: string;
    public numero_matriculacion?: number;
    public asignacion?: number;
    public sexo?: string;
    public detalles?: AsignacionDocenteModel[];
}