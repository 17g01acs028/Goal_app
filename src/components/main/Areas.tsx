import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Paperclip
} from "lucide-react"

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
  DropdownMenuContent,
  DropdownMenuItem,
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


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
  const [tip, setTips] = useState(["Stay Hydrated: Drink plenty of water throughout the day, especially before, during, and after exercise to stay hydrated and maintain optimal performance.", "Set Realistic Goals: Set achievable fitness goals that are specific, measurable, attainable, relevant, and time-bound (SMART). This will help you stay motivated and track your progress effectively.", "Mix Up Your Workouts: Incorporate a variety of exercises into your routine, including cardio, strength training, flexibility exercises, and balance exercises, to work different muscle groups and prevent boredom.", "Prioritize Rest and Recovery: Allow your body time to rest and recover between workouts to prevent overtraining and reduce the risk of injury. Aim for at least 1-2 days of rest per week.", "Focus on Form: Pay attention to proper form and technique during exercises to maximize results and minimize the risk of injury. Consider working with a certified personal trainer to learn correct form.","Fuel Your Body: Eat a balanced diet rich in fruits, vegetables, lean proteins, whole grains, and healthy fats to provide your body with the nutrients it needs to perform at its best."]);
  const [completeData, setCompleteData] = useState<Goal[]>([]);
  const [inCompleteData, setInCompleteData] = useState<Goal[]>([]);
  const [location, setlocation] = useState(loc.pathname);

  if (location !== loc.pathname) {
    setlocation(loc.pathname);
  }


  console.log(location);
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const user = JSON.parse(jsonString)

  console.log("Completed" + completeData.length);
  console.log("In completed" + inCompleteData.length);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(`${import.meta.env.VITE_DB_HOST}/goals/user/${user && user.user._id}`, {
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

        await fetch(`${import.meta.env.VITE_DB_HOST}/goals/user/complete/${user && user.user._id}`, {
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

        await fetch(`${import.meta.env.VITE_DB_HOST}/goals/user/incomplete/${user && user.user._id}`, {
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8  xl2:grid-cols-3 2xl:grid-cols-3">
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
                {`${Math.round((completeData.length / data.length) * 100)}% of goal are completed`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={(completeData.length / data.length) * 100} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>All Uncompleted</CardDescription>
              <CardTitle className="text-4xl">{`${inCompleteData.length} of ${data.length}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {`${Math.round((inCompleteData.length / data.length) * 100)}% of goal are completed`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={(inCompleteData.length / data.length) * 100} aria-label="12% increase" />
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
                <DataTable columns={columns} data={data} columnName="" filter="" />
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
                <DataTable columns={columns} data={completeData} columnName="" filter="" />
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
                <DataTable columns={columns} data={inCompleteData} columnName="" filter="" />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
      <div>
        <Card
          className="" x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Fitness Tips

              </CardTitle>
              <CardDescription>Please check our Fitness tips from Here</CardDescription>
            </div>
          </CardHeader>
          <CardContent>

            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {tip.map((data, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          {data}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Areas
