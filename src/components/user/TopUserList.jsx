import { useRequest } from "ahooks";
import UserHeader from "./UserHeader";
import "./index.scss";
import GyPagination from "../../ui/GyPagination/GyPagination";
import { useEffect, useState } from "react";
import { getTopUserList } from "../../api";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyCard from "../../ui/GyCard/GyCard";

const TopUserList = () => {
  const [curPage, setCurPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [pagination, setPagination] = useState();

  const { error, loading, run } = useRequest(getTopUserList, {
    manual: true,
    loadingDelay: 300,
    onSuccess: (result, params) => {
      setUserList(result?.data);
      setPagination(result?.meta);
    },
  });
  useEffect(() => {
    run(curPage);
  }, [curPage]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <>
      <GyCard title={"Top Users"}>
        <div className="min-h-[420px]">
          {loading && <GyLoader />}
          <ul className="user-list flex flex-col gap-4">
            {userList.map((item) => {
              return (
                <li key={item.id}>
                  <UserHeader user={item} />
                </li>
              );
            })}
          </ul>
          <GyPagination
            row={pagination?.row}
            curPage={pagination?.current_page}
            pageRow={pagination?.page_row}
            hasPageBtn={false}
            onCurPageChange={(page) => {
              setCurPage(page);
            }}
          />
        </div>
      </GyCard>
    </>
  );
};

export default TopUserList;
