import { Id } from "../interfaces";
import { BaseModel } from "./base.model";

export class EmpleadoresModel extends BaseModel<EmpleadoresModel> implements Id {
    constructor(
        partial?: Partial<EmpleadoresModel>
    ) {
        super(partial);
    }

    public patronal?: string;
    public empleador?: string;
    public estado?: string;
    public aportes?: string;
    public abonado?: string;
    public vencimiento?: string;
}