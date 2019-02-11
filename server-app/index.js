const { ApolloServer, gql } = require('apollo-server');

const shops = [
    {
        id: 5046214,
        shopName: '',
        logoImages: '',
        bannerImages: [],

    },
];

const typeDefs = gql`

  type Book {
    id: ID!
    shopName: String
    logoImages: String
    bannerImages: [String]
  }

  type Query {
    shops: [Book]
  }

  type Mutation {
    editShops (id: Int, shopName: String!, logoImages:String!, bannerImages:[String!]) : Book
  }
`;


const resolvers = {
    Query: {
        shops: () => {
            return shops;
            },
    },
    Mutation: {
        editShops: (root, args) => {
            index = shops.findIndex(x => x.id == args.id);
            const newBooks = {id: args.id, shopName: args.shopName , logoImages: args.logoImages , bannerImages: args.bannerImages };
            shops[index].shopName = args.shopName;
            shops[index].logoImages = args.logoImages;
            shops[index].bannerImages = args.bannerImages;
            return newBooks;
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
