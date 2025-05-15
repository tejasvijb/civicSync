"use client"

import { SelectHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from './label';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectClassInterface {
    select?: string;
    root?: string;
}

interface CustomSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value'> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: any;
    isSubmitting?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    classNames?: SelectClassInterface;
    className?: string;
    StartIcon?: LucideIcon;
    readOnly?: boolean;
    fullWidth?: boolean;
    options: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
}

const CustomSelect = ({
    form,
    isSubmitting = false,
    label,
    name = '',
    placeholder = 'Select an option',
    description,
    required = false,
    classNames = { select: '', root: '' },
    className = '',
    readOnly = false,
    fullWidth = true,
    options,
    value,
    onValueChange,
    ...props
}: CustomSelectProps) =>
    form ? (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${fullWidth ? 'w-full' : 'max-w-sm'} ${classNames.root}`}>
                    {label && (
                        <FormLabel>
                            {label}
                            {required && <sup className='text-sm text-red-500'>*</sup>}
                        </FormLabel>
                    )}
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting || props.disabled || readOnly}
                    >
                        <FormControl>
                            <SelectTrigger className={`${readOnly && 'cursor-not-allowed bg-gray-100 dark:bg-gray-800'} ${classNames.select} ${className}`}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    ) : (
        <div className={`flex ${fullWidth ? 'w-full' : 'max-w-sm'} flex-col`}>
            {label && <Label className='mb-2'>{label}</Label>}
            <Select
                onValueChange={onValueChange}
                value={value}
                disabled={isSubmitting || props.disabled || readOnly}
            >
                <SelectTrigger className={`${readOnly && 'cursor-not-allowed bg-gray-100 dark:bg-gray-800'} ${classNames.select} ${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

export default CustomSelect;
