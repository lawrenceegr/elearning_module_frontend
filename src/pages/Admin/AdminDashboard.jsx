import React from "react";
import {
  AdminCard,
  TutorsAdminTable,
  UnitsAdminTable,
  PageTitle,
} from "../../components";
const AdminDashboard = () => {
  return (
    <div
      id="main"
      className="w-full h-full flex flex-col-centered justify-start"
    >
      <div id="grid" className="w-full p-5 grid gap-5 grid-cols-2 debug m-4">
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
      </div>
      <div
        id="table"
        className="w-full flex flex-col jusitfy-start items-center h-full border-2 border-black"
      >
        <PageTitle text="units summary" />

        <UnitsAdminTable />
        {/* <TutorsAdminTable /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
