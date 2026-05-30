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
    FiStar,
    FiLink2,
    FiFolder,
    FiUsers,
    FiFileText,
    FiActivity,
} from "react-icons/fi"

import RenameItem from "./folder-rename"
import type { FolderType } from "@/types/data/folder-types"
import type { FileType } from "@/types/data/file-types"
import { useParams } from "react-router-dom"
import DeleteItemsButton from "./delete-items"
import { Move } from "lucide-react"
import MoveItemsButton from "./move-items"
import useFolder from "@/hooks/use-folder"
import ShareEveryoneDialog from "./share-everyone"

type SubMenuItem = {
    label: string
    icon?: React.ReactNode
    onClick?: () => void
}

type MenuItem =
    | {
        type: "item"
        id?: string
        label: React.ReactNode
        icon: React.ReactNode
        right?: string
        hasSubmenu?: boolean
        submenuItems?: SubMenuItem[]
        danger?: boolean
        onClick?: () => void
    }
    | { type: "divider" }

interface DropdownItemsProps {
    folder: FolderType | FileType
    onSelectFolder?: (folderId: string) => void
}

const DropdownItems = ({
    folder,
    onSelectFolder,
}: DropdownItemsProps) => {
    const [open, setOpen] = useState(false)
    const [showRename, setShowRename] = useState(false)
    const [showMove, setShowMove] = useState(false)
    const [showShareEveryone, setShowShareEveryone] = useState(false)
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const { parentFolderId } = useParams()
    const { useDownloadItems } = useFolder()
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isFile = "mimeType" in folder
    const _id = folder?._id

    const menuGroups: MenuItem[][] = [
        [
            {
                type: "item",
                id: "download",
                label: "Download",
                icon: <FiDownload size={14} />,
                onClick: () => {
                    useDownloadItems.mutate({
                        folderIds: [folder?._id],
                        fileIds: [folder?._id],
                    })
                },
            },
            {
                type: "item",
                id: "rename",
                label: "Rename",
                icon: <FiEdit2 size={14} />,
                right: "Ctrl+Alt+E",
                onClick: () => {
                    setShowRename(true)
                },
            },
            {
                type: "item",
                id: "move",
                label: "Move",
                icon: <Move size={14} />,
                onClick: () => setShowMove(true),
            },
        ],
        [
            {
                type: "item",
                id: "share",
                label: "Share",
                icon: <FiShare2 size={14} />,
                hasSubmenu: true,
                submenuItems: [
                    { label: "Share", icon: <FiUsers size={14} />, onClick: () => { } },
                    {
                        label: "Share Everyone", icon: <FiLink2 size={14} />, onClick: () => {
                            setShowShareEveryone(true)
                        }
                    },
                ],
            },
            {
                type: "item",
                id: "organize",
                label: "Organize",
                icon: <FiFolderPlus size={14} />,
                hasSubmenu: true,
                submenuItems: [
                    { label: "Add to Starred", icon: <FiStar size={14} />, onClick: () => { } },
                    { label: "Add to Collection", icon: <FiFolder size={14} />, onClick: () => { } },
                ],
            },
            {
                type: "item",
                id: "info",
                label: "Folder information",
                icon: <FiInfo size={14} />,
                hasSubmenu: true,
                submenuItems: [
                    { label: "Details", icon: <FiFileText size={14} />, onClick: () => { } },
                    { label: "Activity", icon: <FiActivity size={14} />, onClick: () => { } },
                ],
            },
        ],
        [
            {
                type: "item",
                id: "delete",
                label: (
                    <DeleteItemsButton
                        folderIds={isFile ? [] : [folder._id]}
                        fileIds={isFile ? [folder._id] : []}
                        parentFolderId={parentFolderId}
                    />
                ),
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
                setActiveSubmenu(null)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpen(false)
            setActiveSubmenu(null)
        }, 120)
    }

    const handleMouseEnter = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current)
        }
    }

    const handleMenuClick = () => {
        if (typeof onSelectFolder === "function") {
            onSelectFolder(_id)
        }
        setActiveSubmenu(null)
        setOpen((prev) => !prev)
    }

    const itemType = "mimeType" in folder ? "FILE" : "FOLDER"

    return (
        <div
            ref={ref}
            className="relative inline-block"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleMenuClick()
                }}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border/40 bg-background text-muted-foreground transition-all duration-100 hover:bg-muted hover:text-foreground ${open ? "bg-muted text-foreground" : ""
                    }`}
            >
                <FiMoreVertical size={15} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-[calc(100%+6px)] z-50 flex w-[220px] max-w-[calc(100vw-20px)] flex-col gap-[5px]">
                    {menuGroups.map((group, gi) => (
                        <div
                            key={gi}
                            className="flex flex-col rounded-[10px] border border-border/30 bg-background opacity-0 shadow-lg"
                            style={{
                                animation: `pieceIn 200ms cubic-bezier(0.22,1,0.36,1) ${gi * 75}ms forwards`,
                                transformOrigin: "top center",
                            }}
                        >
                            {group.map((entry, ii) => {
                                if (entry.type === "divider") return null

                                const submenuKey = entry.id ?? (entry.label as string)
                                const hasSubmenu =
                                    entry.hasSubmenu && entry.submenuItems?.length

                                return (
                                    <div key={ii} className="relative">
                                        <button
                                            onMouseEnter={() =>
                                                hasSubmenu
                                                    ? setActiveSubmenu(submenuKey)
                                                    : setActiveSubmenu(null)
                                            }
                                            onClick={() => {
                                                if (!hasSubmenu) {
                                                    entry.onClick?.()
                                                    setOpen(false)
                                                    setActiveSubmenu(null)
                                                }
                                            }}
                                            className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] transition-colors duration-75
                                                ${ii > 0 ? "border-t border-border/20" : ""}
                                                ${entry.danger
                                                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                    : "text-foreground hover:bg-muted"
                                                }`}
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

                                            <span className="flex-1 truncate">
                                                {entry.label}
                                            </span>

                                            {entry.right && (
                                                <span
                                                    className={`text-[11px] ${entry.danger
                                                        ? "text-red-400"
                                                        : "text-muted-foreground/50"
                                                        }`}
                                                >
                                                    {entry.right}
                                                </span>
                                            )}

                                            {hasSubmenu && (
                                                <FiChevronRight
                                                    size={12}
                                                    className="shrink-0 text-muted-foreground/40"
                                                />
                                            )}
                                        </button>

                                        {/* Submenu Panel */}
                                        {hasSubmenu &&
                                            activeSubmenu === submenuKey && (
                                                <div
                                                    className="absolute left-full top-0 z-50 ml-1 w-[180px] rounded-[10px] border border-border/30 bg-background shadow-lg submenu-animate"
                                                    style={{
                                                        opacity: 1,
                                                        animation: "submenuIn 180ms cubic-bezier(0.22,1,0.36,1) 0ms both"
                                                    }}
                                                >
                                                    {entry.submenuItems!.map(
                                                        (sub, si) => (
                                                            <button
                                                                key={si}
                                                                onClick={() => {
                                                                    sub.onClick?.()
                                                                    setOpen(false)
                                                                    setActiveSubmenu(null)
                                                                }}
                                                                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-[13px] transition-colors hover:bg-muted
                                                                    ${si > 0 ? "border-t border-border/20" : ""}`}
                                                            >
                                                                <span className="shrink-0 text-muted-foreground">
                                                                    {sub.icon ? sub.icon : <span style={{ width: 14, display: "inline-block" }} />}
                                                                </span>
                                                                <span className="flex-1 truncate text-foreground">
                                                                    {sub.label}
                                                                </span>
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            )}

            {/* Rename Dialog */}
            {showRename && (
                <RenameItem
                    open={showRename}
                    onOpenChange={setShowRename}
                    id={folder._id}
                    currentName={folder.name}
                    type={itemType}
                />
            )}

            <MoveItemsButton
                open={showMove}
                onOpenChange={setShowMove}
                folderIds={isFile ? [] : [folder._id]}
                fileIds={isFile ? [folder._id] : []}
                parentFolderId={parentFolderId}
                excludeId={folder._id}
            />

            <ShareEveryoneDialog
                open={showShareEveryone}
                onOpenChange={setShowShareEveryone}
                folder={folder}
            />

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
                @keyframes submenuIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px) scaleY(0.94);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scaleY(1);
                    }
                }
            `}</style>
        </div>

    )
}

export default DropdownItems