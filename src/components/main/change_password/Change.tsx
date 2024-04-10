import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setLogout } from "@/state/features/auth";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { toast } from "react-toastify";

const Change = () => {

    const dispatch = useAppDispatch();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const  user = JSON.parse(jsonString);

    async function handleSubmit(e: React.FormEvent) {
        'use server';
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const values = new FormData(form);

        console.log(values);

        if(values.get("newPassword") !== values.get("confirmPassword")){
            toast.error("Passwords Do not match");
            return;
        }

      await fetch(`${import.meta.env.VITE_DB_HOST}/users/change_password/${user.user._id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              },

            body: JSON.stringify(Object.fromEntries(values)),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const errorMessage = errorData.message || 'Something went wrong';
                    throw new Error(errorMessage);
                });
            }
            return response.json();
          })
          .then(() => {

            dispatch(setLogout())
            toast.success("Changes Password Success !");

          }).catch(error => {
            toast.error(error);
            console.error('There was a problem with the fetch operation:', error);
          });
    }
    return (
        <div className="w-full h-full flex items-center justify-center" >
            <form onSubmit={handleSubmit} method="POST">
                <fieldset className="w-[400px] xs:w-[500px] sm:w-[600px] gap-6 grid rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                        Change User Password
                    </legend>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Old password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">New password</Label>
                        <Input id="newPassword" type="password" name="newPassword" required />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input id="confirmPassword" type="password" name="confirmPassword" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}

export default Change
