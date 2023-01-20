import { useRequest } from "ahooks";
import UserHeader from "./UserHeader";
import "./index.scss";
import GyPagination from "../../ui/GyPagination/GyPagination";
import { useEffect, useState } from "react";
import { getTopUserList } from "../../api";

const TopUserList = () => {
  const [curPage, setCurPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [pagination, setPagination] = useState();

  const { error, loading, run } = useRequest(getTopUserList, {
    manual: true,
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
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <ul className="user-list flex flex-col my-4 bg-white shadow-lg rounded-2xl px-4 py-8 gap-4">
        <h1 className="title">Top Users</h1>
        {userList.map((item) => {
          return <UserHeader key={item.id} user={item} />;
        })}
        <GyPagination
          row={pagination?.row}
          curPage={pagination?.current_page}
          pageRow={pagination?.page_row}
          hasPageBtn={false}
          onCurPageChange={(page) => {
            setCurPage(page);
          }}
        />
      </ul>
    </>
  );
};

export default TopUserList;
