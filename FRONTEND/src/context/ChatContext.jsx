import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);

    async function fetchResponse() {
        if (prompt === "") return alert("Write prompt");
        setNewRequestLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7AYQghVvpWb5bbilLDA1_DAe_PVi4U4M",
                method: "post",
                data: {
                    contents: [{ parts: [{ text: prompt }] }],
                },
            });

            const message = {
                question: prompt,
                answer:
                    response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            };

            setMessages((prev) => [...prev, message]);
            setNewRequestLoading(false);

            const { data } = await axios.post(
                `${server}/api/chat/${selected}`,
                {
                    question: prompt,
                    answer:
                        response["data"]["candidates"][0]["content"]["parts"][0]["text"],
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            alert("someting went wrong");
            console.log(error);
            setNewRequestLoading(false);
        }
    }

    const [chats, setChats] = useState([]);

    const [selected, setSelected] = useState(null);

    async function fetchChats() {
        try {
            const { data } = await axios.get(`${server}/api/chat/all`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });

            setChats(data);
            setSelected(data[0]._id);
        } catch (error) {
            console.log(error);
        }
    }

    const [createLod, setCreateLod] = useState(false);

    async function createChat() {
        setCreateLod(true);
        try {
            const { data } = await axios.post(
                `${server}/api/chat/new`,
                {},
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );

            fetchChats();
            setCreateLod(false);
        } catch (error) {
            toast.error("some went wrong");
            setCreateLod(false);
        }
    }

    const [loading, setLoading] = useState(false);

    async function fetchMessages() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function deleteChat(id) {
        try {
            const { data } = await axios.delete(`${server}/api/chat/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            fetchChats();
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    }

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selected]);
    return (
        <ChatContext.Provider
            value={{
                fetchResponse,
                messages,
                prompt,
                setPrompt,
                newRequestLoading,
                chats,
                createChat,
                createLod,
                selected,
                setSelected,
                loading,
                setLoading,
                deleteChat,
                fetchChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatData = () => useContext(ChatContext);