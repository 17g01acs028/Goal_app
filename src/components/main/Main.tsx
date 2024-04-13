
import { useNavigate } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import TopBar from "../topbar/TopBar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const MainBlog = () => {
    const navigate = useNavigate();
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <TopBar />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">About Us Page</h1>
                    </div>
                    <div
                        className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl pt-10 underline p-2  font-bold tracking-tight">
                                This is a Health habit and Goal tracking System.
                            </h3>


                            <p className="text-sm mb-10 max-w-xl text-muted-foreground">
                                Welcome to Tracking Goals, your ultimate platform for managing and achieving your personal and professional aspirations. At Tracking Goals, we understand that progress is not just about setting goals; it's about the journey, the milestones, and the continuous growth that comes with it. Our goal tracking system is designed to empower you to define, pursue, and conquer your dreams, one step at a time.
                            </p>
                            <Separator />

                            <h3 className="text-2xl pt-10 underline p-2 font-bold tracking-tight">
                                Our Mission
                            </h3>
                            <p className="text-sm mb-10 max-w-xl text-muted-foreground">
                                Our mission at Tracking Goals is simple yet profound: to provide you with the tools and support you need to turn your aspirations into reality. We believe that everyone deserves a chance to pursue their passions and ambitions, and our platform is here to make that journey as seamless and rewarding as possible.
                            </p>
                            <Button onClick={() => navigate("/signup")} className="mt-4">Start setting goals Today</Button>
                        </div>
                    </div>
                </main>
                <footer
                    className="text-center border-t-2 lg:text-left">
                    <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                        © {new Date().getFullYear()} Copyright:
                        <a
                            className="text-neutral-800 dark:text-neutral-400"
                            href="#"
                        >Health Goal Management System</a>
                    </div>
                </footer>
            </div >
        </div >
    )
}

export default MainBlog
