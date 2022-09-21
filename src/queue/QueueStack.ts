import {
  Processor, Queue, QueueEvents, Worker,
} from 'bullmq';
import { redisClient as connection } from 'dataSources/InMemoryDataSource';

export class QueueStack {
  name: string;

  processor: Processor;

  queue: Queue;

  worker: Worker;

  queueEvents: QueueEvents;

  constructor(name: string, processor: Processor) {
    this.name = name;
    this.processor = processor;
    this.queue = new Queue(name, { connection });
    this.worker = new Worker(name, async (job) => await processor(job), { connection });

    this.worker.on('drained', () => {
      console.log('Queue is drained, no more jobs left');
    });

    this.worker.on('completed', (job) => {
      console.log(`A job with ID ${job.id} has completed`);
    });

    this.worker.on('failed', (job) => {
      console.log(`A job with ID ${job.id} has failed`);
    });

    this.queueEvents = new QueueEvents(name, { connection });

    this.queueEvents.on('waiting', ({ jobId }) => {
      console.log(`A job with ID ${jobId} is waiting`);
    });

    this.queueEvents.on('active', ({ jobId, prev }) => {
      console.log(`Job ${jobId} is now active; previous status was ${prev}`);
    });

    this.queueEvents.on('completed', ({ jobId, returnvalue }) => {
      console.log(`${jobId} has completed and returned ${returnvalue}`);
    });

    this.queueEvents.on('failed', ({ jobId, failedReason }) => {
      console.log(`${jobId} has failed with reason ${failedReason}`);
    });
  }
}
