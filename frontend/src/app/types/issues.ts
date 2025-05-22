export interface Issue {
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
    votedUsers: string[];
    votes: number;
}

export const categories = [
    "Road",
    "Water",
    "Sanitation",
    "Electricity",
    "Other",
];

export const statuses = ["Pending", "In Progress", "Resolved"];

export const categorySelectOptions = categories.map((category) => ({
    label: category,
    value: category,
}));

export const statusSelectOptions = statuses.map((status) => ({
    label: status,
    value: status,
}));
