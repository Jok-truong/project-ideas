import { useState } from "react";
import stables from "../../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/users";
import { useSelector } from "react-redux";
import { IUser } from "../../types/user";
import toast from "react-hot-toast";
import CropEasy from "./CropEasy";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store/reducers/userReducers";

export type IPhoto = undefined | { url: string; file: File };

const ProfilePicture = ({ avatar }: { avatar: string }) => {
  const queryClient = useQueryClient();
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState<IPhoto>(undefined);
  const userState = useSelector((state: IUser) => state.user);
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: ({
      token,
      formData,
    }: {
      token: string;
      formData: FormData;
    }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile Photo is removed");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    file && setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", "");

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal") as HTMLElement
        )}
      <div className="w-full flex items-center gap-x-4">
        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
