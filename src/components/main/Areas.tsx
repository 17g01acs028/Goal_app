import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Paperclip,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/state/store"
import { Goal, columns } from "./goals/data/columns"
import { DataTable } from "./components/Datatable"



const Areas = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [data, setData] = useState<Goal[]>([]);
  const [completeData, setCompleteData] = useState<Goal[]>([]);
  const [inCompleteData, setInCompleteData] = useState<Goal[]>([]);
  const [location,setlocation] =useState(loc.pathname);

  if(location !== loc.pathname){
    setlocation(loc.pathname);
  }
  

  console.log(location);
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const  user = JSON.parse(jsonString)
  
 console.log("Completed"+completeData.length);
 console.log("In completed"+inCompleteData.length);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/goals/user/${user && user.user._id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
          })
          .then(data => {
            setData(data);
          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });

          await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/goals/user/complete/${user && user.user._id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
          })
          .then(data => {
            setCompleteData(data);
          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });

          await fetch(`${import.meta.env.VITE_DB_HOST}:${import.meta.env.VITE_DB_PORT}/goals/user/incomplete/${user && user.user._id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
          })
          .then(data => {
            setInCompleteData(data);
          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      navigate("/home")
    }
  
    fetchData();
  }, [location]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card
            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
          >
            <CardHeader className="pb-3">
              <CardTitle>Your Goals</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                This is a dashboard design to track you weekly goal. I allows you to set goals and track progress as you go.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/goal/add")} >Create New Goal</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>All Complete</CardDescription>
              <CardTitle className="text-4xl">{`${completeData.length} of ${data.length}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
              {`${Math.round((completeData.length / data.length)*100)}% of goal are completed`}  
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={(completeData.length / data.length)*100} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>All Uncompleted</CardDescription>
              <CardTitle className="text-4xl">{`${inCompleteData.length} of ${data.length}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
              {`${Math.round((inCompleteData.length / data.length)*100)}% of goal are completed`} 
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={(inCompleteData.length / data.length)*100}aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="complete">Completed</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Complete
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Uncomplete
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>All Goals</CardTitle>
                <CardDescription>
                  All my goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={data}  />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complete">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>All Completed Goals</CardTitle>
                <CardDescription>
                  All my goals
                </CardDescription>
              </CardHeader>
              <CardContent>
              <DataTable columns={columns} data={completeData}  />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="incomplete">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>All Uncompleted Goals</CardTitle>
                <CardDescription>
                  All Uncompleted goals
                </CardDescription>
              </CardHeader>
              <CardContent>
              <DataTable columns={columns} data={inCompleteData}  />
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
      <div>
        <Card
          className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Latest News and Updates
                
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  News
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Visit Site</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
           
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default Areas
