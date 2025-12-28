'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addStockAction(prevState: any, formData: FormData) {
    const productQuery = formData.get('product') as string
    const quantityString = formData.get('quantity') as string
    const quantity = parseInt(quantityString)
    const type = formData.get('type') as string // "Compra", "Ajuste", etc.
    const notes = formData.get('notes') as string

    if (!productQuery || isNaN(quantity)) {
        return { success: false, message: 'Producto y cantidad son requeridos.' }
    }

    try {
        // 1. Search Product
        const product = await prisma.product.findFirst({
            where: {
                OR: [
                    { name: { contains: productQuery, mode: 'insensitive' } },
                    { sku: { contains: productQuery, mode: 'insensitive' } }
                ]
            },
            include: {
                tshirt: true,
                dtfTextile: true
            }
        })

        if (!product) {
            return { success: false, message: `No se encontró: "${productQuery}"` }
        }

        // 2. Map Movement Type
        // Enum: PURCHASE, SALE, ADJUSTMENT, RETURN, TRANSFER, DAMAGED
        let movementType: 'PURCHASE' | 'ADJUSTMENT' | 'RETURN' = 'PURCHASE'
        if (type === 'Ajuste') movementType = 'ADJUSTMENT'
        if (type === 'Devolución') movementType = 'RETURN'

        // 3. Create Movement Record
        await prisma.stockMovement.create({
            data: {
                productId: product.id,
                movementType: movementType,
                quantity: quantity,
                reason: notes || `Ingreso desde Dashboard (${type})`,
            }
        })

        // 4. Increment Stock in Relation
        if (product.tshirt) {
            await prisma.tshirt.update({
                where: { id: product.tshirt.id },
                data: { stock: { increment: quantity } }
            })
        } else if (product.dtfTextile) {
            await prisma.dtfTextile.update({
                where: { id: product.dtfTextile.id },
                data: { stock: { increment: quantity } }
            })
        }

        revalidatePath('/')
        return { success: true, message: `+${quantity} unidades agregadas a ${product.name}` }

    } catch (error) {
        console.error('Add Stock Error:', error)
        return { success: false, message: 'Error interno al guardar.' }
    }
}
