import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all `User` and `Message` records
  await prisma.message.deleteMany({});
  await prisma.user.deleteMany({});
  // (Re-)Create dummy `User` and `Message` records
  await prisma.user.create({
    data: {
      name: "Ariadne",
      messages: {
        create: [
          {
            task: "Task Name #1",
          },
          {
            task: "Task Name #2",
          },
          {
            task: "Task Name #3",
          },
          {
            task: "Task Name #4",
          },
          {
            task: "Task Name #5",
          },
          {
            task: "Task Name #6",
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      name: "James",
      messages: {
        create: [
          {
            task: "Task Name #1",
          },
          {
            task: "Task Name #2",
          },
          {
            task: "Task Name #3",
          },
          {
            task: "Task Name #4",
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      name: "Phillipa",
      messages: {
        create: [
          {
            task: "Task Name #1",
          },
          {
            task: "Task Name #2",
          },
          {
            task: "Task Name #3",
          },
          {
            task: "Task Name #4",
          },
          {
            task: "Task Name #5",
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      name: "Robert",
      messages: {
        create: [
          {
            task: "Task Name #1",
          },
          {
            task: "Task Name #2",
          },
          {
            task: "Task Name #3",
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      name: "Murph",
      messages: {
        create: [
          {
            task: "Task Name #1",
          },
          {
            task: "Task Name #2",
          },
        ],
      },
    },
  });
}

main().then(() => {
  console.log("Data has been seeded...");
});
