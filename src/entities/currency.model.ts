import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.model';

@Entity('currencies')
export class Currency extends BaseModel {
  @Column()
  symbol: string;

  @Column()
  name: string;
}
