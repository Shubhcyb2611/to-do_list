import {
  DeepPartial,
  EntityTarget,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { AppDataSource } from "@/infrastructure";
import { BaseEntity } from "@/domain/entities";

type OrderOptions<T> = FindOneOptions<T>["order"];
export class GenericRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(private Entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(this.Entity);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const entityCreate = this.repository.create(entity);
    await this.repository.save(entityCreate);
    return entityCreate;
  }

  async findMany(
    options: FindOptionsWhere<T>,
    order?: OrderOptions<T>,
    take?: number,
    offset?: number
  ): Promise<T[]> {
    const entities = await this.repository.find({
      where: options,
      order: order,
      take: take,
      skip: offset,
    });
    return entities;
  }

  async findOne(
    options: FindOptionsWhere<T>,
    order?: OrderOptions<T>
  ): Promise<T> {
    const entity = await this.repository.findOne({
      where: options,
      order: order,
    });
    return entity;
  }

  async findById(id: number, relation?: string[]): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
      relations: relation || [],
    });
    return entity;
  }

  async findByIdAndUpdate(id: number, entity: T): Promise<T> {
    const current = await this.findById(id);
    await this.repository.update(id, {
      ...current,
      ...entity,
    } as any);

    const updated = await this.findById(id);
    return updated;
  }

  async findByIdAndDelete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  protected getEntityType(): EntityTarget<T> {
    return this.Entity;
  }

  async count(options?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.count({ where: options });
  }

  async findManyAndCount(
    options: FindOptionsWhere<T>,
    order?: OrderOptions<T>,
    take?: number,
    offset?: number
  ): Promise<[T: T[], count: number]> {
    const response = await this.repository.findAndCount({
      where: options,
      order: order,
      take: take,
      skip: offset,
    });
    return response;
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }
}
