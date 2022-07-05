interface Post {
  title: string;
  author: string;
  body: string;
}

interface NewPostInput {
  post: {
    title: string;
    author: string;
    body: string;
  };
}

// Test data
const posts = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    body: "Here is a post",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    body: "This is my first post",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
  },

  //   Mutation: {
  //     addPost: (_: any, postData: NewPostInput): Post[] => {
  //       console.log("HERE IS THE INPUT", postData.post);
  //       posts.push(postData.post);
  //       return posts;
  //     },
  //   },
};

export default resolvers;
