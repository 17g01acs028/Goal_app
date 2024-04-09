import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import { LineChart, Menu, Package } from 'lucide-react'
import { Home } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/state/store'

const SideBarSheet = () => {
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <p onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Home className="h-4 w-4" />
                        Dashboard
                    </p>

                    {user.user.role && (user.user.role).toLowerCase() === "admin" ? (
                        <p onClick={() => navigate("/users")} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Users className="h-4 w-4" />
                            Users
                        </p>
                    ) : ""}

                    <p onClick={() => navigate("/weeks")} className="flex cursor-pointer items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <Package className="h-4 w-4" />
                        Weeks
                    </p>
                    {user.user.role && (user.user.role).toLowerCase() === "admin" ? (
                        <p onClick={() => navigate("/categories")} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <ShoppingCart className="h-4 w-4" />
                            Category
                        </p>
                    ) : ""}
                    <p onClick={() => navigate("/goals")} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <LineChart className="h-4 w-4" />
                        Goals
                    </p>
                </nav>
                <div className="mt-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to our
                                support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SideBarSheet
