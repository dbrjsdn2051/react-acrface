import {useThemeStore} from "../../stores/theme-store.ts";
import ThemeToggle from "./theme-toggle.tsx";
import CustomTitleBar from "./custom-title-bar.tsx";

const layout = () => {
    const {isDark} = useThemeStore();

    return (
        <>
            <CustomTitleBar/>
            <div className={`h-screen overflow-hidden bg-cover px-4 pt-12 transition-colors duration-200 
        ${isDark ? "bg-linear-to-b from-[#06070f] via-[#c1224] to-[#121a30] text-slate-100"
                : "bg-linear-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900"}`}>
                <ThemeToggle/>
            </div>
        </>
    )
}

export default layout
