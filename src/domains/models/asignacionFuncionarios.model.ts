import { Id } from "../interfaces";
import { BaseModel } from "./base.model";

export class AsignacionFuncionariosModel extends BaseModel<AsignacionFuncionariosModel> implements Id {
    constructor(
        partial?: Partial<AsignacionFuncionariosModel>
    ) {
        super(partial);
    }

    public gasto?: string;
    public estado?: string;
    public financiamiento?: string;
    public linea?: string;
    public categoria?: string;
    public cargo?: string;
    public funcion?: string;
    public presupuestado?: number;
    public devengado?: number;
    public movimiento?: string;
    public lugar?: string;
    public actualizacion?: string;
    public profesion?: string;
    public correo?: string;
    public motivo_movimiento?: string;
    public fecha_administrativo?: string;
    public oficina?: string;
}