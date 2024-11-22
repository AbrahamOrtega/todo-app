import Image from "next/image";
import TodoModel from "@/models/TodoModel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem(props: {
  todo: TodoModel;
  handleCompleteTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  hoverId: string | null;
  setHoverId: (id: string | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      id={props.todo.id}
      className="flex items-center bg-veryLightGray dark:bg-veryDarkDesaturatedBlue"
      onMouseEnter={() => props.setHoverId(props.todo.id)}
      onMouseLeave={() => props.setHoverId(null)}
    >
      <div
        className={`flex ${
          !props.todo.completed &&
          "border border-lightGrayishBlue dark:border-white/25"
        } w-8 h-8 mr-4 m-4 items-center justify-center rounded-full cursor-pointer`}
        onClick={(e) => (
          e.stopPropagation(), props.handleCompleteTodo(props.todo.id)
        )}
        style={
          props.todo.completed
            ? {
                background:
                  "linear-gradient(145deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
              }
            : {}
        }
      >
        {props.todo.completed && (
          <Image
            src="/images/icon-check.svg"
            alt="Check Icon"
            width={18}
            height={18}
          />
        )}
      </div>
      <div className="flex flex-grow justify-between items-center">
        <p
          className={`${
            props.todo.completed && "line-through opacity-30"
          } flex items-center w-full min-h-16 py-4`}
          onClick={(e) => e.stopPropagation()}
          {...listeners}
        >
          {props.todo.title}
        </p>
        {props.hoverId === props.todo.id && (
          <button
            className="flex items-center justify-center m-4"
            onClick={(e) => (
              e.stopPropagation(), props.handleDeleteTodo(props.todo.id)
            )}
          >
            <Image
              src="/images/icon-cross.svg"
              alt="Cross Icon"
              width={18}
              height={18}
            />
          </button>
        )}
      </div>
    </div>
  );
}
