import Router from "./Router/Router"
import { Provider } from 'react-redux'
import appStore from "./Utils/appStore"


function App() {
  return (
    <>
      <Provider store={appStore}>
        <Router />
      </Provider>
    </>
  )
}

export default App
