import { Model } from 'sequelize-typescript';
import { BuildOptions } from 'sequelize';
import { AbstractDto } from 'core';

export type ModelStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Model;
}

export class RepositoryService<T, CreateDto = AbstractDto, UpdateDto = AbstractDto> {
  constructor(protected model: ModelStatic) {}

  async findById(id: string | number) {
    return await this.model.findByPk(id, { rejectOnEmpty: true }) as Partial<Promise<T>>;
  }

  async create(payload: Partial<CreateDto>) {
    return await this.model.create(payload) as Partial<Promise<T>>;
  }

  async updateById(id: string | number, payload: UpdateDto) {
    const data = await this.findById(id) as Model;
    return await data.update(payload) as Partial<Promise<T>>;
  }

  async deleteById(id: string | number) {
    const data = await this.findById(id) as Model;
    return await data.destroy();
  }
}
