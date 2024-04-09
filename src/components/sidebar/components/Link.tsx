import { useAppSelector } from '@/state/store';
import { Home, LineChart, Package, Settings, Settings2, ShoppingCart, Users } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Link = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    console.log(user.user)

    
    return (
        <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {user.user === null || (typeof(user.user)==="string" ? (user.user.trim() === "any") : "") ? (
                    <>
                        <p onClick={() => navigate("/")} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${loc.pathname === "/" || loc.pathname.includes("home") ? "bg-muted text-primary" : ""}`}>
                            <Settings2 className="h-4 w-4" />
                            About Us
                        </p>
                    </>
                ) : (
                    <>
                        <p onClick={() => navigate("/")} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${loc.pathname === "/" || loc.pathname.includes("home") ? "bg-muted text-primary" : ""}`}>
                            <Home className="h-4 w-4" />
                            Dashboard
                        </p>

                        {user.user.role && (user.user.role).toLowerCase() === "admin" ? (
                            <p onClick={() => navigate("/users")} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${loc.pathname.includes("user") ? "bg-muted text-primary" : ""}`}>
                                <Users className="h-4 w-4" />
                                Users
                            </p>
                        ) : ""}

                        <p onClick={() => navigate("/weeks")} className={`flex cursor-pointer items-center gap-3 rounded-lg ${loc.pathname.includes("week") ? "bg-muted text-primary" : ""}  px-3 py-2 transition-all hover:text-primary`}>
                            <Package className="h-4 w-4" />
                            Weeks
                        </p>
                        {user.user.role && (user.user.role).toLowerCase() === "admin" ? (
                            <p onClick={() => navigate("/categories")} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${loc.pathname.includes("categor") ? "bg-muted text-primary" : ""} text-muted-foreground transition-all hover:text-primary`}>
                                <ShoppingCart className="h-4 w-4" />
                                Category
                            </p>
                        ) : ""}
                        <p onClick={() => navigate("/goals")} className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground ${loc.pathname.includes("goal") ? "bg-muted text-primary" : ""} transition-all hover:text-primary`}>
                            <LineChart className="h-4 w-4" />
                            Goals
                        </p>

                    </>
                )}
            </nav>
        </div>
    )
}

export default Link
