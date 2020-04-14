const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    salary: Float!
    vip: Boolean
  }

  type Product {
    name: String!
    price: Float!
    discount: Int
    priceWithDiscount: Float
  }

  type Query {
    userSigned: User
    featuredProduct: Product
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return user.salario_real
    }
  },

  Product: {
    priceWithDiscount({ discount, price }) {
      if (discount) {
        const discountValue = (discount * price) / 100;
        return (price - discountValue).toFixed(2);
      }

      return price;
    }
  },

  Query: {
    userSigned() {
      return {
        id: 1,
        name: 'John Smith',
        email: 'jsmith@example.com',
        age: 30,
        salario_real: 1250.00,
        vip: true,
      }
    },

    featuredProduct() {
      return {
        name: 'Camisa Polo',
        price: 122.50,
        discount: 22,
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
