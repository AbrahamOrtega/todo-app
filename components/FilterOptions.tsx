export default function FilterOptions(props: {
  itemsLeft: number;
  filter: string;
  setFilter: (filter: "all" | "active" | "completed") => void;
  handleClearCompleted: () => void;
}) {
  return (
    <div className="flex p-4 items-center justify-between font-[700] text-[14px] text-darkGrayishBlue dark:text-white/50">
      <p>{props.itemsLeft} Items left</p>
      <div className="hidden gap-x-6 md:flex">
        <p
          className={`${
            props.filter === "all" && " text-blue-500"
          } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
          onClick={() => props.setFilter("all")}
        >
          All
        </p>
        <p
          className={`${
            props.filter === "active" && " text-blue-500"
          } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
          onClick={() => props.setFilter("active")}
        >
          Active
        </p>
        <p
          className={`${
            props.filter === "completed" && " text-blue-500"
          } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
          onClick={() => props.setFilter("completed")}
        >
          Completed
        </p>
      </div>
      <button
        className="hover:text-veryDarkGrayishBlue dark:hover:text-white"
        onClick={props.handleClearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}
