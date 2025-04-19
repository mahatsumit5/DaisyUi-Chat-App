import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store.ts"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core"
const NEW_MESSAGES_SUB = gql`
  subscription {
    sendMessage {
      id
      text
    }
  }
`
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8000/graphql",
    connectionParams: () => {
      return {
        authToken: sessionStorage.getItem("accessJWT"),
      }
    },
  })
)

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
})
// client.subscribe({ query: NEW_MESSAGES_SUB })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
