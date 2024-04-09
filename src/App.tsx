
import Sidebar from './components/sidebar/Sidebar';
import TopBar from './components/topbar/TopBar';
import Main from './components/main/Areas';
import Change from './components/main/change_password/Change';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { useAppSelector } from './state/store';
import ViewUsers from './components/main/users/Main';
import AddUser from './components/main/users/add/Add';
import UpdateUser from './components/main/users/update/Update';
import UpdateUserStatus from './components/main/users/status/Update';
import AddWeek from './components/main/week/add/Add';
import ViewWeeks from './components/main/week/Main';
import UpdateWeek from './components/main/week/update/Update';
import AddCategory from './components/main/category/add/Add';
import ViewCategory from './components/main/category/Main';
import UpdateCategory from './components/main/category/update/Update';
import AddGoal from './components/main/goals/add/Add';
import ViewGoals from './components/main/goals/Main';
import UpdateGoal from './components/main/goals/update/Update';
import PageNotFound from './components/ui/404';
import MainBlog from './components/main/Main';

interface WithLayoutProps {
  children: React.ReactNode;
}

function App() {
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const user = JSON.parse(jsonString);

  const isAdmin = Boolean(user.user.role && (user.user.role).toLowerCase() === "admin" ? true : false);
  const isAuth = Boolean(useAppSelector((state) => state.auth.token));

  return (

    <BrowserRouter>
      <Routes>
        <Route index element={isAuth ?
          (
            <WithLayout>
              <Route index element={<Main />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/login" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<Main />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <Login />} />

        <Route path="/signup" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<Main />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <Signup />} />

        <Route path="/home/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<Main />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/change_password/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<Change />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/user/add/*" element={isAuth ?
          (

            <WithLayout>
              <Route index element={isAdmin ? <AddUser /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/weeks/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<ViewWeeks />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/week/update/:id/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<UpdateWeek />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/week/add/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<AddWeek />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/user/update/:id/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<UpdateUser />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/user/change_user_status/:id/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={isAdmin ? <UpdateUserStatus /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/users/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={isAdmin ? <ViewUsers /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />


        <Route path="/category/add/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={isAdmin ? <AddCategory /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/categories/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={isAdmin ? <ViewCategory /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/category/update/:id/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={isAdmin ? <UpdateCategory /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />
        <Route path="/goal/add/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<AddGoal />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/goals/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<ViewGoals />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />

        <Route path="/goal/update/:id/*" element={isAuth ?
          (
            <WithLayout>
              <Route index element={<UpdateGoal />} />
              <Route path="*" element={<PageNotFound />} />
            </WithLayout>
          )
          : <MainBlog />} />


        <Route path="*" element={isAuth ? <Main /> : <MainBlog />} />

      </Routes>


    </BrowserRouter>
  );
}

function WithLayout({ children }: WithLayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Routes>
            {children}
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default App;
