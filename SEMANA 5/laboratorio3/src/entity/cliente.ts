import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class cliente {
  
  @PrimaryColumn({type:'int', unique:true})
  Ruc_cliente: number;

  @Column({type:'varchar', length:20, nullable:true})
  Nombres_cliente: string;

  @Column({type:'varchar', length:20, nullable:true})
  Apellidos_cliente: string;

  @Column({type:'varchar', length:50, nullable:true})
  Direccion_cliente: string;

  @Column({type:'int', nullable:true})
  Telefono_cliente: number;



}