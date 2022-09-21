import express from 'express';
import { InjectionToken } from 'tsyringe';
import { IProvider } from './IProvider';

export interface IApplication {
  server: express.Application;
  providers: InjectionToken<IProvider>[];
  registerProviders(): void;
  start(): void;
}
