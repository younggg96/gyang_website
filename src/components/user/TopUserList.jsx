import { useRequest } from "ahooks";
import { get } from "../../api/axios";
import UserHeader from "./UserHeader";
import "./index.scss";

const TopUserList = ({ page, row }) => {
  const getTopUserList = () =>
    get(`/auth/getTopUserList?page=${page}&row=${row}`);
  const { data, error, loading } = useRequest(getTopUserList);
  const userList = data?.data;
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
      </ul>
    </>
  );
};

export default TopUserList;
