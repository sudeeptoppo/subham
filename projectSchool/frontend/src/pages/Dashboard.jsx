import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Name } from "../components/dashboard/Name";
export const Dashboard = () => {
  return (
    <div>
      <div className="m-8">
        {/* <Users /> */}
        <Name></Name>
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.16/build/spline-viewer.js"
        ></script>
        <spline-viewer url="undefined"></spline-viewer>
      </div>
    </div>
  );
};
