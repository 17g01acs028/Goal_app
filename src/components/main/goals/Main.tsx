import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "../components/Datatable"
import { Goal, columns } from "./data/columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppSelector } from "@/state/store"


export default function ViewGoals() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<Goal[]>([]);
  const [location,setlocation] =useState(loc.pathname);

  if(location !== loc.pathname){
    setlocation(loc.pathname);
  }
  
  const jsonString = JSON.stringify(useAppSelector(state => state.auth));
  const  user = JSON.parse(jsonString)

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
            setlocation("/goals");
            navigate("/goals")
            setData(data);
          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [location]);

  return (
    <>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>My Goals</CardTitle>
          <CardDescription>
            Goals
          </CardDescription>
        </div>
        <Button asChild size="sm" onClick={()=> navigate("/goal/add")} className="ml-auto gap-1">
          <span className="flex gap-2 items-center"> New
            <PlusCircle className="h-4 w-4" />
          </span>
        </Button>
      </CardHeader>
      <DataTable columns={columns} data={data} filter="" columnName=""/>
    </>

  )
}
