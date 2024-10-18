interface IProps{

}
const Skelaton = ({}:IProps)=>{
  return (
    <div>
      <div className="flex items-center justify-center space-x-28 mt-10 ">
          <div className="h-2.5 w-96 bg-gray-300 rounded-full dark:bg-gray-300 mb-2.5"></div>
        <div className="flex space-x-1">
          <div className="w-24 h-10 bg-gray-200 rounded-md dark:bg-gray-300"></div>
          <div className="h-10 bg-gray-300 rounded-md dark:bg-gray-300 w-24"></div>
        </div>
      </div>
    </div>
  );
}
export default Skelaton