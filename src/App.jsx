import "./App.css";
import {
  HomePage,
  UnitPage,
  PricingPage,
  ChapterPage,
  UnitsPage,
  TutorPage,
  TutorUnitPage,
  TutorUnitsPage,
  NotFound,
  AdminDashboard,
  StudentsPageAdmin,
  TutorsPageAdmin,
  TutorLayoutPage,
  AdminLayout,
  UsersLayout,
  UnitsPageDynamic,
  UnitPageDynamic,
  AdminSection,
  DraftPage,
  ModalRenewed,
} from "./pages";
import {
  CourseForm,
  ChapterForm,
  LessonForm,
  ResourcesForm,
  UnitForm,
  RequireAuth,
  LogInForm,
  RegistrationForm,
} from "./components";
import { ModalProvider } from "./components/modals";
import Users from "./pages/UserPage";
import { Routes, Route, useLocation } from "react-router-dom";
import IdleTimer from "./Authentication/IdleTimer";
import Forbidden from "./pages/403";
import {
  StudentRegistrationForm,
  TutorRegistrationForm,
} from "./components/Credentials";
import CoursesAdminPage from "./pages/Admin/CourseAdminPage";

function App() {
  const location = useLocation();
  console.log("Current Location");
  console.log(location);
  const background = location.state && location.state.background;
  console.log("Final Decision");
  console.log(background);
  // AUTHENTICATION ROUTES
  // {
  //   student:"2000",
  //   admin :"2001",
  //   tutor:"2002",
  // }
  return (
    <div className="flex w-screen h-screen ">
      <ModalProvider>
        {/* <IdleTimer> */}
        <Routes location={background || location}>
          {/* Student Protected Routes */}
          <Route exact path="forbidden" element={<Forbidden />} />
          <Route element={<RequireAuth allowedRoles={[2000, 2001, 2002]} />}>
            <Route path="/" element={<UsersLayout />}>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route exact path="pricing" element={<PricingPage />}></Route>
              <Route exact path="*" element={<NotFound />}></Route>
              <Route path="/log-in" element={<LogInForm />} />
              <Route path="draft-page" element={<DraftPage />}>
                <Route path="modal" element={<ModalRenewed />}></Route>
              </Route>
              <Route
                path="register"
                element={<StudentRegistrationForm />}
              ></Route>

              <Route exact path="/units" element={<ChapterPage />}></Route>
              <Route exact path="/unit" element={<UnitPage />}></Route>
              <Route
                exact
                path="/unit/:unitId"
                element={<UnitPageDynamic />}
              ></Route>

              <Route exact path="/courses" element={<UnitsPage />}></Route>
              <Route
                exact
                path="/courses/:courseId"
                element={<UnitsPageDynamic />}
              ></Route>
            </Route>
          </Route>
          {/* Admin Protected routes */}
          {/* <Route element={<RequireAuth allowedRoles={[2002]} />}>
            <Route exact path="/admin" element={<AdminLayout />}>
              <Route exact path="users" element={<Users />} />
              <Route exact path="dashboard" element={<AdminDashboard />} />
              <Route exact path="course-form" element={<CourseForm />} />
              <Route exact path="unit-form" element={<UnitForm />} />
              <Route exact path="admins" element={<AdminSection />} />

              <Route
                exact
                path="tutor-reg"
                element={<TutorRegistrationForm />}
              />
              <Route
                exact
                path="dashboard"
                element={<AdminDashboard />}
              ></Route>
              <Route
                exact
                path="students"
                element={<StudentsPageAdmin />}
              ></Route>
              <Route exact path="tutors" element={<TutorsPageAdmin />}></Route>
              <Route
                exact
                path="courses"
                element={<CoursesAdminPage />}
              ></Route>
            </Route>
          </Route> */}
          {/* Tutor Protected Routes */}
          {/* <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route exact path="/tutor" element={<TutorLayoutPage />}>
              <Route exact path="dashboard" element={<TutorPage />} />
              <Route exact path="units" element={<TutorUnitsPage />} />
              <Route exact path="chapter" element={<ChapterForm />} />
              <Route exact path="lesson" element={<LessonForm />} />
              <Route exact path="resources" element={<ResourcesForm />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route exact path="/tutor/unit" element={<TutorUnitPage />} />
          </Route> */}
        </Routes>

        {/* Whenever there is a background , this routes will kick in. */}
        {/* The background is set pale kwa navbar */}

        {background && (
          <Routes>
            <Route path="/modal" element={<ModalRenewed />} />
            <Route path="/log-in" element={<LogInForm />} />
            <Route path="/register" element={<RegistrationForm />} />

            <Route element={<RequireAuth allowedRoles={[2000, 2001, 2002]} />}>
              <Route path="/" element={<UsersLayout />}>
                <Route exact path="/" element={<HomePage />}></Route>
                <Route exact path="pricing" element={<PricingPage />}></Route>
                <Route exact path="*" element={<NotFound />}></Route>
                <Route path="/log-in" element={<LogInForm />} />
                <Route path="draft-page" element={<DraftPage />}>
                  <Route path="modal" element={<ModalRenewed />}></Route>
                </Route>
                <Route
                  path="register"
                  element={<StudentRegistrationForm />}
                ></Route>
                <Route exact path="/units" element={<ChapterPage />}></Route>
                <Route exact path="/unit" element={<UnitPage />}></Route>
                <Route
                  exact
                  path="/unit/:unitId"
                  element={<UnitPageDynamic />}
                ></Route>

                <Route exact path="/courses" element={<UnitsPage />}></Route>
                <Route
                  exact
                  path="/courses/:courseId"
                  element={<UnitsPageDynamic />}
                ></Route>
              </Route>
            </Route>

            {/* Tutor Protected Routes */}
            <Route element={<RequireAuth allowedRoles={[2001]} />}>
              <Route exact path="/tutor" element={<TutorLayoutPage />}>
                <Route exact path="dashboard" element={<TutorPage />} />
                <Route exact path="units" element={<TutorUnitsPage />} />
                <Route exact path="chapter" element={<ChapterForm />} />
                <Route exact path="lesson" element={<LessonForm />} />
                <Route exact path="resources" element={<ResourcesForm />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[2001]} />}>
              <Route exact path="/tutor/unit" element={<TutorUnitPage />} />
            </Route>

            {/* ADMIN PROTECTED ROUTES */}
            <Route element={<RequireAuth allowedRoles={[2002]} />}>
              <Route exact path="/admin" element={<AdminLayout />}>
                <Route exact path="users" element={<Users />} />
                <Route exact path="dashboard" element={<AdminDashboard />} />
                <Route exact path="forbidden" element={<Forbidden />} />
                <Route exact path="course-form" element={<CourseForm />} />
                <Route exact path="unit-form" element={<UnitForm />} />
                <Route exact path="admins" element={<AdminSection />} />

                <Route
                  exact
                  path="tutor-reg"
                  element={<TutorRegistrationForm />}
                />
                <Route
                  exact
                  path="dashboard"
                  element={<AdminDashboard />}
                ></Route>
                <Route
                  exact
                  path="students"
                  element={<StudentsPageAdmin />}
                ></Route>
                <Route
                  exact
                  path="tutors"
                  element={<TutorsPageAdmin />}
                ></Route>
                <Route
                  exact
                  path="courses"
                  element={<CoursesAdminPage />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        )}
        {/* </IdleTimer> */}
      </ModalProvider>
    </div>
  );
}

export default App;
