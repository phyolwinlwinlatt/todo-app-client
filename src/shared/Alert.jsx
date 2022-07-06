import { Fragment, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
//assets
import { XCircleIcon, XIcon } from "../icons/index";
//store
import { resetAlert } from "../store/slices/alertSlice";
//utils
import classNames from "../utils/classNames";

export default function Alert() {
  const { isShowAlert, alertMessage, alertType } = useSelector(
    (state) => state.alert
  );
  const dispatch = useDispatch();

  const closeAlert = useCallback(() => {
    dispatch(resetAlert());
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeAlert();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [isShowAlert]);

  return (
    <div
      aria-live="assertive"
      className="z-50 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={isShowAlert}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-3"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transform transition ease-in duration-100"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-3"
        >
          <div
            className={classNames(
              alertType === "success" ? "bg-green-50" : "bg-[#FEF2F2]",
              "max-w-xs w-full shadow-lg rounded pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
            )}
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-0 flex-1 flex items-center justify-between space-x-2">
                  {alertType === "success" ? (
                    <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-400" />
                  )}
                  <p
                    className={classNames(
                      alertType === "success"
                        ? "text-green-800"
                        : "text-red-800",
                      "w-0 flex-1 text-sm font-medium truncate"
                    )}
                  >
                    {alertMessage}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className={classNames(
                      alertType === "success" ? "bg-green-50" : "bg-[#FEF2F2]",
                      "rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0"
                    )}
                    onClick={closeAlert}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon
                      className={classNames(
                        alertType === "success"
                          ? "text-green-800 bg-green-50"
                          : "text-red-800 bg-[#FEF2F2]",
                        "h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
