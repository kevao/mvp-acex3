import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@/modules/users/entities/user.entity';
import { Plan } from '@/modules/subscriptions/entities/plan.entity';
import { Subscription } from '@/modules/subscriptions/entities/subscription.entity';
import { GatewayMeta } from '@/modules/subscriptions/entities/gateway-meta.entity';
import { GatewayWebhook } from '@/modules/subscriptions/entities/gateway-webhook.entity';
import { Invoice } from '@/modules/subscriptions/entities/invoice.entity';
import { Address } from '@/modules/users/entities/address.entity';

export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL') || 'postgresql://postgres:postgres@localhost:5433/marmitas',
  // Allow overriding SSL via env (DB_SSL/DATABASE_SSL). Default: enabled only in production.
  ssl: (() => {
    const raw = configService.get<string>('DB_SSL') ?? configService.get<string>('DATABASE_SSL');
    const shouldUseSsl = raw !== undefined
      ? ['true', '1', 'yes', 'on'].includes(String(raw).toLowerCase())
      : configService.get<string>('NODE_ENV') === 'production';
    return shouldUseSsl ? { rejectUnauthorized: false } : false;
  })(),
  entities: [
    User,
    Plan,
    Subscription,
    GatewayMeta,
    GatewayWebhook,
    Invoice,
    Address,
  ],
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,
});
