import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCivicIssue, getCivicIssueById, voteCivicIssue } from "@/api/civicIssuesApi";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { CreateIssueForm } from "@/app/routes/my-issues/components/createIssueForm";
import { Check } from "lucide-react";

export default function IssueDetails({ isPublic }: { isPublic?: boolean }) {
    const { id: issueId } = useParams();
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data: issue } = useQuery({
        queryKey: ["issue", issueId],
        queryFn: () => {
            if (!issueId) return null;
            return getCivicIssueById(issueId);
        },
    })

    const { mutate } = useMutation({
        mutationFn: deleteCivicIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
            toast.success("Issue deleted successfully")
            navigate("/my-issues")
        },
        onError: () => {
            toast.error("Failed to delete issue")
        }
    })


    const { mutate: voteIssue, isPending: isVoting } = useMutation({
        mutationFn: async (issueId: string): Promise<void> => {
            await voteCivicIssue(issueId)
        },
        onSuccess: () => {
            toast.success("Issue voted successfully")
            queryClient.invalidateQueries({ queryKey: ["publicCivicIssues"] })
            queryClient.invalidateQueries({ queryKey: ["issue", issueId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onVoteIssue = (issueId: string) => {
        Swal.fire({
            title: 'Vote for this issue?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                voteIssue(issueId)
            }
        })
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Do you want to delete this issue?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(issue?.data?.data._id)
            }
        })
    }


    const isOwner = user?.id === issue?.data?.data.user._id
    const isEditable = isOwner && issue?.data?.data.status === "Pending"
    const isVoted = issue?.data?.data.votedUsers.includes(user?.id)
    const isResolved = issue?.data?.data.status === "Resolved"

    console.log(issue)



    return (
        <div className="container mx-auto p-4 mt-10 max-sm:max-w-full w-[700px]">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{issue?.data?.data.title}</h1>
                        <p className="text-gray-500 text-sm">{issue?.data?.data.description}</p>
                    </div>
                    {/*  */}
                    {isOwner && isEditable && !isPublic && <div className="flex gap-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="max-sm:max-w-[360px] w-[700px]">
                                <CreateIssueForm setOpen={setOpen} issue={issue?.data?.data} />
                            </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="destructive" onClick={onDelete}>Delete</Button>
                    </div>}

                    {isPublic && !isResolved && <Button disabled={isVoted || isVoting} size="sm" onClick={() => onVoteIssue(issue?.data?.data._id)}>
                        {isVoted ?
                            <p className="flex items-center gap-2">
                                <Check />
                                {' '} Voted
                            </p> : "Vote"} </Button>}

                </div>

                <div>
                    {/* show image, category createdAt status, location,votes in a structured and responsive way */}
                    <div className="flex justify-center gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="h-[200px] w-[200px]"><img className="w-full h-full object-cover" src={issue?.data?.data.imageUrl} alt="issue" /></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ">

                        <div className="flex justify-between gap-2">
                            <p className="font-semibold">Created At</p>
                            <p>{new Date(issue?.data?.data.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <p className="font-semibold">Category</p>
                            <p>{issue?.data?.data.category}</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <p className="font-semibold">Status</p>
                            <p>{issue?.data?.data.status}</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <p className="font-semibold">Location</p>
                            <p>{issue?.data?.data.location}</p>
                        </div>
                        <div className="flex justify-between gap-2">
                            <p className="font-semibold">Votes</p>
                            <p>{issue?.data?.data.votes}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
