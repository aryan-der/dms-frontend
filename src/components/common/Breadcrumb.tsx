import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useFolder from "@/hooks/use-folder";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { adminRoute } from "@/const/route";

export function BreadcrumbComponent() {
    const { useGetContent } = useFolder();
    const { parentFolderId } = useParams();
    const navigate = useNavigate();

    const { data } = useGetContent({
        parentFolderId: parentFolderId || null,
    });

    const breadcrumb = data?.data?.breadcrumb || [];

    const lastIdx = breadcrumb.length - 1;

    const handleClick = (id: string | null) => {
        if (!id || id === "null") {
            navigate(adminRoute.dashboard.base);
        } else {
            navigate(`${adminRoute.dashboard.base}/${id}`);
        }
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumb.map((item, idx) => (
                    <Fragment key={item.id ?? "root"}>
                        <BreadcrumbItem>
                            {idx === lastIdx ? (
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(item.id);
                                    }}
                                >
                                    {item.name}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>

                        {idx !== lastIdx && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}