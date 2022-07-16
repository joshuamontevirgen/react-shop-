import React, { useRef } from "react";
import { useOnClickOutside } from "../useOnClickOutside";

export function Modal({ showModal, setShowModal, title, children }) {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => showModal && setShowModal(false));

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={` fixed inset-0 h-vh bg-black ${
          showModal ? " fadeIn opacity-30" : " fadeOut opacity-0"
        }`}
      />
      {showModal ? (
        <div>
          <div
            style={{ zIndex: 1000 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              className="relative w-auto my-6 mx-auto max-w-3xl"
              ref={modalRef}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-4xl font-light">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
