// Import Prisma Client to interact with the database
const { PrismaClient } = require('@prisma/client');
// Import bcrypt for hashing passwords
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Generate a random plain-text password
  const plainPassword = Math.random().toString(36).slice(-8); // e.g. "a9k3f2x1"

  // 2️⃣ Hash the password before saving it
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // 3️⃣ Create (or skip) test user using upsert
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' }, // Unique email
    update: {},                           // Do nothing if it exists
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      // name: 'Test User'  // Add if needed
    },
  });

  console.log('✅ Test user created or already exists:');
  console.log(user);
  console.log('\n🔐 Login Credentials:');
  console.log(`📧 Email: test@example.com`);
  console.log(`🔑 Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
