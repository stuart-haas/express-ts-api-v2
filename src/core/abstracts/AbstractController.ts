import { NonNullFindOptions } from 'sequelize';
import { ModelStatic, RepositoryService } from 'services';
import { AbstractDto } from './AbstractDto';

export abstract class AbstractController<T, CreateDto = typeof AbstractDto, UpdateDto = typeof AbstractDto> {
  protected repository: RepositoryService<T, CreateDto, UpdateDto>;

  constructor(protected model: ModelStatic, protected findOptions?: NonNullFindOptions) {
    this.repository = new RepositoryService(model, findOptions);
  }
}
