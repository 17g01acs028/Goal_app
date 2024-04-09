import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/state/store'

const Bottom = () => {
    const navigate = useNavigate();
    const jsonString = JSON.stringify(useAppSelector(state => state.auth));
    const user = JSON.parse(jsonString);

    return (

        <div className="mt-auto p-4">
            {user.user === null || (typeof(user.user)==="string" ? user.user.trim() === "any" :"") ? " " : (

                <Card>
                    <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Notices</CardTitle>
                        <CardDescription>
                            Please make sure you update your progress promptly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button size="sm" onClick={() => navigate("/goals")} className="w-full">
                            Update now!!
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Bottom
