import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  Select,
} from "@chakra-ui/react";
import { BiCalendar, BiTime } from "react-icons/bi"; // Import des icônes de calendrier et d'heure
import InputForm from "../InputForm";
import { GlobalContext } from "../../../context/GlobalWrapperChat";

export default function DrawerFormVideocalls() {
  const {
    isOpen,
    onClose,
    addVideoCall,
    updateVideoCall,
    errors,
    setErrors,
    videoCall,
    users,
    findUsers,
    setSelectvideocallHandler,
    selectedvideocall,
  } = useContext(GlobalContext);

  const [form, setForm] = useState({});
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    findUsers();
  }, []);

  useEffect(() => {
    if (selectedvideocall) {
      setForm(selectedvideocall);
      setSelectedUser(selectedvideocall.invitedUsers);
    } else {
      setForm({});
    }
  }, [isOpen, selectedvideocall]);

  const onChangeHandler = (e) => {
    let value =
      e.target.name === "estimatedDurationMinutes"
        ? parseInt(e.target.value)
        : e.target.value;

    if (selectedvideocall && e.target.name === "date") {
      value = `${selectedvideocall?.date.split("-")[0]}/${selectedvideocall?.date.split("-")[1]}/${selectedvideocall?.date.split("-")[2]}`;
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const removeUserHandler = (userId) => {
    setSelectedUser((prev) => prev.filter((user) => user !== userId));
  };

  const selectUsersHandler = (userId) => {
    if (!selectedUser.includes(userId)) {
      setSelectedUser((prev) => [...prev, userId]);
    }
  };

  const onSave = () => {
    if (selectedvideocall) {
      updateVideoCall(
        { ...form, invitedUsers: selectedUser, videocallCreator: "admin" },
        setForm
      );
    } else {
      const formattedForm = {
        ...form,
        date: formatDate(form.date),
        time: formatTime(form.time),
        videocallCreator: "admin",
        invitedUsers: selectedUser,
      };
      addVideoCall(formattedForm, setForm);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    if (!time) return "";
    return time;
  };

  useEffect(() => {
    if (isOpen == false) {
      setSelectedUser([]);
      setSelectvideocallHandler(null);
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(selectedvideocall);
  }, [selectedvideocall]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}
          />
          <DrawerHeader>
            {selectedvideocall ? "Update Video Call" : "Create Video Call"}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={"24px"}>
              <InputForm
                name="videocallId"
                onChangeHandler={onChangeHandler}
                value={form?.videocallId || ""}
                errors={errors?.videocallId}
                label="Video Call ID"
              />
              <InputForm
                name="projectId"
                onChangeHandler={onChangeHandler}
                value={form?.projectId || ""}
                errors={errors?.projectId}
                label="Project ID"
              />
              <InputForm
                name="subject"
                onChangeHandler={onChangeHandler}
                value={form?.subject || ""}
                errors={errors?.subject}
                label="Subject"
              />

              <Select
                name="user"
                onChange={(e) => {
                  selectUsersHandler(e.target.value);
                }}
                placeholder="Select a user"
              >
                {users.map((user) => (
                  <option key={user?.["_id"]} value={user?.["_id"]}>
                    {user?.name}{" "}
                  </option>
                ))}
              </Select>

              {selectedUser.map((selected) => {
                return (
                  <span>
                    {
                      users.filter((user) => user?.["_id"] == selected)?.[0]
                        ?.name
                    }{" "}
                    <span onClick={() => removeUserHandler(selected)}>X</span>
                  </span>
                );
              })}

              <InputForm
                name="estimatedDurationMinutes"
                onChangeHandler={onChangeHandler}
                value={form?.estimatedDurationMinutes || ""}
                errors={errors?.estimatedDurationMinutes}
                label="Estimated Duration (minutes)"
              />

              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={
                    !selectedvideocall
                      ? form?.date || ""
                      : `${selectedvideocall?.date.split("/")[2]}-${selectedvideocall?.date.split("/")[1]}-${selectedvideocall?.date.split("/")[0]}` ||
                        ""
                  }
                  onChange={(e) => onChangeHandler(e)}
                />
              </FormControl>

              <FormControl id="time">
                <FormLabel>Heure</FormLabel>
                <InputGroup>
                  <Input
                    type="time"
                    name="time"
                    value={form?.time || ""}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <InputRightElement
                    pointerEvents="none"
                    children={<Icon as={BiTime} color="gray.300" />}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}