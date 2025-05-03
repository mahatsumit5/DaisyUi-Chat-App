import {
  DocumentNode,
  OperationVariables,
  SubscriptionHookOptions,
  TypedDocumentNode,
  useSubscription,
} from "@apollo/client"

const useSubscriptionHook = (
  Document: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  options: SubscriptionHookOptions<any, OperationVariables> | undefined
) => {
  const { data, error, loading, restart, variables } = useSubscription(
    Document,
    options
  )
  return {
    data,
    error,
    loading,
    restart,
    variables,
  }
}
export default useSubscriptionHook
