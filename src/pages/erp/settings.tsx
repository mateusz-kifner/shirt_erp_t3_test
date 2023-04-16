import React from "react";

function Settings() {
  return (
    <div className="flex h-screen w-full flex-row items-center justify-center bg-gray-200 font-sans">
      <div className="card mx-auto w-96 bg-white  shadow-xl hover:shadow">
        {/* eslint-disable-next-line */}
        <img
          className="mx-auto -mt-20 w-32 rounded-full border-8 border-white"
          src="https://avatars.githubusercontent.com/u/67946056?v=4"
          alt=""
        />
        <div className="mt-2 text-center text-3xl font-medium">Ajo Alex</div>
        <div className="mt-2 text-center text-sm font-light">@devpenzil</div>
        <div className="text-center text-lg font-normal">Kerala</div>
        <div className="mt-2 px-6 text-center text-sm font-light">
          <p>
            Front end Developer, avid reader. Love to take a long walk, swim
          </p>
        </div>
        <hr className="mt-8" />
        <div className="flex p-4">
          <div className="w-1/2 text-center">
            <span className="font-bold">1.8 k</span> Followers
          </div>
          <div className="w-0 border border-gray-300"></div>
          <div className="w-1/2 text-center">
            <span className="font-bold">2.0 k</span> Following
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
