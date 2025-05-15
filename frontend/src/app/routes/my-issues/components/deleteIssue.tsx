import { deleteCivicIssue } from "@/api/civicIssuesApi";
import { useAuth } from "@/store/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeleteIssue({ issue }: { issue: any }) {

    const { user } = useAuth()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteCivicIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
        },
        onError: () => {
            alert("Failed to delete issue")
        }
    })


    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(issue._id)
            }
        })
    }

    return (
        <div onClick={() => onDelete()} className="flex cursor-pointer items-center gap-2">
            <Trash />
            Delete
        </div>
    )
}

