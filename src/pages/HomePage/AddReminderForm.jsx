import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";
import {
  addReminder,
  updateReminder,
} from "../../services/reminder/reminderService";
import { initialReminderState } from "../../utils";

export const AddReminderForm = ({
  reminder,
  setReminder,
  isUpdate,
  setIsUpdate,
}) => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders);

  useEffect(() => {
    if (
      reminders.reminderCreateStatus === "succeeded" ||
      reminders.reminderUpdateStatus === "succeeded"
    ) {
      setReminder(initialReminderState);
      setIsUpdate(false);
    }
  }, [reminders]);
  return (
    <form
      className="block p-6 rounded-lg shadow-2xl bg-white sm:w-96 w-fit m-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (isUpdate) {
          dispatch(updateReminder({ ...reminder, _id: reminder._id }));
        } else dispatch(addReminder(reminder));
        setReminder(initialReminderState);
        setIsUpdate(false);
      }}
    >
      <div className="form-group mb-4">
        <label
          htmlFor="exampleInputEmail2"
          className="form-label inline-block mb-2 text-gray-700"
        >
          Title
        </label>
        <input
          value={reminder.title}
          onChange={(e) => setReminder({ ...reminder, title: e.target.value })}
          type="text"
          className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter Title"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="exampleInputEmail2"
          className="form-label inline-block mb-2 text-gray-700"
        >
          Message
        </label>
        <textarea
          value={reminder.message}
          onChange={(e) =>
            setReminder({ ...reminder, message: e.target.value })
          }
          type="text"
          className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter message"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="exampleInputEmail2"
          className="form-label inline-block mb-2 text-gray-700"
        >
          Send Time
        </label>
        <input
          value={reminder.sendTime}
          onChange={(e) =>
            setReminder({
              ...reminder,
              sendTime: e.target.value,
            })
          }
          type="datetime-local"
          className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter Send Time"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="exampleInputEmail2"
          className="form-label inline-block mb-2 mr-2 text-gray-700"
        >
          Status
        </label>
        <select name="status" id="" value={reminder.status}>
          <option
            value="pending"
            onSelect={() => {
              setReminder({ ...reminder, status: "pending" });
            }}
          >
            Pending
          </option>
          <option
            value="completed"
            onSelect={() => {
              setReminder({ ...reminder, status: "completed" });
            }}
          >
            Completed
          </option>
        </select>
      </div>

      {reminders.reminderCreateStatus === "loading" ||
      reminders.reminderUpdateStatus === "loading" ? (
        <Loader type="mini" />
      ) : (
        <button
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-primary
      text-white
      font-medium
      text-base
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-primary hover:shadow-lg
      focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-primary active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          {isUpdate ? "Update" : "Add"} Reminder
        </button>
      )}
    </form>
  );
};
