import { HomeIcon } from "lucide-react"

const SearchBar = () => {
    return (

        <div className="w-full flex-1">
            <form>
                <div className="relative  flex gap-6 items-center justify-center md:justify-normal">
                    <div className="flex items-center gap-6">
                        <HomeIcon className="left-2.5 hidden md:flex  h-4 w-4 text-muted-foreground" />
                        <span>Welcome to goal management system</span> 
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SearchBar
