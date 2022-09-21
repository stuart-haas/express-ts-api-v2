import { injectable } from 'tsyringe';
import {
  Controller, Get, IController,
} from 'core';
import { API_BASE_PATH } from 'core/constants';

@injectable()
@Controller()
export class HealthCheckController implements IController {
  @Get(['', API_BASE_PATH])
  check() {
    return 'Welcome to the API';
  }
}
