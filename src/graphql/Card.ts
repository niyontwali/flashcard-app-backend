import { extendType, nonNull, objectType, intArg, stringArg, idArg  } from 'nexus';

export const Card = objectType({
  name: "Card",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("question");
    t.nonNull.string('description');
    t.nonNull.string("answer");
  }
})

// Query

export const CardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field("allCards", {
      type: 'Card',
      resolve(parent, args, context, info) {
        return context.prisma.card.findMany()
      }
    }),
     // find one card
   t.field('oneCard', {
    type: "Card",
    args: {
      id: nonNull(idArg())
    },
    resolve (parent, args, context) {
      return context.prisma.card.findUnique({
        where: {
          id: parseInt(args.id)
        },
      })
    }
  })
  }
})

// Mutation

export const cardMutation = extendType({
  type: "Mutation",
  definition(t) {

    // creating a card
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

    // upating a card
    t.nonNull.field('updateCard', {
      type: "Card",
      args: {
        id: nonNull(intArg()),
        question: nonNull(stringArg()),
        description: nonNull(stringArg()),
        answer: nonNull(stringArg())

      },
      resolve(parent, args, context) {
        const {question, description, answer, id } = args;
        const updatedCard = context.prisma.card.update({
          where: {
            id
          },
          data: {
            question,
            description,
            answer
          }
        })
        return updatedCard
      }
    })

    // deleting a card
    t.nonNull.field('deleteCard', {
      type: 'Card',
      args: {
        id: nonNull(intArg())
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.card.delete({
          where: {
            id
          }
        })
      }
    })

  }
})




