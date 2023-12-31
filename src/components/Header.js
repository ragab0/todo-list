"use client";
import Folders from "./Folders";
import Views from "./Views";
import AddFolderBtn from "./AddFolderBtn";
import Image from "next/image";
import ReduxProvider from "./ReduxProvider";
import { useEffect, useRef } from "react";
import { imgs } from "@/assets/imgs";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "@/toolkits/features/filter/filterSlice";
import { mainActions } from "@/toolkits/features/main/mainSlice";
import "./Comps.css";

const { menu, x: close } = imgs;

function HeaderBody() {
  const appDispatch = useDispatch();
  const progressRef = useRef(null);
  const { isSettings } = useSelector((state) => state.main);
  const { currentSearch } = useSelector((state) => state.filter);
  const { currentTasksList } = useSelector((state) => state.task);
  const {
    userFormData: { name },
  } = useSelector((state) => state.user);

  function searchHandler(e) {
    appDispatch(filterActions.currentSearchSetter(e.target.value));
  }

  function menuHandler(value) {
    appDispatch(mainActions.appIsSettingsSetter(!isSettings));
  }

  useEffect(
    function () {
      function closeingHandler(e) {
        if (!e.target.closest("aside")) {
          appDispatch(mainActions.appIsSettingsSetter(false));
          document.removeEventListener("click", closeingHandler);
        }
      }

      function cleaner() {
        return function () {
          document.removeEventListener("click", closeingHandler);
        };
      }

      if (isSettings) {
        document.addEventListener("click", closeingHandler);
      }
      return cleaner;
    },
    [isSettings]
  );

  const currentLength = currentTasksList.length;
  const currentProgress =
    currentTasksList.reduce((p, c) => p + +c.isCompleted, 0) || 0;

  return (
    <header>
      <section className="flex items-center gap-2">
        <input
          value={currentSearch}
          onChange={searchHandler}
          placeholder="Searching about task.."
          className="p-4 rounded-2xl overflow-hidden bg-slate-100 w-full"
        />
        <button onClick={menuHandler} className="md:hidden w-12 h-12 p-2">
          <Image alt="settings" src={isSettings ? close : menu} />
        </button>
      </section>
      <section className="my-10 w-fit">
        <h2>👋 Welcome, {name}!</h2>
        <p className=" font-bold mb-2">
          You had completeed
          <span className=" inline-block indent-2 text-xl font-bold text-mainClr">
            {String(currentProgress).padStart(2, 0)}/
            {String(currentLength).padStart(2, 0)}
          </span>
        </p>
        <p
          ref={progressRef}
          data-length={currentLength}
          style={{"--progress": currentProgress / currentLength * 100 + "%"}}
          className="p-2 progress w-full bg-slate-300 rounded-xl relative overflow-hidden 
          before:w-full before:right-0 before:transition-transform
          before:bg-mainClrLight before:absolute before:rounded-xl before:-left-full before:top-0 before:h-full "
        ></p>
      </section>
      <section className="pb-4 mb-4 border-b-2 border-slate-300 flex max-lg:flex-wrap gap-y-4 items-start">
        <Folders />
        <div className="flex-1 flex justify-between items-center">
          <AddFolderBtn />
          <Views />
        </div>
      </section>
    </header>
  );
}

export default function Header() {
  return (
    <ReduxProvider>
      <HeaderBody />
    </ReduxProvider>
  );
}
