import { extendType, nonNull, objectType, stringArg } from 'nexus';

export const cardMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCard", {
      type: "Card",
      args: {
        question: nonNull(stringArg()),
        description: nonNull(stringArg()),
        answer: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        const { question, description, answer } = args;
        const newCard = context.prisma.card.create({
          data: {
            question,
            description,
            answer
          }
        });
        return newCard;
      }
    })
  }
})

export const Card = objectType({
  name: "Card",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("question");
    t.nonNull.string('description');
    t.nonNull.string("answer");
  }
})



export const CardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field("allCards", {
      type: 'Card',
      resolve(parent, args, context, info) {
        return context.prisma.card.findMany()
      }
    })
  }
})