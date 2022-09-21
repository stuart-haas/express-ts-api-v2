import 'reflect-metadata';
import { container } from 'tsyringe';
import { Application } from 'start';

const application = container.resolve(Application);

application.registerProviders();

application.start();
