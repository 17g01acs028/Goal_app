import { Bell, Package2 } from 'lucide-react'
import { Button } from '../../ui/button'

const Top = () => {
    return (

        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <p className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">{import.meta.env.VITE_COMAPNY_NAME}</span>
            </p>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </div>

    )
}

export default Top
