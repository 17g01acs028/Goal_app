import Profile from "./components/Profile"
import Search from "./components/SearchBar"
import SideBarSheet from "./components/SideBarSheet"
import { ModeToggle } from "./components/Theme"


const TopBar = () => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <SideBarSheet/>
            <Search/>
            <ModeToggle/>
            <Profile/>
        </header>
    )
}

export default TopBar
