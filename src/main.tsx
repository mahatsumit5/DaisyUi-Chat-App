import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store.ts"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8000/graphql",
    connectionParams: () => {
      return {
        Authorization: sessionStorage.getItem("accessJWT"),
      }
    },
  })
)

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
)
