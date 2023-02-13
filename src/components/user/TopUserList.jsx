import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { getTopUserList } from "../../api";
import UserHeader from "./UserHeader";
import GyPagination from "../../ui/GyPagination/GyPagination";
import GyLoader from "../../ui/GyLoader/GyLoader";
import GyCard from "../../ui/GyCard/GyCard";
import "./index.scss";

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
  }, [curPage, run]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <>
      <GyCard title={"Top Users"}>
        <div className="user-list">
          {loading ? (
            <GyLoader />
          ) : (
            <ul className="user-list-content">
              {userList.map((item) => {
                return (
                  <li key={item.id}>
                    <UserHeader user={item} size="sm"/>
                  </li>
                );
              })}
            </ul>
          )}
          <GyPagination
            className="user-list-bottom"
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
