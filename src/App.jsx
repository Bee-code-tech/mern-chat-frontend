import { Navigate, Route, Routes } from "react-router-dom";
// import CommunityDashboard from "./pages/CommunityPage/CommunityDashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
// import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useAuthContext } from "./context/AuthContext";
import CommunityLayout from "./layouts/CommunityLayout";
import ChatPage from "./pages/ChatPage/ChatPage";
import CommunityTopics from "./pages/CommunityPage/CommunityTopics";
import Contributions from "./pages/CommunityPage/Contributions";
import NewCategory from "./pages/CommunityPage/NewCategory";
import NewTopic from "./pages/CommunityPage/NewTopic";
import Profile from "./pages/CommunityPage/Profile";
import TopicDetail from "./pages/CommunityPage/TopicDetail";
import Bookmarks from "./pages/CommunityPage/bookmarks";
import Gallery from "./pages/CommunityPage/Gallery";
import GalleryDetails from "./pages/CommunityPage/GalleryDetails";
import Statistics from "./pages/Statistics/Statistics";
import Notification from "./pages/Notification/Notification";
import Connect from "./pages/Connect/Connect";
import Request from "./pages/Request/Request";
import UserProfile from "./pages/userProfile/UserProfile";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import Modal from "./pages/tests/Modal";
import GalleryDetailsVids from "./pages/CommunityPage/GalleryDetailsVids";
import GalleryVids from "./pages/CommunityPage/GalleryVids";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="">
        <Navbar />
        
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={authUser ? (
                <Home />
          )
             :
             ( <Navigate to={"/login"} />)
          }
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/chatPage"
            element={
              authUser ? (
                  <ChatPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
         
          <Route
            path="/community/topics"
            element={
              authUser ? (
                <CommunityLayout>
                  <CommunityTopics />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
          path="/community/userProfile/:userId"
          element = {
            authUser ? (
                <UserProfile/>
            ) : (
              <Navigate to='/login' />
            )
          }
          />

          <Route 
          path="/community/connect"
          element = {
            authUser ? (
                <Connect />
            ) : (
              <Navigate to='/login' />
            )
          }
          />

          <Route
            path="/community/requests"
            element = {

              authUser ? (
                <CommunityLayout>
                  <Request />
                </CommunityLayout>
              ) : (
                <Navigate to='/login' />
              )
            }
          />

         

          <Route 
          path="/community/statistics"
          element = {
            authUser ? (
              <CommunityLayout >
               <Statistics />
              </CommunityLayout>
            ): (
              <Navigate to="/login" />
            )
          }
          />
          <Route
            path="/community/bookmarks"
            element={
              authUser ? (
                <CommunityLayout>
                  <Bookmarks />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/community/topics/:id"
            element={
              authUser ? (
                <CommunityLayout>
                  <TopicDetail />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/community/topics/new"
            element={
              authUser ? (
                <CommunityLayout>
                  <NewTopic />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
          path="/notification"
          element = {
            authUser ? (
              <CommunityLayout>
                <Notification />
              </CommunityLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
          />
          <Route
            path="/community/topics/category/new"
            element={
              authUser ? (
                <CommunityLayout>
                  <NewCategory />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/community/contributions"
            element={
              authUser ? (
                <CommunityLayout>
                  <Contributions />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        
          <Route
            path="/community/profile"
            element={
              authUser ? (
                <CommunityLayout>
                  <Profile />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/gallery"
            element={
              authUser ? (
                  <Gallery />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/gallery/vids"
            element={
              authUser ? (
                  <GalleryVids />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/galleryDetails/pics/:id"
            element={
              authUser ? (
                  <GalleryDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/galleryDetails/vids/:id"
            element={
              authUser ? (
                  <GalleryDetailsVids />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Thsese are screen test routes  */}
          <Route 
          path="/modal"
          element = {
            <Modal />
          }
          />
        </Routes>
        
        <Toaster />
      </div>
    </>
  );
};

export default App;
