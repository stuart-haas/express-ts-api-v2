import { singleton } from 'tsyringe';
import { QueueStack } from './QueueStack';

@singleton()
export class QueueStackManager {
  queues: { [name: string]: QueueStack } = {}

  add(queueStack: QueueStack) {
    this.queues[queueStack.name] = queueStack;
  }

  get(name: string) {
    return this.queues[name];
  }
}
