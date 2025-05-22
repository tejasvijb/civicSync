import { Button } from "@/components/ui/button"

import { Form } from "@components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { civicIssueCategories, createCivicIssueSchema } from "@/app/utils/validations"
import CustomInput from "@/components/ui/CustomInput"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCivicIssue, updateCivicIssue } from "@/api/civicIssuesApi"
import CustomSelect from "@/components/ui/CustomSelect"
import { useAuth } from "@/store/useAuth"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreateIssueForm({ issue, setOpen }: { issue?: any, setOpen: (open: boolean) => void }) {

    const queryClient = useQueryClient()
    const { id: issueId } = useParams();





    const { user } = useAuth()

    const { mutate, isPending } = useMutation({
        mutationFn: createCivicIssue,
        onSuccess: () => {
            form.reset()
            // clear cashe 
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
            toast.success("Issue created successfully")
        },
        onError: () => {
            toast.error("Failed to create issue")
        }
    })

    const { mutate: updateIssue, isPending: isEditPending } = useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (variables: { id: string; data: any }) =>
            updateCivicIssue(variables.id, variables.data),
        onSuccess: () => {
            form.reset()
            // clear cache
            queryClient.invalidateQueries({ queryKey: ["issuesByUserId", user?.id] })
            queryClient.invalidateQueries({ queryKey: ["issue", issueId] })
            toast.success("Issue updated successfully")
        },
        onError: () => {
            toast.error("Failed to update issue")
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
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending || isEditPending}>
                        {issue ? "Edit Issue" : "Create Issue"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
