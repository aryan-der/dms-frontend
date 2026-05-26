import { useState, useRef, useEffect } from "react"
import {
    FiDownload,
    FiEdit2,
    FiShare2,
    FiFolderPlus,
    FiInfo,
    FiTrash2,
    FiMoreVertical,
    FiChevronRight,
} from "react-icons/fi"
import FolderRename from "./folder-rename"
import type { FolderType } from "@/types/data/folder-types"

type MenuItem =
    | {
        type: "item"
        label: string
        icon: React.ReactNode
        right?: string
        hasSubmenu?: boolean
        danger?: boolean
        onClick?: () => void
    }
    | { type: "divider" }

interface DropdownItemsProps {
    folder: FolderType
    onSelectFolder?: (folderId: string) => void
}

const DropdownItems = ({
    folder,
    onSelectFolder,
}: DropdownItemsProps) => {
    const [open, setOpen] = useState(false)
    const [showRename, setShowRename] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const _id = folder?._id
    const name = folder?.name
    const menuGroups: MenuItem[][] = [
        [
            { type: "item", label: "Download", icon: <FiDownload size={14} /> },
            {
                type: "item",
                label: "Rename",
                icon: <FiEdit2 size={14} />,
                right: "Ctrl+Alt+E",
                onClick: () => {
                    setShowRename(true)
                },
            },
        ],
        [
            {
                type: "item",
                label: "Share",
                icon: <FiShare2 size={14} />,
                hasSubmenu: true,
            },
            {
                type: "item",
                label: "Organize",
                icon: <FiFolderPlus size={14} />,
                hasSubmenu: true,
            },
            {
                type: "item",
                label: "Folder information",
                icon: <FiInfo size={14} />,
                hasSubmenu: true,
            },
        ],
        [
            {
                type: "item",
                label: "Move to trash",
                icon: <FiTrash2 size={14} />,
                right: "Delete",
                danger: true,
            },
        ],
    ]

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpen(false)
        }, 120)
    }

    const handleMouseEnter = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current)
        }
    }

    const handleMenuClick = () => {
        // User action: select this folder
        if (typeof onSelectFolder === "function") {
            onSelectFolder(_id)
        }
        setOpen((prev) => !prev)
    }

    return (
        <div
            ref={ref}
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <button
                onClick={handleMenuClick}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border/40 bg-background text-muted-foreground transition-all duration-100 hover:bg-muted hover:text-foreground ${open ? "bg-muted text-foreground" : ""} `}
            >
                <FiMoreVertical size={15} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-[calc(100%+6px)] z-50 flex w-[220px] max-w-[calc(100vw-20px)] flex-col gap-[5px]">
                    {menuGroups.map((group, gi) => (
                        <div
                            key={gi}
                            className="flex flex-col overflow-hidden rounded-[10px] border border-border/30 bg-background opacity-0 shadow-lg"
                            style={{
                                animation: `pieceIn 200ms cubic-bezier(0.22,1,0.36,1) ${gi * 75
                                    }ms forwards`,
                                transformOrigin: "top center",
                            }}
                        >
                            {group.map((entry, ii) => {
                                if (entry.type === "divider") return null

                                return (
                                    <button
                                        key={ii}
                                        onClick={() => {
                                            entry.onClick?.()
                                            setOpen(false)
                                        }}
                                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] transition-colors duration-75 ${ii > 0 ? "border-t border-border/20" : ""} ${entry.danger
                                            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                            : "text-foreground hover:bg-muted"
                                            } `}
                                    >
                                        <span
                                            className={
                                                entry.danger
                                                    ? "shrink-0 text-red-500"
                                                    : "shrink-0 text-muted-foreground"
                                            }
                                        >
                                            {entry.icon}
                                        </span>

                                        <span className="flex-1 truncate">{entry.label}</span>

                                        {entry.right && (
                                            <span
                                                className={`text-[11px] ${entry.danger
                                                    ? "text-red-400"
                                                    : "text-muted-foreground/50"
                                                    } `}
                                            >
                                                {entry.right}
                                            </span>
                                        )}

                                        {entry.hasSubmenu && (
                                            <FiChevronRight
                                                size={12}
                                                className="shrink-0 text-muted-foreground/40"
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                </div>
            )}

            {showRename && (
                <FolderRename
                    open={showRename}
                    onOpenChange={setShowRename}
                    folderId={_id}
                    currentName={name}
                />
            )}

            <style>{`
        @keyframes pieceIn {
          from {
            opacity: 0;
            transform: translateY(-7px) scaleY(0.93);
          }

          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }
      `}</style>
        </div>
    )
}

export default DropdownItems
