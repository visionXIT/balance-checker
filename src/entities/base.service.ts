import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<Entity> {
  constructor(protected readonly repository: Repository<Entity>) {}

  async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
    const item = await this.repository.findOne(options);

    return item;
  }

  async find(options: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const item = this.repository.merge(this.repository.create(), data);

    return this.repository.save(item);
  }

  async createMany(data: DeepPartial<Entity>[]): Promise<Entity[]> {
    if (Array.isArray(data) && data?.length === 0) return [];

    const items = data.map((entity) =>
      this.repository.merge(this.repository.create(), entity),
    );

    return this.repository.save(items);
  }

  async update(entityId: number, data: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save({
      ...data,
      id: entityId,
    });
  }

  async updateMany(
    query: FindOptionsWhere<Entity>,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    await this.repository.update(query, data);
  }

  async delete(entity: Entity): Promise<void> {
    await this.repository.remove(entity);
  }
}
