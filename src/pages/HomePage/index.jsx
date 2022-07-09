import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Layout, Loader } from "../../components";
import {
  deleteReminder,
  fetchAllReminder,
  sendReminder,
} from "../../services/reminder/reminderService";
import { initialReminderState } from "../../utils";
import { AddReminderForm } from "./AddReminderForm";
export const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const reminders = useSelector((state) => state.reminders);
  const [reminder, setReminder] = useState(initialReminderState);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllReminder());
  }, []);

  return (
    <Layout>
      <div className="flex gap-4 w-full relative flex-row flex-wrap  justify-center">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-center text-xl text-lightBlue">Add Reminder</h1>
          <AddReminderForm
            reminder={reminder}
            setReminder={setReminder}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-xl text-lightBlue mb-3">Reminders</h1>

          {reminders.status === "succeeded" && reminders.data.length === 0 && (
            <h1 className="text-center text-xl text-lightBlue">
              No reminders available
            </h1>
          )}
          {reminders.status === "loading" && <Loader type="medium" />}
          {reminders.status === "succeeded" &&
            reminders.data.length > 0 &&
            reminders.data.map((_reminder) => {
              return (
                <div
                  key={_reminder._id}
                  className="shadow-xl rounded-md p-3 w-80 "
                >
                  <div className="">
                    <h1 className="text-lightBlue text-lg border-b-2 p-3">
                      {_reminder.title}
                    </h1>
                    <p className="text-lightBlue text-base text-opacity-80 px-3 py-2">
                      {_reminder.message}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="w-fit bg-lightBlue px-4 py-2 rounded-md text-white"
                      onClick={() => {
                        dispatch(
                          sendReminder({
                            _id: _reminder._id,
                            email: user.email,
                            phoneNo: user.phoneNo,
                          })
                        );
                      }}
                    >
                      Send Reminder
                    </button>
                    <IconButton
                      Icon={BiTrash}
                      onClick={() => {
                        dispatch(deleteReminder(_reminder._id));
                      }}
                    />
                    <IconButton
                      Icon={BiEdit}
                      onClick={() => {
                        setReminder(() => ({
                          ..._reminder,
                          sendTime: new Date(_reminder.sendTime).toISOString(),
                        }));
                        setIsUpdate(true);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};
