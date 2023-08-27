import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendedor{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int',unique: true})
    Codigo_Vendedor:number;
    @Column({type: 'varchar', length: 50,nullable:true})
    Nombres_Vendedor:string;
    @Column({type: 'varchar', length: 50,nullable:true})
    Apellidos_Vendedor:string;
    @Column({type: 'varchar', length: 50,nullable:true})
    Direccion_Vendedor:string;
    @Column({type: 'int',nullable:true})
    Telefono_Vendedor:number;
    @Column({type: 'int',nullable:true})
    Celular_Vendedor:number;

}