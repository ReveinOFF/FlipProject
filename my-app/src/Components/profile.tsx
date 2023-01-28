import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

function Profile() {
    const user = useTypedSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null)
            navigate("/login");
    });

    const image = "https://localhost:7170/resources/userimage/" + user.id + "/" + user.userImage;

    return (
        <div>
            <img width={"150px"} src={image} alt="" />
            <div>
                {user.isVerified ? "Verified" : null}
            </div>
            <div>
                {user.surname + ' ' + user.name}
            </div>
            <div>
                {user.isPrivateUser ? null : <>
                    <div>
                        Followers {user.followers}
                    </div>
                    <div>
                        Followings {user.followings}
                    </div>
                    <div>
                        CreatedPost {user.createdPost}
                    </div>
                </>}
            </div>
        </div>
    );
}

export default Profile;