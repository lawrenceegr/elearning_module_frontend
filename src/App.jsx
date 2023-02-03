import "./App.css";
import {
  HomePage,
  PricingPage,
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
  ContentSection,
  AdminRegistrationForm,
  TutorRegistrationForm,
  StudentRegistrationForm,
} from "./components";
import { ModalProvider } from "./components/modals";
import Users from "./pages/UserPage";
import { Routes, Route, useLocation } from "react-router-dom";
import IdleTimer from "./Authentication/IdleTimer";
import Forbidden from "./pages/403";
import CoursesAdminPage from "./pages/Admin/CourseAdminPage";

function App() {
  const location = useLocation();
  console.log(`App location ${JSON.stringify(location)}`);
  const background = location.state && location.state.background; //If the first param is true , then the second param is assigned.Just like conditional operators.
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
        {/* When there is a background object in the state upon render/re-render of the app component,we imperatively declare the route/component to show for the first pair of routes. */}
        <Routes location={background || location}>
          {/* By setting it to the previous page, we hinder any updates hence it still renders the previous page. */}
          {/* Student Protected Routes */}
          <Route exact path="forbidden" element={<Forbidden />} />
          {/* Should trigger a redirect to the dashboard. */}
          <Route element={<RequireAuth allowedRoles={[2000, 2001, 2002]} />}>
            <Route element={<UsersLayout />}>
              {/* GENERAL ROUTES */}
              <Route exact path="/" element={<HomePage />}></Route>
              <Route exact path="pricing" element={<PricingPage />}></Route>
              <Route exact path="*" element={<NotFound />}></Route>
              {/* COURSE VIEW [UNITS] */}
              <Route
                exact
                path="/course/:courseId"
                element={<UnitsPageDynamic />}
              ></Route>
              {/* UNIT VIEW. [CHAPTERS & LESSONS] */}
              <Route exact path="/unit/:unitId" element={<UnitPageDynamic />}>
                <Route
                  exact
                  path=":lessonId"
                  element={<ContentSection />}
                ></Route>
              </Route>
            </Route>
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<RequireAuth allowedRoles={[2002]} />}>
            <Route exact path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route exact path="users" element={<Users />} />
              <Route exact path="course-form" element={<CourseForm />} />
              <Route exact path="unit-form" element={<UnitForm />} />
              <Route exact path="admins" element={<AdminSection />} />
              <Route exact path="tutors" element={<TutorsPageAdmin />}></Route>

              <Route
                exact
                path="tutor-reg"
                element={<TutorRegistrationForm />}
              />
              <Route
                exact
                path="students"
                element={<StudentsPageAdmin />}
              ></Route>
              <Route
                exact
                path="courses"
                element={<CoursesAdminPage />}
              ></Route>
            </Route>
          </Route>

          {/* Tutor Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[2001, 2002]} />}>
            <Route exact path="/tutor" element={<TutorLayoutPage />}>
              <Route index element={<TutorPage />} />
              <Route exact path="units" element={<TutorUnitsPage />} />
              <Route exact path="chapter" element={<ChapterForm />} />
              <Route exact path="lesson" element={<LessonForm />} />
              <Route exact path="resources" element={<ResourcesForm />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[2001, 2002]} />}>
            <Route exact path="/tutor/unit" element={<TutorUnitPage />}>
              <Route exact path=":lessonId" element={<ContentSection />} />
            </Route>
          </Route>
        </Routes>

        {/* Whenever there is a background , this routes will kick in. */}
        {/* The background is set pale kwa navbar */}

        {background && (
          <Routes>
            <Route path="/log-in" element={<LogInForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              exact
              path="/tutor/unit/new-chapter"
              element={<ChapterForm />}
            />
            <Route exact path="/admin/new-unit" element={<UnitForm />} />
            <Route exact path="/tutor/new-lesson" element={<LessonForm />} />
            <Route
              exact
              path="/admin/courses/new-course"
              element={<CourseForm />}
            />
            <Route
              exact
              path="/admin/students/new-student"
              element={<StudentRegistrationForm />}
            />
            <Route
              exact
              path="/admin/tutors/new-tutor"
              element={<TutorRegistrationForm />}
            />
            <Route
              exact
              path="/admin/admins/new-admin"
              element={<AdminRegistrationForm />}
            />
          </Routes>
        )}
        {/* </IdleTimer> */}
      </ModalProvider>
    </div>
  );
}

export default App;
