import { Model } from 'sequelize-typescript';
import { BuildOptions, NonNullFindOptions } from 'sequelize';
import { AbstractDto } from 'core';

export type ModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Model;
}

export class RepositoryService<T, CreateDto = AbstractDto, UpdateDto = AbstractDto> {
  constructor(protected model: ModelStatic, protected findOptions?: NonNullFindOptions) {
  }

  async findAll(options?: NonNullFindOptions) {
    const opts = this.findOptions || options;
    return await this.model.findAll(opts) as Partial<Promise<T[]>>;
  }

  async findById(id: string | number, options?: NonNullFindOptions) {
    const opts = this.findOptions || options;
    return await this.model.findByPk(id, opts) as Partial<Promise<T>>;
  }

  async create<Dto>(payload: Partial<Dto | CreateDto>) {
    return await this.model.create(payload) as Partial<Promise<T>>;
  }

  async updateById<Dto>(id: string | number, payload: Dto | UpdateDto) {
    const data = await this.findById(id) as Model;
    return await data.update(payload) as Partial<Promise<T>>;
  }

  async deleteById(id: string | number) {
    const data = await this.findById(id) as Model;
    return await data.destroy();
  }
}
