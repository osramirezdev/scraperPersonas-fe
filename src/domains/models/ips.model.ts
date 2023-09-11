import { Id } from "../interfaces";
import { BaseModel } from "./base.model";
import { EmpleadoresModel } from "./empleadores.model";

export class IpsModel extends BaseModel<IpsModel> implements Id {
    constructor(
        partial?: Partial<IpsModel>
    ) {
        super(partial);
    }

    public nombres?: string;
    public apellidos?: string;
    public fecha_nacimiento?: string;
    public documento?: string;
    public sexo?: string;
    public tipo?: string;
    public beneficiarios_activos?: string;
    public enrolado?: string;
    public vencimiento?: string;
    public empleadores?: EmpleadoresModel[];
}