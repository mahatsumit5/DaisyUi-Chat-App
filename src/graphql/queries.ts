import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($input: SignInUser) {
    signIn(input: $input) {
      status
      message
      token {
        accessJWT
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
  query atest($page: Int!, $take: Int!) {
    response: getAllPosts(page: $page, take: $take) {
      totalNumberOfPosts
      posts {
        id
        title
        content
        createdAt
        updatedAt
        author {
          id
          fName
          lName
          profile
          email
        }
        _count {
          comments
          likes
        }

        images
        hasLiked
      }
    }
  }
`;

export { SIGN_IN, GET_ALL_POSTS };
