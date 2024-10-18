import { ChangeEvent, useState } from "react";
import Paginator from "../components/ui/Paginator";
import Skelaton from "../components/ui/Skelaton";
import useCustomQuery from "../hooks/useAuthenticationQuery";
import { ITodo } from "../interfaces";
import { Button } from "@headlessui/react";
import instance from "../config/axios.config";
import { faker } from "@faker-js/faker";
interface IProps {}
const  Todos = ({}: IProps) => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const [page,setPage]=useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [Sort, setSort] = useState("asc");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    console.log(pageSize);
    const { isLoading, data, isFetching } = useCustomQuery({
      queryKey: [`pgaination-page-${page}`, `${pageSize}`, `${Sort}`], 
      url: `/Task/GetAllTasks/todolist/${userData.userToDoListId}?pageSize=${pageSize}&currentPage=${page}&sortOrder=${Sort}`,
      config: {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    });
    const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>) =>{
        setPageSize(+e.target.value);
    }
    const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value);
    };
    const onClickNextHandler = () => {
        setPage(prev=>prev+1);
    };
    const onClickPrevHandler = () => {
      setPage((prev) => prev - 1);
    };
    const onGenerateTodos = async () => {
      for (let index = 0; index < 20; index++) {
        try {
          await instance.post(
            `/Task/CreateTask`,
            {
              name: faker.word.words(5),
              description: faker.lorem.paragraph(2),
            },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          );
          console.log("coming from generate", data.tasks.length);
        } catch (error) {
          console.log(error);
        }
      }
      window.location.reload();
    }
      

    if(isLoading)return(
      <div>
        {Array.from({length:6},(_,idx)=>(
          <Skelaton key={idx}/>
        ))}
      </div>
    )
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between space-x-2 w-96 mx-auto">
        <Button
          className={"bg-indigo-600 p-2 rounded-md"}
          onClick={onGenerateTodos}
          title="Generate 100 records"
        >
          Generate todos
        </Button>
        <div className="flex items-center justify-between space-x-2">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            onChange={onChangePageSize}
            value={pageSize}
          >
            page size
            <option selected disabled>
              page size
            </option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <select
            onChange={onChangeSort}
            className="border-2 border-indigo-600 rounded-md p-2"
          >
            <option selected disabled>
              sort
            </option>
            <option value={"asc"}>oldest</option>
            <option value={"desc"}>latest</option>
          </select>
        </div>
      </div>

      {data?.tasks.length ? (
        data.tasks.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center w-[500px] mx-auto justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <h3 className="w-full font-semibold">
              {todo.id} - {todo.name}
            </h3>
          </div>
        ))
      ) : (
        <h1>NO todos yet</h1>
      )}
      <Paginator
        isFetching={isFetching}
        isLoading={isLoading}
        total={data.totalTasks}
        page={page}
        pageCount={data.pageCount}
        onClickNext={onClickNextHandler}
        onClickPrev={onClickPrevHandler}
      />
    </div>
  );
};
export default Todos;
