import { AsignacionFuncionariosModel, BaseModel } from ".";
import { Id } from "../interfaces";

export class FuncionarioModel extends BaseModel<FuncionarioModel> implements Id {
    constructor(
        partial?: Partial<FuncionarioModel>
    ) {
        super(partial);
    }

    public anho?: number;
    public mes?: string;
    public nivel?: string;
    public entidad?: string;
    public oee?: string;
    public documento?: string;
    public nombres?: string;
    public apellidos?: string;
    public presupuestado?: number;
    public devengado?: string;
    public sexo?: string;
    public estado?: string;
    public anho_inicio?: number;
    public discapacidad?: string;
    public tipo_discapacidad?: string;
    public fecha_nacimiento?: string;
    public horario?: string;
    public asignaciones?: AsignacionFuncionariosModel[];

}