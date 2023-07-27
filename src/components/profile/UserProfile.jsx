import React, { useEffect, useState } from "react";
import GyCard from "../../ui/GyCard/GyCard";
import GySocial from "../../ui/GySocial/GySocial";
import "./index.scss";
import { useRequest } from "ahooks";
import { getUserProfile } from "../../api/user"

const UserProfile = ({ userEmail }) => {
  const [profile, setProfile] = useState();
  // getUserProfile
  const { error, loading, run } = useRequest(getUserProfile, {
    manual: true,
    onSuccess: (result, params) => {
      setProfile(result?.data);
    },
  });

  useEffect(() => {
    userEmail && run(userEmail);
  }, []);

  return (
    <div className="about-user">
      <p className="user-bio">"{profile?.bio}"</p>
      <section className="user-social">
        <GySocial
          data={{
            github: profile?.github,
            linkedin: profile?.linkedin,
            facebook: profile?.facebook,
          }}
        />
      </section>
    </div>
  );
};

const AboutUser = ({ profile }) => {
  return (
    <div className="about-user">
      <GyCard title={"About me"}>
        <p className="user-bio">"{profile.bio}"</p>
        <section className="user-social">
          <GySocial
            data={{
              github: profile.github,
              linkedin: profile.linkedin,
              facebook: profile.facebook,
            }}
          />
        </section>
      </GyCard>
    </div>
  );
};

export default { AboutUser, UserProfile };
