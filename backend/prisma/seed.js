const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.deleteMany();
  // await prisma.user.deleteMany();

  for (let i = 0; i < 25; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await prisma.profile.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        headline: faker.person.jobTitle(),
        photoUrl: getSampleProfilePic(i),
        interests: faker.helpers
          .arrayElements(
            [
              'Tech', 'Gaming', 'Cooking', 'Art', 'Travel', 'Fitness',
              'Music', 'Photography', 'Fashion', 'Reading', 'Movies', 'Science', 'Food',
              'Sports', 'Design', 'Writing', 'Adventure', 'Yoga', 'Politics', 'Business'
            ], 3
          ),
        userId: user.id,
      },
    });
  }

  console.log('✅ Seed completed');
}

function getSampleProfilePic(index) {
  const urls = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
    'https://randomuser.me/api/portraits/men/6.jpg',
    'https://randomuser.me/api/portraits/men/7.jpg',
    'https://randomuser.me/api/portraits/women/8.jpg',
    'https://randomuser.me/api/portraits/men/8.jpg',
    'https://randomuser.me/api/portraits/women/9.jpg',
    'https://randomuser.me/api/portraits/men/9.jpg',
    'https://randomuser.me/api/portraits/women/10.jpg',
    'https://randomuser.me/api/portraits/men/10.jpg'
  ];
  return urls[index % urls.length];
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
