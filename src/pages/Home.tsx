import {useState, ChangeEvent, FormEvent } from "react";
import Button from "../components/ui/Button"
import useCustomQuery from "../hooks/useAuthenticationQuery";
import Model from "../components/ui/Model";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import { ITodo } from "../interfaces";
import { faker } from "@faker-js/faker";
import { CiCircleRemove } from "react-icons/ci";
import instance from "../config/axios.config";
import Skelaton from "../components/ui/Skelaton";

const Home = () => {

    const [ToggleModal,setToggleModal]=useState(false);
    const [TogglePostModal,setTogglePostModal]=useState(false);
    const [ToggleRemoveModal, setToggleRemoveModal] = useState(false);
    // const [queryVersion,setQueryVersion]=useState(1);
    const [toDoEdit, setToDoEdit] = useState<ITodo>({
      id:0,
      name:"",
      description:""
    });
    const [toDoAdd, setToDoAdd] = useState<ITodo>({
      name: "",
      description: "",
    });
    const [isEdit,setIsEdit]=useState(false);
  
  
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) :null;
    const { isLoading, data } = useCustomQuery({
      queryKey: ["todoList", userData.userToDoListId], 
      url: `/Task/GetAllTasks/todolist/${userData.userToDoListId}`,
      config: {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      },
    });
    
    // Handlers
    const OpenEditModal = (todo:ITodo) =>{
      setToDoEdit(todo);
      setToggleModal(true);
    }
    const openRemoveDialog = (todo: ITodo) => {
      setToDoEdit(todo);
      setToggleRemoveModal(true);
    };
    const openPostDialog = () =>{
      setTogglePostModal(true);
    }
    const CloseEditModal = () =>{
      setToDoEdit({
        id:0,
        name:"",
        description:""
      });
      setToggleModal(false);
    }
    const CloseRemoveModal = () => {
      setToggleRemoveModal(false);
    };
    const ClosePostModal = () => {
      setToDoAdd({
        "name":"",
        "description":""
      })
      setTogglePostModal(false);
    };
    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
      const{value,name}=e.target;
      console.log(name);
      setToDoEdit({
        ...toDoEdit,
        [name]:value
      })
    };
    const onChangeAddHandler = (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const { value, name } = e.target;
      setToDoAdd({
        ...toDoAdd,
        [name]: value,
      });
    };
    const onRemove = async() => {
      try {
        const response = await instance.delete(`/Task/DeleteTask/${toDoEdit.id}`,{
          headers:{
            Authorization:`Bearer ${userData.token}`
          }
        })
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
      }
    }
    const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsEdit(true);
      const {name,description,id}=toDoEdit;
      try {
        const response = await instance.put(`/Task/UpdateTask/${id}`,
          {
            "name":name,
            "description":description
          }
         ,{
          headers:{
            Authorization:`Bearer ${userData.token}`
          }
        })
        if(response.status===200){
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsEdit(false);
      }
    };
    const SubmitAddHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const date = new Date();
      const { name, description } = toDoAdd; // Destructuring title and Description from toDoAdd
      try {
        const response = await instance.post(
          `/Task/CreateTask`,
          {
            name: name,
            description: description,
            createdOn: date, // Assuming the user ID is being correctly sent here
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`, // Authorization header with the JWT token
            },
          }
        );
        if (response.status === 200) {
          ClosePostModal();
          window.location.reload();
        }
      } catch (error) {
        console.log(error); 
      } finally {
        setIsEdit(false); 
      }
    };
    const onGenerateTodos = async() => {
      console.log(data?.tasks)
      for (let index = 0; index < 20; index++) {
        try {
          await instance.post(
            `/Task/CreateTask`,
            {
                name: faker.word.words(5),
                description: faker.lorem.paragraph(2)
            },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`, 
              },
            }
          );
          console.log("coming from generate",data.tasks.length);
        } catch (error) {
          console.log(error); 
        }
      }
      window.location.reload();
    }
  
  
  
    if(isLoading)return(
      <div>
        {Array.from({length:3},(_,idx)=>(
          <Skelaton key={idx}/>
        ))}
      </div>
    )
    return (
      <div className="space-y-1 mt-8">
        <h1 className="text-center mb-5 text-2xl font-bold">Welcome {userData.userName} to home page</h1>
        <div className="flex justify-center mx-auto w-72">
          <Button className="mx-auto mb-2" onClick={openPostDialog}>
            Add Task
          </Button>
          <Button
            className="mx-auto mb-2 w-44"
            onClick={onGenerateTodos}
            variant={"outline"}
          >
            Generate Tasks
          </Button>
        </div>
        {data?.tasks.length ? (
          data.tasks.map((todo: ITodo) => (
            <div
              key={todo.id}
              className="flex items-center w-[500px] mx-auto justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            >
              <p className="w-full font-semibold">- {todo.name}</p>
              <div className="flex items-center justify-end w-full space-x-3">
                <Button size={"sm"} onClick={() => OpenEditModal(todo)}>
                  Edit
                </Button>
                <Button
                  variant={"danger"}
                  size={"sm"}
                  onClick={() => openRemoveDialog(todo)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h1>NO todos yet</h1>
        )}

        {/* Edit todo Modal */}
        <Model
          isOpen={ToggleModal}
          closeModal={CloseEditModal}
          title="Edit this todo"
        >
          <form onSubmit={SubmitHandler} className="space-y-2">
            <Input
              name="name"
              value={toDoEdit.name}
              onChange={onChangeHandler}
            />
            <TextArea
              name="description"
              value={toDoEdit.description}
              onChange={onChangeHandler}
            />
            <div className="flex items-center mt-4">
              <Button variant={"default"} className="mr-6">
                Updata
              </Button>
              <Button
                type={"button"}
                variant={"cancel"}
                onClick={CloseEditModal}
                isLoading={isEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>

        {/* Remove todo Modal */}
        <Model
          className="bg-red-200"
          isOpen={ToggleRemoveModal}
          closeModal={CloseEditModal}
          title="Remve this Todo"
        >
          <div>
            <CiCircleRemove className="text-[70px] text-red-600 mx-auto mt-[-20px]" />
            <form onSubmit={SubmitHandler} className="space-y-4">
              <h3 className="p-3 font-bold text-center">Do you want to delete this todo?</h3>
              <div className="flex items-center ml-12">
                <Button variant={"danger"} className="mr-6" onClick={onRemove}>
                  Remove
                </Button>
                <Button
                  variant={"default"}
                  type={"button"}
                  onClick={CloseRemoveModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Model>

        {/* Post todo Modal */}
        <Model
          isOpen={TogglePostModal}
          closeModal={ClosePostModal}
          title="Post new todo"
        >
          <form onSubmit={SubmitAddHandler} className="space-y-2">
            <Input
              placeholder="Enter your title"
              name="name"
              value={toDoAdd.name}
              onChange={onChangeAddHandler}
            />
            <TextArea
              placeholder="Enter your Description"
              name="description"
              value={toDoAdd.description}
              onChange={onChangeAddHandler}
            />
            <div className="flex items-center mt-4">
              <Button variant={"default"} className="mr-6">
                Done
              </Button>
              <Button
                variant={"cancel"}
                onClick={ClosePostModal}
                isLoading={isLoading}
                type={"button"}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>
      </div>
    );
  }

  export default Home