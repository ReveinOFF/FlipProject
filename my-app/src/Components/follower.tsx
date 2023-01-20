import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"

export interface IUser {
    id: string
    userImage: string
    name: string
    description: string
    isVerified: boolean
}

export const Follower = () => {
    const myUser = useTypedSelector((state) => state.auth.user)
    const [users, setUsers] = useState<IUser[]>();
    const [query, setQuery] = useState<string>();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`user/get-followers/${myUser.id}`).then((res) => {
            const listUser = [];

            res.data.forEach(element => {
                listUser.push(element);
            });

            setUsers(listUser);
        });
    }, [])

    const handleInput = e => {
        if(e.target.value.length === 0) {
            setTimeout(() => {
                setQuery(null);
            }, 500);
        }
        else {
            setTimeout(() => {
                setQuery(e.target.value.toLowerCase());
            }, 500);
        }
    }

    const clickOnUser = (name: string) => {
        navigate(`/${name}`)
    }
    
    return(
        <div>
            <div>
                <input type="text" onChange={handleInput}/>
            </div>
            {users && <div>
                    <ListGroup>
                        {users.filter((user) => user.name
                            .toLowerCase()
                            .includes(query))
                            .map((item) => 
                        <ListGroup.Item key={item.id} onClick={() => clickOnUser(item.name)}>
                            <img src={`http://localhost:5170/resources/userimage/${item.id}/${item.userImage}`} alt="" />
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                            <div>{item.isVerified && "*Verified*"}</div>
                        </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>}
        </div>
    )
}