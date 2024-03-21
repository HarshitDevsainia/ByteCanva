import { useSelector } from "react-redux";

export function ThemeProvider({children}) {
    const {theme}=useSelector((state)=>state.theme);
    return(
        <div className={theme}>
            <div className=" bg-white text-black dark:bg-[rgb(16,23,42)] dark:text-white min-h-screen">{children}</div>
        </div>
    )
};

