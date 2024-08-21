const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.features.createMany({
        data: [
            {
                statusenabled: true,
                features_name: '2 baggages',
                created_at: new Date(),
            },
            {
                statusenabled: true,
                features_name: '6 seats',
                created_at: new Date(),
            },
            {
                statusenabled: true,
                features_name: 'AUTOMATIC',
                created_at: new Date(),
            },
        ],
    });
}

main()
    .then(() => {
        console.log('Seeding completed.');
    })
    .catch((e) => {
        console.error('Seeding failed: ', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
