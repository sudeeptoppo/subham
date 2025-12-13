export function Appbar({user}) {
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className="flex items-center ml-4">
        Digital Learning
      </div>

      <div className="flex ">
        <div className="flex flex-col justify-center  mr-4">
          Hello
        </div>
        <div className=" bg-slate-200 h-12 w-12 rounded-full flex justify-center ">
          <div className="flex flex-col justify-center">
            {user && user.firstname ? user.firstname[0].toUpperCase() : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
