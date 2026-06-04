import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const TooltipAction = ({
    icon,
    label,
    onClick,
    disabled,
}: {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    disabled?: boolean
}) => (
    <TooltipProvider delayDuration={200}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClick}
                    disabled={disabled}
                    className="h-9 w-9 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                    aria-label={label}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
                {label}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

export default TooltipAction