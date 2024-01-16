import { useState, useRef, useEffect } from "react";
interface user {
  name: string;
  img: string;
  email: string;
}
interface sele extends user {
  secondPress: boolean;
}
const Chip = () => {
  const input = useRef<HTMLInputElement | null>(null);
  const divv = useRef<HTMLDivElement | null>(null);
  const [selected, setSele] = useState<sele[]>([]);
  const [search, setSearch] = useState<string>("");
  const [visi, setVisi] = useState<boolean>(false);
  const [list, setList] = useState<user[]>([
    {
      name: "catherine",
      email: "caty@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/17.svg",
    },
    {
      name: "kalash",
      email: "kalash@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/20.svg",
    },
    {
      name: "ziya",
      email: "ziya@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/21.svg",
    },
    {
      name: "balvindar",
      email: "balvindar@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/14.svg",
    },
    {
      name: "rakesh",
      email: "rakesh@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg",
    },
    {
      name: "ram",
      email: "ramkumar@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/2.svg",
    },
    {
      name: "raja",
      email: "raja@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/3.svg",
    },
    {
      name: "arpit",
      email: "arpit@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/15.svg",
    },
    {
      name: "sourabh",
      email: "sourabh@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/5.svg",
    },
    {
      name: "raju",
      email: "raju@gmail.com",
      img: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/19.svg",
    },
  ]);
  const handleOutsideClick = (event: any) => {
    if (divv.current && !divv.current.contains(event.target)) {
      console.log("Clicked outside the dropdown. Hide it!");
      setVisi(false);
      input?.current?.blur();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Backspace" && search == "") {
      const val: sele[] = [...selected];
      if (val.length) {
        let last = val[val.length - 1];
        console.log(last);
        if (!last.secondPress) {
          val[val.length - 1].secondPress = true;
        } else {
          val.splice(val.length - 1, 1);
          setList([
            ...list,
            { name: last.name, email: last.email, img: last.img },
          ]);
        }
        setSele(val);
      }
    }
    setVisi(true);
  };
  const handleAdd = (ele: user, ind: number) => {
    console.log("adding", ele);
    const arr = [...selected];
    arr.forEach((ele) => {
      ele.secondPress = false;
    });
    setSele([...arr, { ...ele, secondPress: false }]);
    setList((prev) => {
      return prev.filter((el: user, index: number) => {
        if (ind != index) {
          return el;
        }
      });
    });
    setSearch("");
    setVisi(true);
  };
  const handleClick = () => {
    input?.current?.focus();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleDele = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const arr: sele[] = [...selected];
    const val: sele = arr[index];
    setSele((prev) => {
      return prev.filter((ele, indd) => {
        if (indd != index) {
          return ele;
        }
      });
    });
    setList([...list, { name: val.name, email: val.email, img: val.img }]);
  };
  return (
    <div className="flex flex-col items-center mt-4">
      <h1>Pick Users</h1>
      <div
        ref={divv}
        onClick={handleClick}
        className={`p-3  shadow-lg grid gird-cols-2 md:grid-cols-3 gap-2 
            }`}
        style={{ borderColor: visi ? "black" : "" }}
      >
        {selected.map((ele: sele, index: number) => {
          return (
            <div
              key={index}
              className={`flex justify-around 
                items-center bg-gray-300 rounded-3xl border-[2px] `}
              style={{
                borderColor: ele.secondPress ? "rgb(248 113 113 )" : "",
              }}
            >
              <div className={`flex gap-1 items-center`}>
                <img
                  src={ele.img}
                  className="rounded-full object-fill w-10 h-10"
                />
                <h1>{ele.name}</h1>
              </div>
              <button
                className="rounded-full px-3"
                onClick={(e) => {
                  handleDele(e, index);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        <div>
          <input
            ref={input}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setVisi(true);
            }}
            className=" pl-2 h-10 "
            value={search}
            onChange={handleChange}
            placeholder="select or serach users..."
          />
          {visi && (
            <div className="absolute overflow-auto h-[170px] w-[300px]  rounded-lg bg-white border-[1px] border-gray-300 p-2">
              {list.map((ele: user, index: number) => {
                if (search == "" || ele.name.includes(search)) {
                  return (
                    <div
                      key={index}
                      className="flex gap-5 h-[40px] my-5 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        handleAdd(ele, index);
                      }}
                    >
                      <div className="flex">
                        <img
                          src={ele.img}
                          className="rounded-full w-10 h-8 object-fit"
                        />
                        <h1>{ele.name}</h1>
                      </div>
                      <p className="text-gray-300">{ele.email}</p>
                    </div>
                  );
                }
              })}
              <h1 className="text-center text-gray-300">OOp's that's it</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chip;
