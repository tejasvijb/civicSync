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
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react";

interface Issue {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    imageUrl: string;
    status: string;
    createdAt: string;
    user: string;
    __v: number;
}

export function ViewIssueDialog({ issue }: { issue: Issue }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Eye />
                    View
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{issue.title}</DialogTitle>
                    <DialogDescription>
                        Issue details and current status
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">Description</Label>
                        <div className="col-span-3">{issue.description}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">Category</Label>
                        <div className="col-span-3">{issue.category}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">Location</Label>
                        <div className="col-span-3">{issue.location}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">Status</Label>
                        <div className="col-span-3">{issue.status}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold">Created</Label>
                        <div className="col-span-3">{new Date(issue.createdAt).toLocaleDateString()}</div>
                    </div>
                    {issue.imageUrl && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-semibold">Image</Label>
                            <div className="col-span-3">
                                <img src={issue.imageUrl} alt="Issue" className="max-w-full rounded-md" />
                            </div>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>
    )
}
