import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getBase64FromUrl } from "./Service/convertURL";
import { ProfileActionTypes } from "./Profile/store/types";

interface IFollower {
    id: string
    userImage: string
    name: string
    description: string
    isVerified: boolean
}

const Profile = () => {
    const myuser = useTypedSelector((state) => state.auth.user);
    const user = useTypedSelector((state) => state.profile.user);
    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [followers, setFollowers] = useState<IFollower[]>();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<any>();

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(myuser.name === params.profile) {
            setIsMyProfile(true);
            dispatch({type: ProfileActionTypes.USER, payload: {user: myuser}});
        }
        else{
            axios.get(`user/get-user-by-name/${params.profile}`).then(res => {
                dispatch({type: ProfileActionTypes.USER, payload: {user: res.data}});
            });
            setIsMyProfile(false);
            setIsFollowed(isFollow);
        }
    }, []);

    // useEffect(() => {
    //     getBase64FromUrl(`http://localhost:5170/resources/userimage/${user.id}/${user.userImage}`).then(res => setImageURL(res));
    // },[]);

    const isFollow = () : boolean => {
        axios.get(`user/get-followers/${myuser.id}`).then(res => {
            setFollowers(res.data);
        });

        if(followers.find(x => x.id === user.id))
            return true;
        else
            return false;
    }

    const DeleteImage = () => {
        axios.delete(`user/delete-image-user/${user.id}`)
    }

    const AddImage = e => {
        let formData = new FormData;
        
        formData.append("file", e.target.files[0])

        axios.post(`user/add-image-user/${user.id}`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
        }})
    };

    const GetFollowers = () => {
        navigate(`/${user.name}/follower`);
    }

    const GetFollowing = () => {
        navigate(`/${user.name}/following`);
    }

    const Follow = () => {
        axios.post(`user/${myuser.id}/follow/${user.id}`)
    }

    const UnFollow = () => {
        axios.post(`user/${myuser.id}/unfollow/${user.id}`)
    }

    return (
        <div>
            {user && 
            <>
                <div style={{width: "150px", height: "150px", backgroundColor: "grey"}}>
                    <img width={"150px"} src={`http://localhost:5170/resources/userimage/${user.id}/${user.userImage}`} alt="" />
                </div>
                {isMyProfile ?
                    <div>
                        <input type="file" name="file" onChange={AddImage}/>
                        <Button disabled={!user.userImage} onClick={DeleteImage}>Delete</Button>
                    </div> : 
                    <div>
                        {isFollowed ? 
                            <Button onClick={Follow}>Follow</Button> : 
                            <div>
                                <Button disabled>Following</Button>
                                <Button onClick={UnFollow}>Follow</Button>
                            </div>}
                    </div>
                }
                <div>
                    {user.isVerified && "*Verified*"}
                </div>
                <div>
                    <Button onClick={GetFollowers}>Followers</Button>
                    <Button onClick={GetFollowing}>Following</Button>
                </div>
                <div>
                    {user.name}
                </div>
                <div>
                    {!user.isPrivateUser && <>
                        <div>
                            Followers {user.followers}
                        </div>
                        <div>
                            Following {user.followings}
                        </div>
                        <div>
                            CreatedPostCount {user.createdPostCount}
                        </div>
                        <div>
                            CreatedPost {user.createdPost}
                        </div>
                    </>}
                </div>
            </>}
        </div>
    );
}

export default Profile;