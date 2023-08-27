import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class proveedor {
  
  @PrimaryColumn({type:'int', unique:true})
  Codigo_proveedor: number;

  @Column({type:'varchar', length:20, nullable:true})
  Apellido_proveedor: string;

  @Column({type:'varchar', length:20, nullable:true})
  Direccion_proveedor: string;

  @Column({type:'varchar', length:20, nullable:true})
  Provincia_proveedor: string;

  @Column({type:'int', nullable:true})
  Telefono_proveedor: number;

}