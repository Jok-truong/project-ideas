import { useState } from "react";
import Pagination from "../../../components/Pagination";
import { createPortal } from "react-dom";
import UpsertForm from "../../../components/CreationForm";

type TableProps = {
  children: React.ReactNode;
  pageTitle: string;
  dataListName: string;
  tableHeaderTitleList: string[];
  searchKeywordOnSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  searchKeywordOnChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isLoading: boolean;
  isFetching: boolean;
  searchKeyword: string;
  searchInputPlaceHolder: string;
  data: any;
  setCurrentPage: (value: number) => void;
  currentPage: number;
  paginationConfig: any;
  titleForm?: string;
};

const Table = ({
  children,
  pageTitle,
  dataListName,
  tableHeaderTitleList,
  searchKeywordOnSubmitHandler,
  searchKeywordOnChangeHandler,
  isLoading,
  isFetching,
  searchKeyword,
  searchInputPlaceHolder,
  data,
  setCurrentPage,
  currentPage,
  paginationConfig,
  titleForm,
}: TableProps) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      {openForm &&
        createPortal(
          <UpsertForm title={titleForm ?? ""} setOpenForm={setOpenForm} />,
          document.getElementById("portal") as HTMLElement
        )}
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>

      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">{dataListName}</h2>
            <div className="text-end">
              <form
                onSubmit={(e) => searchKeywordOnSubmitHandler(e)}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className="relative">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-dark-soft w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) => searchKeywordOnChangeHandler(e)}
                    value={searchKeyword}
                    placeholder={searchInputPlaceHolder}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="button"
                  onClick={() => setOpenForm(true)}
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>

          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>

              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={paginationConfig?.totalPageCount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
