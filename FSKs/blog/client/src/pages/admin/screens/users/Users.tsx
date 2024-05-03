import { useSelector } from "react-redux";
import { useDataTable } from "../../../../hooks/useDataTable";
import { getAllUsers, updateProfile } from "../../../../services/user";
import Table from "../../components/Table";
import { TUserState } from "../../../../types/user";
import { useState } from "react";
import images from "../../../../constants/images";
import stables from "../../../../constants/stables";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TUser = {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  createdAt: Date;
  verified: boolean;
  admin: boolean;
};

const Users = () => {
  const userState = useSelector((state: TUserState) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: usersData,
    queryClient,
    submitSearchKeywordHandler,
    searchKeywordHandler,
    isLoading,
    isFetching,
  } = useDataTable({
    setSearchKeyword,
    currentPage,
    setCurrentPage,
    queryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    queryKey: "users",
  });

  const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } =
    useMutation({
      mutationFn: ({
        isAdmin,
        userId,
      }: {
        isAdmin: boolean;
        userId: string;
      }) => {
        return updateProfile({
          token: userState.userInfo.token,
          userData: { admin: isAdmin },
          userId,
        });
      },
      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User is updated");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleAdminCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const initialCheckValue = !e.target.checked;

    if (
      window.confirm("Do you want to change the admin status of this user?")
    ) {
      mutateUpdateUser({ isAdmin: e.target.checked, userId });
    } else {
      e.target.checked = initialCheckValue;
    }
  };

  return (
    <Table
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      searchInputPlaceHolder="User's email..."
      dataListName="Users"
      pageTitle="Manage Users"
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "is Verified",
        "is Admin",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      paginationConfig={usersData?.data?.config}
    >
      {usersData?.data?.users?.map?.((user: TUser) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.userImage
                    }
                    alt={user.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
              </div>
            </div>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {user.verified ? "✅" : "❌"}
            </p>
          </td>

          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <input
              type="checkbox"
              className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('../../../../../public/images/check.png')] bg-cover checked:disabled:bg-none"
              defaultChecked={user.admin}
              onChange={(e) => handleAdminCheck(e, user._id)}
              disabled={isPendingUpdateUser}
            />
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default Users;
