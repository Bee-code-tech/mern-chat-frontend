import { Navigate, Route, Routes } from "react-router-dom";
import CommunityDashboard from "./pages/CommunityPage/CommunityDashboard";
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

const App = () => {
  const { authUser } = useAuthContext();
  console.log("🚀 ~ App ~ authUser:", authUser);
  return (
    <>
      <div className="">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
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
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/community/home"
            element={
              authUser ? (
                <CommunityLayout>
                  <CommunityDashboard />
                </CommunityLayout>
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
            path="/community/gallery"
            element={
              authUser ? (
                <CommunityLayout>
                  <Gallery />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/community/galleryDetails/:id"
            element={
              authUser ? (
                <CommunityLayout>
                  <GalleryDetails />
                </CommunityLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
