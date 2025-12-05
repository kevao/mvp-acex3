import 'reflect-metadata'
import { DataSource, DeepPartial } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from '@/modules/users/entities/user.entity'
import { Address } from '@/modules/users/entities/address.entity'
import { Plan } from '@/modules/subscriptions/entities/plan.entity'
import { Subscription } from '@/modules/subscriptions/entities/subscription.entity'

const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/marmitas'
const isProd = process.env.NODE_ENV === 'production'
const rawSsl = process.env.DB_SSL || process.env.DATABASE_SSL
const useSsl = rawSsl !== undefined
  ? ['true', '1', 'yes', 'on'].includes(String(rawSsl).toLowerCase())
  : isProd

const dataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  entities: [User, Address, Plan, Subscription],
  ssl: useSsl ? { rejectUnauthorized: false } : false,
})

async function run() {
  await dataSource.initialize()
  const userRepo = dataSource.getRepository(User)
  const planRepo = dataSource.getRepository(Plan)

  // Criar planos se a tabela estiver vazia
  const plansCount = await planRepo.count()

  if (plansCount === 0) {
    const plansData: DeepPartial<Plan>[] = [
      {
        slug: 'plano-basico',
        name: 'Plano Básico',
        description: 'Refeições planejadas para você',
        priceCents: 49000,
        billingPeriod: 'monthly',
        features: [
          '5 marmitas por semana',
          'Entrega gratuita',
          '1 sobremesa exclusiva por mês'
        ],
        isActive: true,
      },
      {
        slug: 'plano-casal',
        name: 'Plano Casal',
        description: 'Refeições planejadas para duas pessoas',
        priceCents: 93000,
        billingPeriod: 'monthly',
        features: [
          '10 marmitas por semana',
          'Entrega gratuita',
          '2 sobremesas exclusivas por mês'
        ],
        isActive: true,
      },
      {
        slug: 'plano-familia',
        name: 'Plano Família',
        description: 'Refeições planejadas para toda a família',
        priceCents: 177000,
        billingPeriod: 'monthly',
        features: [
          '20 marmitas por semana',
          'Entrega gratuita',
          '4 sobremesas exclusivas por mês',
        ],
        isActive: true,
      },
    ]

    for (const planData of plansData) {
      await planRepo.save(planRepo.create(planData))
      console.log('Seed: plano criado', planData.name)
    }
  } else {
    console.log('Seed: planos já existem, pulando criação')
  }

  const email = process.env.SEED_USER_EMAIL || 'joao@marmitas.com'
  const password = process.env.SEED_USER_PASSWORD || 'password'

  const existing = await userRepo.findOne({ where: { email } })
  if (existing) {
    console.log('Seed: usuário já existe', email)
    await dataSource.destroy()
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = userRepo.create({
    email,
    name: 'João Silva',
    passwordHash,
    role: 'user',
    isActive: true,
  })
  await userRepo.save(user)
  console.log('Seed: usuário criado', user.email)
  await dataSource.destroy()
}

run().catch(async (err) => {
  console.error('Seed: erro', err)
  try {
    await dataSource.destroy()
  } catch { }
  process.exit(1)
})
