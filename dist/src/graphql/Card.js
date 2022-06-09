"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardQuery = exports.cardMutation = exports.Card = void 0;
const nexus_1 = require("nexus");
exports.Card = nexus_1.objectType({
    name: "Card",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("question");
        t.nonNull.string('description');
        t.nonNull.string("answer");
    }
});
// Mutation
exports.cardMutation = nexus_1.extendType({
    type: "Mutation",
    definition(t) {
        // creating a card
        t.nonNull.field("createCard", {
            type: "Card",
            args: {
                question: nexus_1.nonNull(nexus_1.stringArg()),
                description: nexus_1.nonNull(nexus_1.stringArg()),
                answer: nexus_1.nonNull(nexus_1.stringArg())
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
        });
        // find one card
        t.field('findOneCard', {
            type: "Card",
            args: {
                id: nexus_1.nonNull(nexus_1.intArg())
            },
            resolve(parent, args, context) {
                const { id } = args;
                return context.prisma.card.findUnique({
                    where: {
                        id
                    },
                });
            }
        });
        // upating a card
        t.nonNull.field('updateCard', {
            type: "Card",
            args: {
                id: nexus_1.nonNull(nexus_1.intArg()),
                question: nexus_1.nonNull(nexus_1.stringArg()),
                description: nexus_1.nonNull(nexus_1.stringArg()),
                answer: nexus_1.nonNull(nexus_1.stringArg())
            },
            resolve(parent, args, context) {
                const { question, description, answer, id } = args;
                const updatedCard = context.prisma.card.update({
                    where: {
                        id
                    },
                    data: {
                        question,
                        description,
                        answer
                    }
                });
                return updatedCard;
            }
        });
        // deleting a card
        t.nonNull.field('deleteCard', {
            type: 'Card',
            args: {
                id: nexus_1.nonNull(nexus_1.intArg())
            },
            resolve(parent, args, context) {
                const { id } = args;
                return context.prisma.card.delete({
                    where: {
                        id
                    }
                });
            }
        });
    }
});
// Query
exports.CardQuery = nexus_1.extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field("allCards", {
            type: 'Card',
            resolve(parent, args, context, info) {
                return context.prisma.card.findMany();
            }
        });
    }
});
//# sourceMappingURL=Card.js.map