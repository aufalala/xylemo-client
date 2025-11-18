import TestChatFeed from "./components/TestChatFeed.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import { useAuth } from "./hooks/useAuth.js";
import AdminHomePage from "./pages/AdminHomePage.jsx";
function App() {

  const { user, isAuthenticated, sessionLoading } = useAuth();

  
  if (sessionLoading) return <div>Loading...</div>;

  return (
    <>
    {isAuthenticated ? 
    (user.permLevel === 1 ? <AdminHomePage/> : <PromoterHome/>)
    :
    <LoginPage/>
    }
      {/* <h1>sup</h1>
      <TestChatFeed>

      </TestChatFeed> */}
    </>
  )
}

export default App
