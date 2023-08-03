import React,{ createContext , useContext, useState, useEffect} from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const chatContext = createContext();

const ChatProvider = ({children})=>{
    const history = useHistory();

    const [user, setUser] = useState();
    const [SelectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState();
    const [notification, setNotification] = useState([]);



    useEffect(()=> {
        const userInfo= JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo) {
            history.push("/");
        }

    },[history])
    return <chatContext.Provider 
    value={{user, setUser, setSelectedChat,
        notification,
        setNotification,
     SelectedChat, chats, setChats}}>

        {children}
    </chatContext.Provider>
} 
export const ChatState =() => {
    return useContext(chatContext);

}
export default ChatProvider;