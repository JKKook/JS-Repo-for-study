import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql

    type User {
        id : ID
        firstName : String
        lastName : String
        fullName : String
    }

    type Tweet {
        id : ID
        text : String
        author : User
    }

    type Query {
        allMovies : [Movie!]!
        movie(id : String) : Movie
        allTweets : [Tweet!]!
        allUsers : [User!]!
        tweet(id : ID!) : Tweet
    }

    type Mutation {
        postTweets(text : String!, userId : ID) : Tweet!
        deleteTweets(id : ID!) : Boolean!
    }

    type Movie {
        id : Int!, 
        url : String!, 
        imdb_code : String!, 
        title : String!, 
        title_english : String!, 
        title_long : String!, 
        slug : String!, 
        year : Int!, 
        rating : Float!, 
        runtime : Float!, 
        genres : [String]!, 
        summary : String, 
        description_full : String!, 
        synopsis : String!, 
        yt_trailer_code : String!,
        language : String!, 
        mpa_rating : String!, 
        background_image : String!, 
        background_image_original : String!, 
        small_cover_image : String!, 
        medium_cover_image : String!, 
        large_cover_image : String!
    }
`;

// allTweets
/* GET /api/v1/tweets */
/* POST /api/v1/tweets */

// tweet GET
/* GET /api/v1/tweet/:id */
/* POST /api/v1/tweet/:id */

// ****** rest api에서 POST methods 위와 같은 방식이라면,
// ****** graphQL은 Mutation type에서 요청 해준다.

let tweets = [
    {
        id: '1',
        text: 'this is my message',
        userId: '2',
    },
    {
        id: '2',
        text: 'this is my message2',
        userId: '1',
    },
];

let users = [
    {
        id: '2',
        firstName: 'Kook',
        lastName: 'Lee',
    },
    {
        id: '1',
        firstName: 'Yeon Soo',
        lastName: 'Kang',
    },
];

const resolvers = {
    Query: {
        // movie
        allMovies: async () => {
            const response = await fetch(
                'https://yts.torrentbay.net/api/v2/list_movies.json',
            )
                .then((res) => res.json())
                .then((data) => data);

            return response.data.movies;
        },
        movie: async ({ id }) => {
            const response = await fetch(
                `https://yts.torrentbay.net/api/v2/movie_details.json?movie_id=${id}`,
            )
                .then((res) => res.json())
                .then((data) => data);

            return response.data.movies;
        },

        // tweets
        allTweets: () => tweets,
        tweet(root, { id }) {
            return tweets.find((tweet) => tweet.id === id);
        },
        allUsers() {
            console.log('allUsers called!');
            return users;
        },
    },
    Mutation: {
        postTweets(root, { text, userId }) {
            // javaScript database 부분

            // userId
            if (!userId)
                throw new Error(`do not identification, plz check your Id`);
            const newTweet = {
                id: tweets.length + 1,
                text,
                userId,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweets(root, { id }) {
            const filteredTweet = tweets.find((tweet) => tweet.id === id);
            console.log(filteredTweet);
            if (!filteredTweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== id);
            return true;
        },
    },
    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`;
        },
    },
    // User와 userId를 통해 Tweet 연결
    Tweet: {
        // author field에 연결할 것임(join)
        author({ userId }) {
            if (!userId)
                throw new Error(`do not identification, plz check your Id`);
            return users.find((user) => user.id === userId);
        },
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
