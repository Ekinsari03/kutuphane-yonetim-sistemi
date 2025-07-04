const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@kutuphane.com" },
    update: {},
    create: {
      email: "admin@kutuphane.com",
      name: "Admin User",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Create admin profile
  await prisma.profile.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      bio: "Sistem yöneticisi",
      location: "Türkiye",
    },
  });

  // Create a regular user
  const userHashedPassword = await bcrypt.hash("user123", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "user@kutuphane.com" },
    update: {},
    create: {
      email: "user@kutuphane.com",
      name: "Test User",
      password: userHashedPassword,
      role: "user",
    },
  });

  // Create user profile
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      bio: "Kitap okumayı seven kullanıcı",
      location: "İstanbul",
    },
  });

  // Create categories
  const categories = [
    { name: "Roman" },
    { name: "Bilim Kurgu" },
    { name: "Tarih" },
    { name: "Biyografi" },
    { name: "Şiir" },
    { name: "Felsefe" },
    { name: "Teknik" },
    { name: "Çocuk Kitapları" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Get created categories
  const romanCategory = await prisma.category.findUnique({
    where: { name: "Roman" },
  });

  const bilimKurguCategory = await prisma.category.findUnique({
    where: { name: "Bilim Kurgu" },
  });

  const tarihCategory = await prisma.category.findUnique({
    where: { name: "Tarih" },
  });

  // Create sample books
  const books = [
    {
      title: "Suç ve Ceza",
      author: "Fyodor Dostoyevski",
      description: "Dostoyevski'nin en önemli eserlerinden biri",
      categoryId: romanCategory?.id,
      createdById: admin.id,
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "Distopik gelecek hakkında klasik bir roman",
      categoryId: bilimKurguCategory?.id,
      createdById: admin.id,
    },
    {
      title: "Nutuk",
      author: "Mustafa Kemal Atatürk",
      description: "Kurtuluş Savaşı'nın hikayesi",
      categoryId: tarihCategory?.id,
      createdById: admin.id,
    },
  ];

  for (const book of books) {
    if (book.categoryId) {
      await prisma.book.create({
        data: book,
      });
    }
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
