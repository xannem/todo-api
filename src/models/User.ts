import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    messages: t.relation("messages"),
  }),
});


builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

builder.mutationField("toogleCompleted", (t) =>
  t.prismaField({
    type: ["User"],
    nullable: true,
    args: {
      id: t.arg.int({ required: true }),
      taskId: t.arg.int({ required: true }),
    },

    resolve: async (_parent, args, _context) => {
      const specificUser = await prisma.message.findUnique({
        where: {
          id: _context.taskId,
        },
      });

      await prisma.user.update({
        where: {
          id: _context.id,
        },
        data: {
          messages: {
            update: [
              {
                where: {
                  id: _context.taskId,
                },
                data: {
                  completed: !specificUser?.completed,
                },
              },
            ],
          },
        },
      });

      return await prisma.user.findMany({ where: { id: _context.id } });
    },
  })
);

builder.mutationField("addNewTask", (t) =>
  t.prismaField({
    type: ["User"],
    nullable: true,
    args: {
      id: t.arg.int({ required: true }),
      task: t.arg.string({ required: true }),
    },

    resolve: async (_parent, args, _context) => {
      await prisma.user.update({
        where: {
          id: _context.id,
        },
        data: {
          messages: {
            create: [
              {
                task: _context.task,
              },
            ],
          },
        },
      });

      return await prisma.user.findMany({ where: { id: _context.id } });
    },
  })
);

builder.mutationField("deleteNewTask", (t) =>
  t.prismaField({
    type: ["User"],
    nullable: true,
    args: {
      id: t.arg.int({ required: true }),
      taskId: t.arg.int({ required: true }),
    },

    resolve: async (_parent, args, _context) => {
      await prisma.user.update({
        where: {
          id: _context.id,
        },
        data: {
          messages: {
            delete: [
              {
                id: _context.taskId,
              },
            ],
          },
        },
      });

      return await prisma.user.findMany({ where: { id: _context.id } });
    },
  })
);
