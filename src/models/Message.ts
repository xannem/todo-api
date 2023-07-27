import { builder } from "../builder";

builder.prismaObject("Message", {
  fields: (t) => ({
    id: t.exposeID("id"),
    task: t.exposeString("task"),
    completed: t.exposeBoolean("completed"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});
