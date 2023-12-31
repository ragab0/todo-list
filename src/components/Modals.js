"use client";
// All modals are rendered in client-side from here;
// They also inherit the redux provider from here;

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "@/toolkits/features/modal/modalSlice";
import { useEffect } from "react";
import ReduxProvider from "./ReduxProvider";

import ModalAddFolder from "@/components/ModalAddFolder";
import ModalTaskForm from "@/components/ModalTaskForm";

export const dataModals = {
  addFolder: {
    Comp: ModalAddFolder,
  },
  taskForm: {
    Comp: ModalTaskForm,
  },
};

function ModalsBody() {
  const { modalList } = useSelector((state) => state.modal);
  const appDispatch = useDispatch();
  
  function closeHandler() {
    appDispatch(modalActions.modalRemoveRear());
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 27 && modalList.length > 0) {
        appDispatch(modalActions.modalRemoveRear());
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalList]);

  return (
    <div>
      {modalList.map((name, i) => {
        const Comp = dataModals[name].Comp;
        return <Comp key={i} closeHandler={closeHandler} />;
      })}
    </div>
  );
}

export default function Modals() {
  return (
    <ReduxProvider>
      <ModalsBody />
    </ReduxProvider>
  );
}
