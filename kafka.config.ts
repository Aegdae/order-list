import { Logger } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { logLevel, LogEntry } from 'kafkajs';

export const kakfaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
      logLevel: logLevel.ERROR,
      logCreator: () => (entry: LogEntry) => {
        const { level, log } = entry;

        const ignoredErrors = [
          'There is no leader for this topic-partition',
          'The group coordinator is not available',
          'Response Metadata',
          'Response GroupCoordinator',
        ];

        const shouldIgnore = ignoredErrors.some(err => log.message.includes(err));
        if (shouldIgnore) return;

        Logger.error(`[Kafka] ${log.message}`);
      },
    },
    consumer: {
      groupId: 'main-consumer-group',
    },
  },
};