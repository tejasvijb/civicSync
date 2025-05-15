import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { createCivicIssueSchema } from "../../../../../utils/validations"
import { civicIssueCategories, createCivicIssueSchema } from "@/app/utils/validations"
import CustomInput from "@/components/ui/CustomInput"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCivicIssue, updateCivicIssue } from "@/api/civicIssuesApi"
import CustomSelect from "@/components/ui/CustomSelect"
import { useAuth } from "@/store/useAuth"
import { useState } from "react"
import { Pencil } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreateIssueForm({ issue }: { issue?: any }) {

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()


    const { user } = useAuth()

    const { mutate, isPending } = useMutation({
        mutationFn: createCivicIssue,
        onSuccess: () => {
            alert("Issue created successfully")
            form.reset()
            // clear cashe 
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
        },
        onError: () => {
            alert("Failed to create issue")
        }
    })

    const { mutate: updateIssue, isPending: isEditPending } = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (variables: { id: string; data: any }) =>
            updateCivicIssue(variables.id, variables.data),
        onSuccess: () => {
            alert("Issue updated successfully")
            form.reset()
            // clear cache
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
        },
        onError: () => {
            alert("Failed to update issue")
        }
    })

    const form = useForm({
        resolver: zodResolver(createCivicIssueSchema),
        defaultValues: {
            title: issue?.title || "",
            description: issue?.description || "",
            category: issue?.category || "",
            location: issue?.location || "",
            imageUrl: issue?.imageUrl || "",
            status: issue?.status || "Pending",
        },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onSubmit(data: any) {
        // console.log(data)

        if (issue) {
            updateIssue({ id: issue._id, data: { ...data, user: user?.id, status: data.status } })
        } else {
            mutate({
                ...data,
                user: user?.id || "",
                status: "Pending",
            })
        }




        form.reset()

        setOpen(false)

        //  close the dialog
    }


    const civicIssueStatus = [
        { label: "Pending", value: "Pending" },
        { label: "In Progress", value: "In Progress" },
        { label: "Resolved", value: "Resolved" },
    ]



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {issue ? <div className="flex cursor-pointer items-center gap-2">
                    <Pencil />
                    Edit
                </div> : <Button>Create Issue</Button>}
            </DialogTrigger>
            <DialogContent className="max-sm:max-w-[425px] w-[700px]">
                <DialogHeader>
                    <DialogTitle>{issue ? "Edit Issue" : "Create Issue"}</DialogTitle>
                    <DialogDescription>
                        {issue ? "Edit the issue to report to the authorities" : "Create a new issue to report to the authorities"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                            <CustomInput form={form} isSubmitting={isPending} label='Title' name='title' placeholder="eg. 'Pothole on the road'" />
                            <CustomInput form={form} isSubmitting={isPending} label='Description' name='description' placeholder="eg. 'Describe the issue in detail'" />
                            <CustomInput form={form} isSubmitting={isPending} label='Location' name='location' placeholder="eg. '123 Main Street'" />
                            <CustomSelect
                                form={form}
                                name="category"
                                label="Category"
                                required
                                options={civicIssueCategories}
                                placeholder="Select a category"
                            />
                            <CustomInput form={form} isSubmitting={isPending} label='Image' name='imageUrl' placeholder="eg. 'Pothole on the road' " />
                            {issue && <CustomSelect
                                form={form}
                                name="status"
                                label="Status"
                                required
                                options={civicIssueStatus}
                            />}
                        </div>
                        <DialogFooter>
                            {issue ? <Button type="submit" disabled={isPending}>
                                {isEditPending ? "Editing..." : "Edit Issue"}
                            </Button> : <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create Issue"}
                            </Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
