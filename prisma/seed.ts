//@ts-ignore
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Iniciando seed de datos...\n')

    // ============================================
    // 1. MÉTODOS DE PAGO
    // ============================================
    console.log('📦 Creando métodos de pago...')

    const efectivo = await prisma.paymentMethod.upsert({
        where: { name: 'Efectivo' },
        update: {},
        create: {
            name: 'Efectivo',
            description: 'Pago en efectivo',
            feePercent: 0,
            feeFixed: 0,
            isActive: true,
        },
    })

    await prisma.paymentMethod.upsert({
        where: { name: 'Transferencia' },
        update: {},
        create: {
            name: 'Transferencia',
            description: 'Transferencia bancaria',
            feePercent: 0,
            feeFixed: 0,
            isActive: true,
        },
    })

    await prisma.paymentMethod.upsert({
        where: { name: 'Tarjeta Débito' },
        update: {},
        create: {
            name: 'Tarjeta Débito',
            description: 'Pago con tarjeta de débito',
            feePercent: 1.5,
            feeFixed: 0,
            isActive: true,
        },
    })

    await prisma.paymentMethod.upsert({
        where: { name: 'Tarjeta Crédito' },
        update: {},
        create: {
            name: 'Tarjeta Crédito',
            description: 'Pago con tarjeta de crédito',
            feePercent: 3.5,
            feeFixed: 0,
            isActive: true,
        },
    })

    console.log('✅ Métodos de pago creados\n')

    // ============================================
    // 2. CATEGORÍAS
    // ============================================
    console.log('📦 Creando categorías...')

    const catPoleras = await prisma.category.upsert({
        where: { name: 'Poleras' },
        update: {},
        create: {
            name: 'Poleras',
            description: 'Poleras con diseños DTF estampados',
        },
    })

    const catDTF = await prisma.category.upsert({
        where: { name: 'DTF Textiles' },
        update: {},
        create: {
            name: 'DTF Textiles',
            description: 'Diseños DTF listos para estampar en textiles',
        },
    })

    console.log('✅ Categorías creadas\n')

    // ============================================
    // 3. FRANQUICIAS (sin FranchiseType separado)
    // ============================================
    console.log('📦 Creando franquicias...')

    // Franquicias de ANIME
    const naruto = await prisma.franchise.upsert({
        where: { name: 'Naruto' },
        update: {},
        create: {
            name: 'Naruto',
            type: 'ANIME', // ← Usamos el enum directamente
            description: 'Naruto Shippuden - Ninja de la aldea de la hoja',
        },
    })

    const dragonBall = await prisma.franchise.upsert({
        where: { name: 'Dragon Ball' },
        update: {},
        create: {
            name: 'Dragon Ball',
            type: 'ANIME',
            description: 'Dragon Ball Z / Super - Guerreros Saiyajin',
        },
    })

    const onePiece = await prisma.franchise.upsert({
        where: { name: 'One Piece' },
        update: {},
        create: {
            name: 'One Piece',
            type: 'ANIME',
            description: 'One Piece - Piratas del sombrero de paja',
        },
    })

    const attackOnTitan = await prisma.franchise.upsert({
        where: { name: 'Attack on Titan' },
        update: {},
        create: {
            name: 'Attack on Titan',
            type: 'ANIME',
            description: 'Shingeki no Kyojin - La humanidad contra los titanes',
        },
    })

    // Franquicias de CARTOON
    const snoopy = await prisma.franchise.upsert({
        where: { name: 'Snoopy' },
        update: {},
        create: {
            name: 'Snoopy',
            type: 'CARTOON', // ← Usamos el enum directamente
            description: 'Peanuts - Charlie Brown y Snoopy',
        },
    })

    const mickeyMouse = await prisma.franchise.upsert({
        where: { name: 'Mickey Mouse' },
        update: {},
        create: {
            name: 'Mickey Mouse',
            type: 'CARTOON',
            description: 'Disney - Mickey Mouse y amigos',
        },
    })

    console.log('✅ Franquicias creadas\n')

    // ============================================
    // 4. DISEÑOS
    // ============================================
    console.log('📦 Creando diseños...')

    // Helper para crear diseños sin duplicar
    const createDesign = async (name: string, franchiseId: string, desc: string) => {
        const existing = await prisma.design.findFirst({
            where: { name, franchiseId },
        })
        if (existing) {
            console.log(`   ⏭️  Diseño "${name}" ya existe`)
            return existing
        }
        const design = await prisma.design.create({
            data: { name, franchiseId, description: desc },
        })
        console.log(`   ✨ Diseño "${name}" creado`)
        return design
    }

    // Diseños de Naruto
    await createDesign('Naruto Sage Mode', naruto.id, 'Naruto en modo sabio con ojos de sapo')
    await createDesign('Sasuke Sharingan', naruto.id, 'Sasuke con Sharingan activado')
    await createDesign('Kakashi Sensei', naruto.id, 'Kakashi el ninja copia')

    // Diseños de Dragon Ball
    await createDesign('Goku Super Saiyan', dragonBall.id, 'Goku transformado en Super Saiyan')
    await createDesign('Vegeta SSGSS', dragonBall.id, 'Vegeta Super Saiyan Blue')
    await createDesign('Gohan Beast', dragonBall.id, 'Gohan en su forma Beast')

    // Diseños de One Piece
    await createDesign('Luffy Gear 5', onePiece.id, 'Luffy en Gear 5 (Nika)')
    await createDesign('Zoro Tres Espadas', onePiece.id, 'Zoro con su estilo de tres espadas')
    await createDesign('Chopper Kawaii', onePiece.id, 'Tony Tony Chopper en modo cute')

    // Diseños de Attack on Titan
    await createDesign('Eren Titan', attackOnTitan.id, 'Eren en forma de Titán')
    await createDesign('Levi Ackerman', attackOnTitan.id, 'Levi el soldado más fuerte')

    // Diseños de Snoopy
    await createDesign('Snoopy Christmas', snoopy.id, 'Snoopy con temática navideña')
    await createDesign('Snoopy Pilot', snoopy.id, 'Snoopy como piloto de guerra')

    // Diseños de Mickey Mouse
    await createDesign('Mickey Classic', mickeyMouse.id, 'Mickey Mouse clásico')
    await createDesign('Minnie Vintage', mickeyMouse.id, 'Minnie Mouse estilo vintage')

    console.log('✅ Diseños creados\n')

    // ============================================
    // RESUMEN
    // ============================================
    const counts = {
        paymentMethods: await prisma.paymentMethod.count(),
        categories: await prisma.category.count(),
        franchises: await prisma.franchise.count(),
        designs: await prisma.design.count(),
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎉 Seed completado exitosamente!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📊 Métodos de pago: ${counts.paymentMethods}`)
    console.log(`📊 Categorías:      ${counts.categories}`)
    console.log(`📊 Franquicias:     ${counts.franchises}`)
    console.log(`📊 Diseños:         ${counts.designs}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:')
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })