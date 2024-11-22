import Image from "next/image";
import { useState, useEffect } from "react";
import TodoModel from "@/models/TodoModel";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoItem from "@/components/TodoItem";
import FilterOptions from "@/components/FilterOptions";

const initialTodoList: TodoModel[] = [
  {
    id: "1",
    title: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: "2",
    title: "Jog around the park 3x",
    completed: false,
  },
  {
    id: "3",
    title: "10 minutes meditation",
    completed: false,
  },
  {
    id: "4",
    title: "Read for 1 hour",
    completed: false,
  },
  {
    id: "5",
    title: "Pick up groceries",
    completed: false,
  },
  {
    id: "6",
    title: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

export default function Home() {
  const [todoList, setTodoList] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [todoFilter, setTodoFilter] = useState<TodoModel[]>([]);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputCompleted, setInputCompleted] = useState<boolean>(false);
  const [bgImage, setBgImage] = useState<string>(
    "/images/bg-desktop-light.jpg"
  );

  const [darkMode, setDarkMode] = useState("dark");

  // Initialize dark mode based on user preference on the client side
  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      const userPrefersDark = localStorage.getItem("darkMode") || "light";
      setDarkMode(userPrefersDark);
    } else {
      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(userPrefersDark ? "dark" : "light");
    }
  }, []);

  // Handle dark mode toggle
  const handleDarkMode = () => {
    if (darkMode === "light") {
      setDarkMode("dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      setDarkMode("light");
      localStorage.setItem("darkMode", "light");
    }
  };

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /// Get Todo List from Local Storage
  useEffect(() => {
    const todoList = localStorage.getItem("todoList");
    if (todoList) {
      setTodoList(JSON.parse(todoList));
    } else {
      setTodoList(initialTodoList);
    }
  }, []);

  /// Create ID
  const createId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  /// Add Todo
  const addTodo = () => {
    if (inputValue.length < 1) return;
    const newTodo = {
      id: createId(),
      title: inputValue,
      completed: inputCompleted,
    };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
    setInputCompleted(false);
  };

  /// Handle Complete Todo
  const handleCompleteTodo = (id: string) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodoList);
  };

  /// Handle Delete Todo
  const handleDeleteTodo = (id: string) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  /// Handle Clear Completed
  const handleClearCompleted = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.completed);
    setTodoList(updatedTodoList);
  };

  /// Filter Todo
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    if (filter === "all") {
      setTodoFilter(todoList);
    } else if (filter === "active") {
      setTodoFilter(todoList.filter((todo) => !todo.completed));
    } else if (filter === "completed") {
      setTodoFilter(todoList.filter((todo) => todo.completed));
    }
  }, [filter, todoList]);

  /// Itesm Left
  const itemsLeft = todoList.filter((todo) => !todo.completed).length;

  /// Handle Drag End

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodoList((todo) => {
        const oldIndex = todo.findIndex((todo) => todo.id === active.id);
        const newIndex = todo.findIndex((todo) => todo.id === over.id);

        return arrayMove(todo, oldIndex, newIndex);
      });
    }
  };

  /// Set Background Image based on Dark Mode and Screen Size
  useEffect(() => {
    const updateBgImage = () => {
      const isDesktop = window.innerWidth > 768;
      const imagePath =
        darkMode === "light"
          ? isDesktop
            ? "/images/bg-desktop-light.jpg"
            : "/images/bg-mobile-light.jpg"
          : isDesktop
          ? "/images/bg-desktop-dark.jpg"
          : "/images/bg-mobile-dark.jpg";
      setBgImage(imagePath);
    };

    // Establecer la imagen inicial
    updateBgImage();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateBgImage);

    // Limpieza al desmontar el componente
    return () => window.removeEventListener("resize", updateBgImage);
  }, [darkMode]);

  return (
    <div
      className={`flex flex-col w-full h-full min-h-screen items-center px-6 md:px-8 py-8 md:py-16 bg-veryLightGrayishBlue dark:bg-veryDarkBlue`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col w-full max-w-[600px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[36px] font-[700] text-white tracking-[8px]">
            TODO
          </h1>
          <button onClick={handleDarkMode}>
            <Image
              src={
                darkMode === "light"
                  ? "/images/icon-moon.svg"
                  : "/images/icon-sun.svg"
              }
              alt="Sun Icon"
              width={28}
              height={28}
            />
          </button>
        </div>
        <div className="flex w-full p-4 mt-8 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg shadow-2xl">
          <div
            className={`flex ${
              !inputCompleted &&
              "border border-lightGrayishBlue dark:border-white/25"
            } w-8 h-8 mr-4 items-center justify-center rounded-full cursor-pointer
                `}
            onClick={() => setInputCompleted(!inputCompleted)}
            style={
              inputCompleted
                ? {
                    background:
                      "linear-gradient(145deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
                  }
                : {}
            }
          >
            {inputCompleted && (
              <Image
                src="/images/icon-check.svg"
                alt="Check Icon"
                width={18}
                height={18}
              />
            )}
          </div>
          <input
            type="text"
            id="add-todo"
            placeholder="Create a new todo..."
            className="flex flex-grow bg-veryLightGray dark:bg-veryDarkDesaturatedBlue outline-none text-veryDarkGrayishBlue dark:text-white/80"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col text-veryDarkGrayishBlue dark:text-white/80 mt-8 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg overflow-hidden shadow-2xl divide-y-[1px] divide-lightGrayishBlue dark:divide-white/10">
            <SortableContext
              items={todoList}
              strategy={verticalListSortingStrategy}
            >
              {todoFilter.map((todo: TodoModel) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  hoverId={hoverId}
                  setHoverId={setHoverId}
                  handleCompleteTodo={handleCompleteTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
            </SortableContext>

            {/* Options  Desktop*/}
            <FilterOptions
              itemsLeft={itemsLeft}
              filter={filter}
              setFilter={setFilter}
              handleClearCompleted={handleClearCompleted}
            />
          </div>

          {/* Options Mobile */}
          <div>
            <div className="flex gap-x-6 p-4 mt-6 justify-center md:hidden font-[700] text-[14px] text-darkGrayishBlue dark:text-white/50 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-lg shadow-2xl">
              <p
                className={`${
                  filter === "all" && " text-blue-500"
                } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
                onClick={() => setFilter("all")}
              >
                All
              </p>
              <p
                className={`${
                  filter === "active" && " text-blue-500"
                } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
                onClick={() => setFilter("active")}
              >
                Active
              </p>
              <p
                className={`${
                  filter === "completed" && " text-blue-500"
                } hover:text-veryDarkGrayishBlue dark:hover:text-white cursor-pointer`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </p>
            </div>
          </div>
        </DndContext>
      </div>

      <footer className="flex mt-8 text-veryDarkGrayishBlue dark:text-white/50 text-[14px]">
        Drag and drop to reorder list
      </footer>
    </div>
  );
}
