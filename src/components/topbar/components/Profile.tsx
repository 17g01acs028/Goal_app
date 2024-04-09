import { LogIn, User } from "lucide-react"
import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/state/store"
import { setLogout } from "@/state/features/auth"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const jsonString = JSON.stringify(useAppSelector(state => state.auth.user));
    const user = JSON.parse(jsonString);


    console.log(user?.email);
    return (
        <>
            {user && (user === null || (typeof(user)==="string" ? user.trim() === "any" :"")) ?
                (
                    <Button onClick={()=>navigate("/login")} variant="outline" size="icon">
                        <LogIn className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">login</span>
                    </Button>
                ) : (

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-center">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>{user && user?.email} </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/user/update/" + user._id)}>Update Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/change_password")}>Change password</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => dispatch(setLogout())}> <span className="w-full">Logout</span></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </>
    )
}

export default Profile
