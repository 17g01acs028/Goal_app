import Top from './components/Top'
import Link from './components/Link'
import Bottom from './components/Bottom'

const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <Top />
                <Link />
                <Bottom />
            </div>
        </div>
    )
}

export default Sidebar
